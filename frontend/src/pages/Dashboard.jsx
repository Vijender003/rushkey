import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { fetchMyProperties, removeProperty, addProperty } from '@/features/properties/propertySlice';
import { fetchMyBookings, updateBookingStatus } from '@/features/bookings/bookingSlice';
import { PROPERTY_TYPES, GENDER_OPTIONS, AMENITIES_LIST, BOOKING_STATUS } from '@/lib/constants';

const TABS = ['my-properties', 'my-bookings', 'profile'];
const TAB_LABELS = {
  'my-properties': 'My Properties',
  'my-bookings': 'My Bookings',
  'profile': 'Profile',
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { properties, loading: propLoading } = useSelector((state) => state.properties);
  const { bookings, loading: bookLoading } = useSelector((state) => state.bookings);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user?.role === 'owner') dispatch(fetchMyProperties());
    dispatch(fetchMyBookings());
  }, [dispatch, user?.role]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">Welcome back, {user?.name || 'User'}</p>
      </div>

      <div className="mb-8 flex gap-1 rounded-xl bg-gray-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
              activeTab === tab ? 'bg-white text-rushkey-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'my-properties' && user?.role === 'owner' && (
          <MyPropertiesTab
            key="props"
            properties={properties}
            loading={propLoading}
            onAdd={() => setShowAddModal(true)}
          />
        )}
        {activeTab === 'my-bookings' && (
          <MyBookingsTab key="bookings" bookings={bookings} loading={bookLoading} />
        )}
        {activeTab === 'profile' && (
          <ProfileTab key="profile" user={user} loading={authLoading} onUpdate={updateProfile} />
        )}
      </AnimatePresence>

      {showAddModal && (
        <AddPropertyModal onClose={() => setShowAddModal(false)} />
      )}
    </motion.div>
  );
}

function MyPropertiesTab({ properties, loading, onAdd }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (!window.confirm('Delete this property?')) return;
    dispatch(removeProperty(id))
      .unwrap()
      .then(() => toast.success('Property deleted'))
      .catch((err) => toast.error(err));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
        <button
          onClick={onAdd}
          className="rounded-lg bg-rushkey-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-rushkey-600"
        >
          + Add Property
        </button>
      </div>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
          <p className="mb-2 text-4xl">🏠</p>
          <p className="text-gray-500">No properties listed yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((p) => (
            <div key={p._id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-4">
                {p.images?.[0]?.url ? (
                  <img src={p.images[0].url} alt={p.title} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400">🏠</div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500">₹{p.price}/mo &middot; {p.type} &middot; {p.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(p._id)}
                  className="rounded-lg border border-red-200 px-4 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function MyBookingsTab({ bookings, loading }) {
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    dispatch(updateBookingStatus({ id, status: 'cancelled' }))
      .unwrap()
      .then(() => toast.success('Booking cancelled'))
      .catch((err) => toast.error(err));
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">My Bookings</h2>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
          <p className="mb-2 text-4xl">📋</p>
          <p className="text-gray-500">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-4">
                {b.property?.images?.[0]?.url ? (
                  <img src={b.property.images[0].url} alt={b.property.title} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-gray-400">🏠</div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{b.property?.title || 'Property'}</h3>
                  <p className="text-sm text-gray-500">
                    {b.moveInDate ? new Date(b.moveInDate).toLocaleDateString() : 'N/A'} - {b.moveOutDate ? new Date(b.moveOutDate).toLocaleDateString() : 'N/A'} &middot; {b.guests || 1} guest(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>
                  {BOOKING_STATUS[b.status] || b.status}
                </span>
                {b.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="rounded-lg border border-red-200 px-4 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ProfileTab({ user, loading, onUpdate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    if (form.phone) data.append('phone', form.phone);
    if (avatar) data.append('avatar', avatar);
    try {
      await onUpdate(data).unwrap();
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err || 'Update failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-lg">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
            ) : user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rushkey-100 text-3xl font-bold text-rushkey-600">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <label className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50">
            Change Avatar
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatar(e.target.files[0])} />
          </label>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-rushkey-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-rushkey-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-rushkey-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-rushkey-500 py-3 font-semibold text-white transition hover:bg-rushkey-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </motion.div>
  );
}

function AddPropertyModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'pg',
    gender: 'boys',
    street: '',
    city: '',
    state: '',
    pincode: '',
    capacity: '',
    amenities: [],
    rules: '',
    images: [],
  });

  const update = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('type', form.type);
    data.append('gender', form.gender);
    data.append('street', form.street);
    data.append('city', form.city);
    data.append('state', form.state);
    data.append('pincode', form.pincode);
    if (form.capacity) data.append('capacity', form.capacity);
    form.amenities.forEach((a) => data.append('amenities', a));
    if (form.rules) data.append('rules', JSON.stringify(form.rules.split('\n').filter(Boolean)));
    Array.from(form.images).forEach((img) => data.append('images', img));

    try {
      await dispatch(addProperty(data)).unwrap();
      toast.success('Property created!');
      onClose();
    } catch (err) {
      toast.error(err || 'Failed to create property');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add Property</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
              <input type="text" value={form.title} onChange={update('title')} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description} onChange={update('description')} rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Price (₹/month) *</label>
              <input type="number" value={form.price} onChange={update('price')} required min={0} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label>
              <input type="number" value={form.capacity} onChange={update('capacity')} min={1} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Type *</label>
              <select value={form.type} onChange={update('type')} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500">
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Gender *</label>
              <select value={form.gender} onChange={update('gender')} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500">
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Street Address *</label>
              <input type="text" value={form.street} onChange={update('street')} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">City *</label>
              <input type="text" value={form.city} onChange={update('city')} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">State *</label>
              <input type="text" value={form.state} onChange={update('state')} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Pincode *</label>
              <input type="text" value={form.pincode} onChange={update('pincode')} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_LIST.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                    form.amenities.includes(amenity)
                      ? 'border-rushkey-500 bg-rushkey-50 text-rushkey-700'
                      : 'border-gray-300 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rules (one per line)</label>
            <textarea value={form.rules} onChange={update('rules')} rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-rushkey-500" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setForm((prev) => ({ ...prev, images: e.target.files }))}
              className="w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-rushkey-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rushkey-700"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-rushkey-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-rushkey-600">
              Create Property
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
