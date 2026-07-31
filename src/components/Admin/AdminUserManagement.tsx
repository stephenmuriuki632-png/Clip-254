import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, UserRole } from '../../types';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  KeyRound,
  Trash2,
  RefreshCw,
  Edit3,
  Download,
  Eye,
  History,
  Activity,
  CheckCircle,
  X,
  Star,
  MapPin,
  Mail,
  Smartphone
} from 'lucide-react';
import { AdminExportModal } from './AdminExportModal';

export const AdminUserManagement: React.FC = () => {
  const { creators, impersonateUser } = useApp();
  
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  
  // Selected User State for Modals
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [activeModal, setActiveModal] = useState<'edit' | 'loginHistory' | 'activityLogs' | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Local user overrides for demo interactivity
  const [suspendedUsers, setSuspendedUsers] = useState<Record<string, boolean>>({});
  const [bannedUsers, setBannedUsers] = useState<Record<string, boolean>>({});
  const [verifiedUsers, setVerifiedUsers] = useState<Record<string, boolean>>({});
  const [userRoles, setUserRoles] = useState<Record<string, UserRole>>({});

  const filteredUsers = creators.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const userRole = userRoles[u.id] || u.role;
    const matchesRole = roleFilter === 'all' || userRole === roleFilter;

    const isSuspended = suspendedUsers[u.id];
    const isBanned = bannedUsers[u.id];
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !isSuspended && !isBanned) ||
      (statusFilter === 'suspended' && isSuspended) ||
      (statusFilter === 'banned' && isBanned);

    const isVerified = verifiedUsers[u.id] !== undefined ? verifiedUsers[u.id] : u.verified;
    const matchesVerification =
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && isVerified) ||
      (verificationFilter === 'unverified' && !isVerified);

    return matchesSearch && matchesRole && matchesStatus && matchesVerification;
  });

  const toggleSuspend = (userId: string) => {
    setSuspendedUsers((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const toggleBan = (userId: string) => {
    setBannedUsers((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const toggleVerify = (userId: string) => {
    setVerifiedUsers((prev) => ({
      ...prev,
      [userId]: prev[userId] !== undefined ? !prev[userId] : true,
    }));
  };

  const changeRole = (userId: string, newRole: UserRole) => {
    setUserRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Ecosystem User Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Search, filter, manage roles, suspend/ban users, inspect login history and export audit logs.
          </p>
        </div>

        <button
          onClick={() => setIsExportOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export User Directory</span>
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, handle, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="all">All Roles</option>
            <option value="creator">Creator</option>
            <option value="editor">Editor / Clipper</option>
            <option value="ugc">UGC Creator</option>
            <option value="freelancer">Freelancer</option>
            <option value="brand">Brand</option>
            <option value="agency">Agency</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        <div>
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          >
            <option value="all">All Verifications</option>
            <option value="verified">Verified Badge</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">User Details</th>
              <th className="p-4">Role & Status</th>
              <th className="p-4">Location & Platform</th>
              <th className="p-4">Rating & Orders</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
            {filteredUsers.map((user) => {
              const isSuspended = suspendedUsers[user.id];
              const isBanned = bannedUsers[user.id];
              const isVerified = verifiedUsers[user.id] !== undefined ? verifiedUsers[user.id] : user.verified;
              const currentRole = userRoles[user.id] || user.role;

              return (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
                          {isVerified && (
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold" title="Verified Badge">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{user.handle} • {user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <select
                        value={currentRole}
                        onChange={(e) => changeRole(user.id, e.target.value as UserRole)}
                        className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-600"
                      >
                        <option value="creator">CREATOR</option>
                        <option value="editor">EDITOR</option>
                        <option value="ugc">UGC TALENT</option>
                        <option value="freelancer">FREELANCER</option>
                        <option value="brand">BRAND</option>
                        <option value="agency">AGENCY</option>
                        <option value="admin">ADMINISTRATOR</option>
                      </select>

                      <div>
                        {isBanned ? (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold">
                            Banned
                          </span>
                        ) : isSuspended ? (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold">
                            Suspended
                          </span>
                        ) : (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="text-slate-700 dark:text-slate-300 font-semibold">{user.location}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{user.primaryPlatform}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-bold text-amber-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {user.rating} ({user.reviewCount})
                    </p>
                    <p className="text-[10px] text-slate-400">{user.completedOrders} Orders</p>
                  </td>

                  <td className="p-4 text-right space-x-1.5">
                    <button
                      onClick={() => impersonateUser(user)}
                      title="Impersonate User"
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleVerify(user.id)}
                      title={isVerified ? 'Revoke Verification' : 'Verify Account'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isVerified
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleSuspend(user.id)}
                      title={isSuspended ? 'Unsuspend User' : 'Suspend User'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSuspended
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      <UserX className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleBan(user.id)}
                      title={isBanned ? 'Unban User' : 'Ban User'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBanned
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setActiveModal('loginHistory');
                      }}
                      title="View Login History & Audit"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Login History Modal */}
      {activeModal === 'loginHistory' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Login History & Security Logs: {selectedUser.name}</span>
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { ip: '102.140.211.84', loc: 'Nairobi, KE', dev: 'Chrome / macOS', time: '10 mins ago', status: 'Success' },
                { ip: '102.140.211.84', loc: 'Nairobi, KE', dev: 'M-Pesa Mobile App', time: '2 hours ago', status: 'Success' },
                { ip: '197.248.10.12', loc: 'Mombasa, KE', dev: 'Safari / iOS', time: 'Yesterday', status: 'MFA Verified' }
              ].map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{log.ip}</span>
                    <span className="text-[10px] text-emerald-500 font-bold">{log.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{log.loc} • {log.dev} • {log.time}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <AdminExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="User Directory"
        data={creators}
        filename="clipforge_users"
      />
    </div>
  );
};
