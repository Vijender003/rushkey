import { useState } from 'react';
import { motion } from 'framer-motion';
import { getAdminSession } from '@/utils/adminAuth';
import { useToast } from '@/components/admin/Toast';
import Input from '@/components/admin/Input';

export default function AdminSettings() {
  const session = getAdminSession();
  const toast = useToast();

  const [profile, setProfile] = useState({
    name: session?.name || 'Rushkey Admin',
    email: session?.email || 'admin@pgfinder.com',
  });

  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast('Profile updated successfully', 'success');
    setProfileSaving(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast('Passwords do not match', 'error');
      return;
    }
    if (password.new.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }
    setPasswordSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast('Password changed successfully', 'success');
    setPassword({ current: '', new: '', confirm: '' });
    setPasswordSaving(false);
  };

  const btnClass = (saving) =>
    `px-5 py-2.5 bg-rushkey-500 hover:bg-rushkey-600 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-70 flex items-center gap-2 shadow-sm`;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your admin account</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rushkey-500 to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-sm">
              {session?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <p className="text-sm text-gray-500">Update your profile information</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <button type="submit" disabled={profileSaving} className={btnClass(profileSaving)}>
              {profileSaving ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>
              ) : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Change Password</h2>
          <p className="text-sm text-gray-500 mb-5">Update your password</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input label="Current Password" type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="New Password" type="password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })} />
              <Input label="Confirm Password" type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />
            </div>
            <button type="submit" disabled={passwordSaving} className={btnClass(passwordSaving)}>
              {passwordSaving ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Updating...</>
              ) : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
