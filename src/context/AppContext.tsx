import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  Campaign,
  ClipBounty,
  ClipSubmission,
  FreelanceGig,
  UGCOrder,
  Conversation,
  Message,
  Transaction,
  NotificationItem,
  UserRole
} from '../types';
import {
  hasPermission as checkHasPermission,
  canAccessTab as checkCanAccessTab,
  Permission
} from '../lib/permissions';
import {
  CURRENT_USER,
  MOCK_CREATORS,
  MOCK_CAMPAIGNS,
  MOCK_BOUNTIES,
  MOCK_SUBMISSIONS,
  MOCK_FREELANCE_GIGS,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  // User & Perspective
  currentUser: UserProfile;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  addRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Impersonation Support
  impersonatedUser: UserProfile | null;
  impersonateUser: (user: UserProfile | null) => void;
  exitImpersonation: () => void;

  // Permissions Helpers
  hasPermission: (permission: Permission) => boolean;
  canAccess: (tabId: string) => boolean;

  // Role Manager Modal
  isRoleManagerOpen: boolean;
  setIsRoleManagerOpen: (open: boolean) => void;

  // Wallet & Currency
  balanceKES: number;
  balanceUSD: number;
  transactions: Transaction[];
  depositMpesa: (phoneNumber: string, amountKES: number) => Promise<boolean>;
  withdrawMpesa: (phoneNumber: string, amountKES: number) => Promise<boolean>;

  // Marketplaces Data
  creators: UserProfile[];
  campaigns: Campaign[];
  bounties: ClipBounty[];
  submissions: ClipSubmission[];
  freelanceGigs: FreelanceGig[];

  // Actions
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'applicantsCount' | 'status'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  pauseCampaign: (id: string) => void;
  resumeCampaign: (id: string) => void;
  duplicateCampaign: (id: string) => void;
  archiveCampaign: (id: string) => void;
  submitClip: (bountyId: string, clipTitle: string, platformUrl: string) => void;
  approveSubmission: (submissionId: string, feedback?: string, rating?: number) => void;
  rejectSubmission: (submissionId: string, feedback?: string) => void;
  requestRevision: (submissionId: string, revisionNotes: string) => void;
  toggleBookmarkSubmission: (submissionId: string) => void;
  bookGig: (gigId: string) => void;

  // Messaging & Notifications
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (convId: string, text: string, offerDetails?: Message['offerDetails']) => void;
  
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationsAsRead: () => void;

  // Theme & Navigation
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Selected items for modals
  selectedCreator: UserProfile | null;
  setSelectedCreator: (creator: UserProfile | null) => void;
  selectedBounty: ClipBounty | null;
  setSelectedBounty: (bounty: ClipBounty | null) => void;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [currentRole, setCurrentRoleState] = useState<UserRole>(CURRENT_USER.activeRole || CURRENT_USER.role);
  const [impersonatedUser, setImpersonatedUser] = useState<UserProfile | null>(null);
  const [isRoleManagerOpen, setIsRoleManagerOpen] = useState<boolean>(false);

  const effectiveUser = impersonatedUser || currentUser;

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    setCurrentUser(prev => ({ ...prev, activeRole: role }));
  };

  const addRole = (role: UserRole) => {
    setCurrentUser(prev => {
      const existing = prev.additionalRoles || [];
      if (existing.includes(role) || prev.role === role) return prev;
      return {
        ...prev,
        additionalRoles: [...existing, role],
        activeRole: role
      };
    });
    setCurrentRoleState(role);
  };

  const impersonateUser = (target: UserProfile | null) => {
    setImpersonatedUser(target);
    if (target) {
      setCurrentRoleState(target.activeRole || target.role);
    } else {
      setCurrentRoleState(currentUser.activeRole || currentUser.role);
    }
  };

  const exitImpersonation = () => {
    setImpersonatedUser(null);
    setCurrentRoleState(currentUser.activeRole || currentUser.role);
  };

  const hasPermission = (permission: Permission) => {
    return checkHasPermission(effectiveUser, permission, currentRole);
  };

  const canAccess = (tabId: string) => {
    return checkCanAccessTab(tabId, effectiveUser, currentRole);
  };
  
  const [balanceKES, setBalanceKES] = useState<number>(44900);
  const balanceUSD = Math.round((balanceKES / 130) * 100) / 100;
  
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [creators] = useState<UserProfile[]>(MOCK_CREATORS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [bounties, setBounties] = useState<ClipBounty[]>(MOCK_BOUNTIES);
  const [submissions, setSubmissions] = useState<ClipSubmission[]>(MOCK_SUBMISSIONS);
  const [freelanceGigs] = useState<FreelanceGig[]>(MOCK_FREELANCE_GIGS);

  const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [activeConvId, setActiveConvId] = useState<string | null>('conv_001');

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('home');

  const [selectedCreator, setSelectedCreator] = useState<UserProfile | null>(null);
  const [selectedBounty, setSelectedBounty] = useState<ClipBounty | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync theme to document body class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // M-Pesa Deposit Simulation
  const depositMpesa = async (phoneNumber: string, amountKES: number): Promise<boolean> => {
    try {
      const response = await fetch('/api/payments/mpesa-express', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, amount: amountKES, type: 'deposit' })
      });
      const data = await response.json();

      if (data.success) {
        const newBalance = balanceKES + amountKES;
        setBalanceKES(newBalance);

        const newTx: Transaction = {
          id: 'tx_' + Date.now(),
          userId: currentUser.id,
          type: 'deposit',
          amountKES,
          amountUSD: Math.round((amountKES / 130) * 100) / 100,
          status: 'completed',
          provider: 'mpesa',
          reference: data.MpesaReceiptNumber || 'MP' + Math.floor(Math.random() * 1000000),
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          description: `M-Pesa STK Push Deposit (${phoneNumber})`,
          recipientOrSource: 'M-Pesa Express'
        };

        setTransactions(prev => [newTx, ...prev]);

        // Add Notification
        const newNotif: NotificationItem = {
          id: 'notif_' + Date.now(),
          title: '📲 M-Pesa Deposit Successful!',
          message: `Received ${amountKES.toLocaleString()} KES via M-Pesa. Ref: ${newTx.reference}`,
          type: 'money',
          read: false,
          timestamp: 'Just now'
        };
        setNotifications(prev => [newNotif, ...prev]);

        return true;
      }
      return false;
    } catch (error) {
      console.error('M-Pesa Deposit error:', error);
      return false;
    }
  };

  // M-Pesa Withdrawal Simulation
  const withdrawMpesa = async (phoneNumber: string, amountKES: number): Promise<boolean> => {
    if (amountKES > balanceKES) {
      alert('Insufficient wallet balance for this withdrawal.');
      return false;
    }

    const newBalance = balanceKES - amountKES;
    setBalanceKES(newBalance);

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      type: 'withdrawal',
      amountKES,
      amountUSD: Math.round((amountKES / 130) * 100) / 100,
      status: 'completed',
      provider: 'mpesa',
      reference: 'WTH' + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: `M-Pesa Withdrawal to ${phoneNumber}`,
      recipientOrSource: `M-Pesa B2C (${phoneNumber})`
    };

    setTransactions(prev => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '💸 M-Pesa Withdrawal Sent!',
      message: `Withdrew ${amountKES.toLocaleString()} KES to phone ${phoneNumber}. Ref: ${newTx.reference}`,
      type: 'money',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return true;
  };

  // Campaign Creation & Actions
  const createCampaign = (newCamp: Omit<Campaign, 'id' | 'createdAt' | 'applicantsCount' | 'status'>) => {
    const campaign: Campaign = {
      ...newCamp,
      id: 'camp_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: 'active'
    };

    setCampaigns(prev => [campaign, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '🚀 Campaign Live on ClipKenya!',
      message: `Your campaign "${campaign.title}" is now active with a budget of ${campaign.budgetKES.toLocaleString()} KES.`,
      type: 'success',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const pauseCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'paused' } : c));
  };

  const resumeCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'active' } : c));
  };

  const duplicateCampaign = (id: string) => {
    const orig = campaigns.find(c => c.id === id);
    if (!orig) return;
    const dup: Campaign = {
      ...orig,
      id: 'camp_' + Date.now(),
      title: `${orig.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: 'draft'
    };
    setCampaigns(prev => [dup, ...prev]);
  };

  const archiveCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'archived' } : c));
  };

  // Submissions Actions
  const approveSubmission = (submissionId: string, feedback?: string, rating?: number) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      status: 'approved',
      feedback: feedback || s.feedback,
      rating: rating || s.rating,
      approvedAt: new Date().toISOString().split('T')[0]
    } : s));

    // Release payout or track escrow payout
    const payout = sub.payoutKES || 2500;
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      userId: sub.editorId,
      type: 'escrow_release',
      amountKES: payout,
      amountUSD: Math.round((payout / 130) * 100) / 100,
      status: 'completed',
      provider: 'mpesa',
      reference: 'PAY' + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: `Clip Approved & Paid: "${sub.clipTitle}"`,
      recipientOrSource: sub.editorName
    };
    setTransactions(prev => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '🎉 Clip Approved!',
      message: `Approved clip "${sub.clipTitle}" from ${sub.editorName}. Payout of ${payout.toLocaleString()} KES processed.`,
      type: 'success',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const rejectSubmission = (submissionId: string, feedback?: string) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      status: 'rejected',
      feedback: feedback || 'Does not meet campaign guidelines.'
    } : s));

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '❌ Submission Rejected',
      message: `Rejected clip "${sub.clipTitle}" by ${sub.editorName}.`,
      type: 'info',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const requestRevision = (submissionId: string, revisionNotes: string) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      status: 'revision_requested',
      revisionNotes
    } : s));

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '📝 Revision Requested',
      message: `Requested revision on "${sub.clipTitle}" from ${sub.editorName}.`,
      type: 'warning',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleBookmarkSubmission = (submissionId: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, bookmarked: !s.bookmarked } : s));
  };

  // Clip Submission
  const submitClip = (bountyId: string, clipTitle: string, platformUrl: string) => {
    const bounty = bounties.find(b => b.id === bountyId);
    if (!bounty) return;

    const newSubmission: ClipSubmission = {
      id: 'sub_' + Date.now(),
      bountyId,
      bountyTitle: bounty.streamTitle,
      editorId: currentUser.id,
      editorName: currentUser.name,
      editorAvatar: currentUser.avatar,
      clipTitle,
      platformUrl,
      thumbnail: bounty.thumbnail,
      status: 'pending',
      views: 0,
      payoutKES: 0,
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    // Update submission count on bounty
    setBounties(prev => prev.map(b => b.id === bountyId ? { ...b, submissionsCount: b.submissionsCount + 1 } : b));

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '🎬 Clip Submitted for Verification',
      message: `Submitted "${clipTitle}" for ${bounty.hostName}'s bounty. Payout tracks views automatically.`,
      type: 'info',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Book Gig / Service
  const bookGig = (gigId: string) => {
    const gig = freelanceGigs.find(g => g.id === gigId);
    if (!gig) return;

    if (balanceKES < gig.startingPriceKES) {
      alert(`Insufficient funds. You need ${gig.startingPriceKES.toLocaleString()} KES in your wallet to hire ${gig.freelancerName}. Please top up via M-Pesa.`);
      return;
    }

    // Lock Escrow
    setBalanceKES(prev => prev - gig.startingPriceKES);

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      type: 'escrow_lock',
      amountKES: gig.startingPriceKES,
      amountUSD: Math.round((gig.startingPriceKES / 130) * 100) / 100,
      status: 'completed',
      provider: 'card',
      reference: 'ESC' + Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: `Escrow Held: Order for "${gig.title}"`,
      recipientOrSource: `ClipKenya Escrow Protection (${gig.freelancerName})`
    };

    setTransactions(prev => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '🔒 Order Placed & Escrow Protected!',
      message: `${gig.startingPriceKES.toLocaleString()} KES locked safely in ClipKenya Escrow for ${gig.freelancerName}.`,
      type: 'success',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Send Chat Message
  const sendMessage = (convId: string, text: string, offerDetails?: Message['offerDetails']) => {
    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      offerDetails
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: effectiveUser,
        currentRole,
        setCurrentRole,
        addRole,
        updateUserProfile,
        impersonatedUser,
        impersonateUser,
        exitImpersonation,
        hasPermission,
        canAccess,
        isRoleManagerOpen,
        setIsRoleManagerOpen,
        balanceKES,
        balanceUSD,
        transactions,
        depositMpesa,
        withdrawMpesa,
        creators,
        campaigns,
        bounties,
        submissions,
        freelanceGigs,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        pauseCampaign,
        resumeCampaign,
        duplicateCampaign,
        archiveCampaign,
        submitClip,
        approveSubmission,
        rejectSubmission,
        requestRevision,
        toggleBookmarkSubmission,
        bookGig,
        conversations,
        messages,
        activeConvId,
        setActiveConvId,
        sendMessage,
        notifications,
        unreadNotifsCount,
        markNotificationsAsRead,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedCreator,
        setSelectedCreator,
        selectedBounty,
        setSelectedBounty,
        selectedCampaign,
        setSelectedCampaign,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
