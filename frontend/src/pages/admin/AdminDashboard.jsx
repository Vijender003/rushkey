import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiUsers, HiPhone, HiEye, HiPlus, HiArrowRight } from 'react-icons/hi';
import { getListings, getUsers, getLeads } from '@/data/adminMockData';
import StatCard from '@/components/admin/StatCard';
import Badge from '@/components/admin/Badge';

const quickActions = [
  { label: 'Add Listing', path: '/admin/listings/new', icon: HiPlus, desc: 'Create a new PG listing' },
  { label: 'View Listings', path: '/admin/listings', icon: HiHome, desc: 'Manage all properties' },
  { label: 'View Leads', path: '/admin/leads', icon: HiPhone, desc: 'Check new inquiries' },
  { label: 'View Users', path: '/admin/users', icon: HiUsers, desc: 'Manage registered users' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listings = getListings();
    const users = getUsers();
    const leads = getLeads();

    setStats([
      { label: 'Total Listings', value: listings.length, icon: HiHome, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', index: 0, trend: 12 },
      { label: 'Active Listings', value: listings.filter((l) => l.status === 'Active').length, icon: HiEye, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', index: 1, trend: 8 },
      { label: 'Total Users', value: users.length, icon: HiUsers, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', index: 2, trend: -3 },
      { label: 'New Leads', value: leads.filter((l) => !l.contacted).length, icon: HiPhone, color: 'from-rushkey-500 to-orange-500', bg: 'bg-rushkey-50', index: 3, trend: 24 },
    ]);

    setRecentListings(listings.slice(0, 5));
    setRecentLeads(leads.slice(0, 5));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Recent Listings</h2>
              <button
                onClick={() => navigate('/admin/listings')}
                className="text-sm text-rushkey-600 hover:text-rushkey-700 font-medium flex items-center gap-1"
              >
                View all <HiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {recentListings.length === 0 ? (
              <p className="text-sm text-gray-400 py-10 text-center">No listings yet</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => navigate('/admin/listings')}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    <img src={listing.image} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0 ring-1 ring-gray-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{listing.price} &middot; {listing.location}</p>
                    </div>
                    <Badge variant={listing.availability} dot>{listing.availability}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Recent Leads</h2>
              <button
                onClick={() => navigate('/admin/leads')}
                className="text-sm text-rushkey-600 hover:text-rushkey-700 font-medium flex items-center gap-1"
              >
                View all <HiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-gray-400 py-10 text-center">No leads yet</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-9 h-9 rounded-full bg-rushkey-50 flex items-center justify-center shrink-0 ring-1 ring-rushkey-100">
                      <HiPhone className="w-4 h-4 text-rushkey-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500 truncate">{lead.listing}</p>
                    </div>
                    <Badge variant={lead.contacted ? 'Contacted' : 'New'} dot>
                      {lead.contacted ? 'Contacted' : 'New'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all text-center"
                >
                  <div className="p-2.5 rounded-xl bg-rushkey-50 text-rushkey-600">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                  <span className="text-[10px] text-gray-400">{action.desc}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              {[
                { label: 'Avg. Listing Price', value: '₹9,800', change: '+5%', up: true },
                { label: 'Conversion Rate', value: '24%', change: '+3%', up: true },
                { label: 'Pending Reviews', value: '12', change: '-2', up: false },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                    <span className={`text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
