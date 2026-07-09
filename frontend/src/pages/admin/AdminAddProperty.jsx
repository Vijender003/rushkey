import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addProperty } from '@/features/properties/propertySlice';
import { AMENITIES_LIST } from '@/lib/constants';
import { HiCheck, HiPhotograph, HiX } from 'react-icons/hi';

const steps = ['Basic Info', 'Location', 'Pricing', 'Amenities', 'Images', 'Publish'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i <= current ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < current ? <HiCheck className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= current ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 transition-colors duration-300 ${i < current ? 'bg-indigo-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function AdminAddProperty() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.properties);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: '', description: '', type: 'pg', gender: 'boys',
    street: '', city: '', state: '', pincode: '', landmark: '',
    rent: '', deposit: '', roomType: 'private', capacity: '',
    amenities: [], rules: '', images: [],
  });

  const update = (f) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [f]: val }));
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: '' }));
  };

  const toggleAmenity = (a) => {
    setForm((p) => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter((x) => x !== a) : [...p.amenities, a],
    }));
  };

  const addImages = (files) => setForm((p) => ({ ...p, images: [...Array.from(p.images), ...files] }));
  const removeImage = (i) => setForm((p) => ({ ...p, images: Array.from(p.images).filter((_, idx) => idx !== i) }));

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.title.trim()) errs.title = 'Required';
      if (!form.description.trim()) errs.description = 'Required';
    }
    if (step === 1) {
      if (!form.street.trim()) errs.street = 'Required';
      if (!form.city.trim()) errs.city = 'Required';
      if (!form.state.trim()) errs.state = 'Required';
      if (!form.pincode.trim()) errs.pincode = 'Required';
    }
    if (step === 2) {
      if (!form.rent) errs.rent = 'Required';
      if (!form.capacity) errs.capacity = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((p) => Math.min(p + 1, 5)); };
  const prev = () => setStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('title', form.title.trim());
    data.append('description', form.description.trim());
    data.append('price', form.rent);
    data.append('type', form.type);
    data.append('gender', form.gender);
    data.append('street', form.street.trim());
    data.append('city', form.city.trim());
    data.append('state', form.state.trim());
    data.append('pincode', form.pincode.trim());
    if (form.landmark) data.append('landmark', form.landmark.trim());
    if (form.deposit) data.append('deposit', form.deposit);
    if (form.capacity) data.append('capacity', form.capacity);
    form.amenities.forEach((a) => data.append('amenities', a));
    if (form.rules) data.append('rules', JSON.stringify(form.rules.split('\n').filter(Boolean)));
    Array.from(form.images).forEach((img) => data.append('images', img));

    try {
      await dispatch(addProperty(data)).unwrap();
      toast.success('Property published!');
      setForm({
        title: '', description: '', type: 'pg', gender: 'boys',
        street: '', city: '', state: '', pincode: '', landmark: '',
        rent: '', deposit: '', roomType: 'private', capacity: '',
        amenities: [], rules: '', images: [],
      });
      setStep(0);
    } catch {
      toast.error('Failed to create property');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.08)]'
        : 'border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]'
    }`;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h3>
            <p className="text-sm text-gray-400 mb-5">Tell tenants what this property offers</p>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Title</label>
              <input className={input('title')} value={form.title} onChange={update('title')} placeholder="e.g. Starlight Executive PG" />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label>
              <textarea className={input('description')} value={form.description} onChange={update('description')} rows={3} placeholder="Describe the property..." />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Type</label>
                <select className={input('type')} value={form.type} onChange={update('type')}>
                  {['pg', 'hostel', 'apartment', 'room'].map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Gender</label>
                <select className={input('gender')} value={form.gender} onChange={update('gender')}>
                  {[{ v: 'boys', l: 'Boys' }, { v: 'girls', l: 'Girls' }, { v: 'co-living', l: 'Co-Living' }].map((g) => (
                    <option key={g.v} value={g.v}>{g.l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-sm text-gray-400 mb-5">Where is this property located?</p>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Street Address</label>
              <input className={input('street')} value={form.street} onChange={update('street')} placeholder="123 Main St" />
              {errors.street && <p className="text-xs text-red-400 mt-1">{errors.street}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">City</label>
                <input className={input('city')} value={form.city} onChange={update('city')} placeholder="Bangalore" />
                {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">State</label>
                <input className={input('state')} value={form.state} onChange={update('state')} placeholder="Karnataka" />
                {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Pincode</label>
                <input className={input('pincode')} value={form.pincode} onChange={update('pincode')} placeholder="560001" />
                {errors.pincode && <p className="text-xs text-red-400 mt-1">{errors.pincode}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Landmark (optional)</label>
                <input className={input('title')} value={form.landmark} onChange={update('landmark')} placeholder="Near Metro Station" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing & Capacity</h3>
            <p className="text-sm text-gray-400 mb-5">Set pricing and room details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Monthly Rent (₹)</label>
                <input type="number" className={input('rent')} value={form.rent} onChange={update('rent')} placeholder="8500" />
                {errors.rent && <p className="text-xs text-red-400 mt-1">{errors.rent}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Security Deposit (₹)</label>
                <input type="number" className={input('title')} value={form.deposit} onChange={update('deposit')} placeholder="10000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Total Capacity</label>
                <input type="number" className={input('capacity')} value={form.capacity} onChange={update('capacity')} placeholder="4" />
                {errors.capacity && <p className="text-xs text-red-400 mt-1">{errors.capacity}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Room Type</label>
                <select className={input('title')} value={form.roomType} onChange={update('roomType')}>
                  <option value="private">Private Room</option>
                  <option value="shared">Shared Room</option>
                  <option value="dorm">Dormitory</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
            <p className="text-sm text-gray-400 mb-5">Select what this property offers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((a) => (
                <motion.button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                    form.amenities.includes(a)
                      ? 'border-indigo-500 bg-indigo-50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    form.amenities.includes(a) ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                  }`}>
                    {form.amenities.includes(a) && <HiCheck className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${form.amenities.includes(a) ? 'text-indigo-700' : 'text-gray-600'}`}>{a}</span>
                </motion.button>
              ))}
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">House Rules (one per line)</label>
              <textarea className={input('title')} value={form.rules} onChange={update('rules')} rows={3} placeholder="No smoking" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Images</h3>
            <p className="text-sm text-gray-400 mb-5">Upload photos of the property</p>
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-colors bg-gray-50/50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <HiPhotograph className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Drag & drop images here</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP supported</p>
                </div>
              </div>
              <input type="file" multiple accept="image/*" onChange={(e) => addImages(Array.from(e.target.files))} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {Array.from(form.images).map((file, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Publish</h3>
            <p className="text-sm text-gray-400 mb-5">Preview your listing before publishing</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Title', value: form.title },
                { label: 'Rent', value: form.rent && `₹${form.rent}/month` },
                { label: 'Type', value: form.type && form.type.charAt(0).toUpperCase() + form.type.slice(1) },
                { label: 'Gender', value: form.gender && form.gender.charAt(0).toUpperCase() + form.gender.slice(1) },
                { label: 'Location', value: form.city && `${form.city}, ${form.state}` },
                { label: 'Amenities', value: form.amenities.length && `${form.amenities.length} selected` },
                { label: 'Capacity', value: form.capacity && `${form.capacity} persons` },
                { label: 'Images', value: form.images.length && `${form.images.length} uploaded` },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.value ? 'text-gray-900' : 'text-gray-300'}`}>{item.value || 'Not set'}</p>
                </div>
              ))}
            </div>
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Publishing...</>
              ) : (
                <><HiCheck className="w-5 h-5" /> Publish Property</>
              )}
            </motion.button>
          </div>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Property</h1>
        <p className="text-gray-400 text-sm mt-1">Create and publish verified PG listings</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 max-w-3xl">
        <StepIndicator current={step} />
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          {renderStep()}
        </motion.div>
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button onClick={prev} disabled={step === 0} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            Back
          </button>
          {step < 5 ? (
            <button onClick={next} className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm">
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}