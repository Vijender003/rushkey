import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getListingById, saveListing } from '@/data/adminMockData';
import { useToast } from '@/components/admin/Toast';
import Input from '@/components/admin/Input';

const AMENITIES = ['WiFi', 'AC', 'Food Included', 'Gym', 'Laundry', 'Housekeeping', 'Power Backup', 'CCTV', 'Attached Bathroom', 'Parking', 'TV', 'Geyser', 'Fridge', 'Balcony'];
const GENDERS = ['Boys', 'Girls', 'Co-living', 'Unisex'];
const ROOM_TYPES = ['Single', 'Double Sharing', 'Triple Sharing'];
const AVAILABILITY = ['Available', 'Few Rooms Left', 'Sold Out'];

const inputClass = (field, errors) =>
  `w-full px-3 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rushkey-500/20 focus:border-rushkey-500 transition-all ${
    errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
  }`;

export default function AdminAddListing() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    title: '', price: '', location: '', gender: '', roomType: '',
    amenities: [], description: '', image: '', availability: 'Available',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const listing = getListingById(id);
      if (listing) setForm(listing);
      else navigate('/admin/listings');
    }
  }, [id, isEdit, navigate]);

  const toggleAmenity = (amenity) =>
    setForm((p) => ({
      ...p,
      amenities: p.amenities.includes(amenity)
        ? p.amenities.filter((a) => a !== amenity)
        : [...p.amenities, amenity],
    }));

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.price.trim()) errs.price = 'Price is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.gender) errs.gender = 'Gender type is required';
    if (!form.roomType) errs.roomType = 'Room type is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      saveListing(form);
      toast(isEdit ? 'Listing updated successfully' : 'Listing created successfully', 'success');
      navigate('/admin/listings');
    } catch {
      toast('Failed to save listing', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Listing' : 'Add Listing'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{isEdit ? 'Update listing details' : 'Create a new property listing'}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Fully Furnished Boys PG near Cyber City"
              error={errors.title}
            />
          </div>

          <Input
            label="Price (per month)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="e.g. ₹8,500"
            error={errors.price}
          />

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Sector 22, Gurgaon"
            error={errors.location}
          />

          <Input
            label="Gender"
            type="select"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            error={errors.gender}
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => (<option key={g} value={g}>{g}</option>))}
          </Input>

          <Input
            label="Room Type"
            type="select"
            value={form.roomType}
            onChange={(e) => setForm({ ...form, roomType: e.target.value })}
            error={errors.roomType}
          >
            <option value="">Select room type</option>
            {ROOM_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
          </Input>

          <Input
            label="Availability"
            type="select"
            value={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          >
            {AVAILABILITY.map((a) => (<option key={a} value={a}>{a}</option>))}
          </Input>
        </div>

        <Input
          label="Description"
          type="textarea"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the property, nearby landmarks, what makes it special..."
          error={errors.description}
        />

        <Input
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all duration-150 ${
                  form.amenities.includes(amenity)
                    ? 'bg-rushkey-500 text-white border-rushkey-500 shadow-sm shadow-rushkey-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-70 flex items-center gap-2 shadow-sm"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              isEdit ? 'Update Listing' : 'Create Listing'
            )}
          </motion.button>
          <button
            type="button"
            onClick={() => navigate('/admin/listings')}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
