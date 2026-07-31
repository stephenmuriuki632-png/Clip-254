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
  UserRole,
  CommunityPost,
  CommunityComment,
  CommunityGroup,
  CommunityEvent,
  PollOption
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
  INITIAL_NOTIFICATIONS,
  MOCK_POSTS,
  MOCK_COMMUNITY_GROUPS,
  MOCK_COMMUNITY_EVENTS
} from '../data/mockData';
import { realtimeHub } from '../lib/supabase';

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

  // Messaging & Realtime Chat
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConvId: string | null;
  setActiveConvId: (id: string | null) => void;
  sendMessage: (convId: string, text: string, options?: Partial<Message>) => void;
  editMessage: (convId: string, messageId: string, newText: string) => void;
  deleteMessage: (convId: string, messageId: string) => void;
  pinMessage: (convId: string, messageId: string) => void;
  starMessage: (convId: string, messageId: string) => void;
  reactToMessage: (convId: string, messageId: string, emoji: string) => void;
  startNewConversation: (participant: UserProfile) => string;
  createGroupChat: (groupName: string, memberIds: string[], groupAvatar?: string) => string;
  togglePinConversation: (convId: string) => void;
  toggleArchiveConversation: (convId: string) => void;
  toggleMuteConversation: (convId: string) => void;
  blockUser: (userId: string) => void;
  reportUser: (userId: string, reason: string) => void;
  acceptEscrowContract: (convId: string, msgId: string) => void;
  declineEscrowContract: (convId: string, msgId: string) => void;
  blockedUserIds: string[];
  
  // Notification Centre
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  // Follow System
  followingUserIds: string[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;

  // Creator Community
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'commentsCount'>) => void;
  likeCommunityPost: (postId: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  saveCommunityPost: (postId: string) => void;
  deleteCommunityPost: (postId: string) => void;
  comments: Record<string, CommunityComment[]>;
  addComment: (postId: string, content: string, parentId?: string) => void;
  likeComment: (commentId: string) => void;
  pinComment: (commentId: string) => void;

  // Community Groups & Events
  communityGroups: CommunityGroup[];
  toggleJoinGroup: (groupId: string) => void;
  communityEvents: CommunityEvent[];
  toggleRsvpEvent: (eventId: string) => void;
  createEvent: (event: Omit<CommunityEvent, 'id' | 'attendeesCount'>) => void;

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
  
  const [balanceKES, setBalanceKES] = useState<number>(0);
  const balanceUSD = Math.round((balanceKES / 130) * 100) / 100;
  
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [creators] = useState<UserProfile[]>(MOCK_CREATORS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [bounties, setBounties] = useState<ClipBounty[]>(MOCK_BOUNTIES);
  const [submissions, setSubmissions] = useState<ClipSubmission[]>([]);
  const [freelanceGigs] = useState<FreelanceGig[]>(MOCK_FREELANCE_GIGS);

  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const [followingUserIds, setFollowingUserIds] = useState<string[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(MOCK_POSTS);
  const [comments, setComments] = useState<Record<string, CommunityComment[]>>({
    post_001: [
      {
        id: 'cmt_001',
        postId: 'post_001',
        authorId: 'usr_002',
        authorName: 'Wanjiku Njuguna',
        authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
        authorRole: 'Video Editor',
        content: 'I am available for Premiere Pro & CapCut editing! DMing you now.',
        timestamp: '1 hour ago',
        likesCount: 5,
        isLiked: true,
        isPinned: true
      }
    ]
  });
  const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>(MOCK_COMMUNITY_GROUPS);
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>(MOCK_COMMUNITY_EVENTS);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<string>('home');

  const [selectedCreator, setSelectedCreator] = useState<UserProfile | null>(null);
  const [selectedBounty, setSelectedBounty] = useState<ClipBounty | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Subscribe to Realtime messages and notifications across browser sessions/tabs
  useEffect(() => {
    const unsubMsg = realtimeHub.subscribe('chat_messages', (payload) => {
      if (payload && payload.convId && payload.message) {
        setMessages(prev => ({
          ...prev,
          [payload.convId]: [...(prev[payload.convId] || []).filter(m => m.id !== payload.message.id), payload.message]
        }));
      }
    });

    const unsubNotif = realtimeHub.subscribe('notifications', (payload) => {
      if (payload && payload.notification) {
        setNotifications(prev => [payload.notification, ...prev]);
      }
    });

    return () => {
      unsubMsg();
      unsubNotif();
    };
  }, []);

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
      title: '🚀 Campaign Live on ClipForge!',
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
      recipientOrSource: `ClipForge Escrow Protection (${gig.freelancerName})`
    };

    setTransactions(prev => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: '🔒 Order Placed & Escrow Protected!',
      message: `${gig.startingPriceKES.toLocaleString()} KES locked safely in ClipForge Escrow for ${gig.freelancerName}.`,
      type: 'success',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Send Chat Message
  const sendMessage = (convId: string, text: string, options?: Partial<Message>) => {
    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      ...options
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    // Broadcast via Realtime channel
    realtimeHub.publish('chat_messages', { convId, message: newMsg });

    // Update last message on conversation
    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      lastMessage: text || (options?.mediaType ? `[Shared ${options.mediaType}]` : 'Sent a file'),
      lastMessageTime: 'Just now'
    } : c));
  };

  const editMessage = (convId: string, messageId: string, newText: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => m.id === messageId ? { ...m, text: newText, isEdited: true } : m)
    }));
  };

  const deleteMessage = (convId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).filter(m => m.id !== messageId)
    }));
  };

  const pinMessage = (convId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => m.id === messageId ? { ...m, isPinned: !m.isPinned } : m)
    }));
  };

  const starMessage = (convId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => m.id === messageId ? { ...m, isStarred: !m.isStarred } : m)
    }));
  };

  const reactToMessage = (convId: string, messageId: string, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => {
        if (m.id !== messageId) return m;
        const reactions = m.reactions || [];
        const existingIndex = reactions.findIndex(r => r.emoji === emoji);
        let updatedReactions = [...reactions];
        if (existingIndex > -1) {
          const item = updatedReactions[existingIndex];
          if (item.users.includes(currentUser.id)) {
            item.users = item.users.filter(u => u !== currentUser.id);
            item.count -= 1;
          } else {
            item.users.push(currentUser.id);
            item.count += 1;
          }
          updatedReactions = updatedReactions.filter(r => r.count > 0);
        } else {
          updatedReactions.push({ emoji, count: 1, users: [currentUser.id] });
        }
        return { ...m, reactions: updatedReactions };
      })
    }));
  };

  const startNewConversation = (participant: UserProfile): string => {
    const existing = conversations.find(c => c.participantId === participant.id);
    if (existing) {
      setActiveConvId(existing.id);
      return existing.id;
    }

    const newConv: Conversation = {
      id: 'conv_' + Date.now(),
      type: 'private',
      participantId: participant.id,
      participantName: participant.name,
      participantAvatar: participant.avatar,
      participantRole: participant.role,
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      onlineStatus: 'online',
      lastSeen: 'Active now'
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);
    return newConv.id;
  };

  const createGroupChat = (groupName: string, memberIds: string[], groupAvatar?: string): string => {
    const memberProfiles = creators.filter(c => memberIds.includes(c.id));
    const members = [
      { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar, role: currentUser.role, isMod: true },
      ...memberProfiles.map(m => ({ id: m.id, name: m.name, avatar: m.avatar, role: m.role, isMod: false }))
    ];

    const newGroup: Conversation = {
      id: 'grp_' + Date.now(),
      type: 'group',
      participantId: 'grp_' + Date.now(),
      participantName: groupName,
      participantAvatar: groupAvatar || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=80',
      participantRole: 'Group Chat',
      groupName,
      groupAvatar,
      groupMembers: members,
      lastMessage: `${currentUser.name} created the group "${groupName}"`,
      lastMessageTime: 'Just now',
      unreadCount: 0
    };

    setConversations(prev => [newGroup, ...prev]);
    setActiveConvId(newGroup.id);
    return newGroup.id;
  };

  const togglePinConversation = (convId: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, isPinned: !c.isPinned } : c));
  };

  const toggleArchiveConversation = (convId: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, isArchived: !c.isArchived } : c));
  };

  const toggleMuteConversation = (convId: string) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, isMuted: !c.isMuted } : c));
  };

  const blockUser = (userId: string) => {
    setBlockedUserIds(prev => [...new Set([...prev, userId])]);
    setConversations(prev => prev.map(c => c.participantId === userId ? { ...c, isBlocked: true } : c));
    alert('User has been blocked.');
  };

  const reportUser = (userId: string, reason: string) => {
    alert(`Report submitted for user. Reason: ${reason}. Our moderation team will review this shortly.`);
  };

  const acceptEscrowContract = (convId: string, msgId: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => {
        if (m.id === msgId && m.offerDetails) {
          return {
            ...m,
            offerDetails: { ...m.offerDetails, status: 'accepted' }
          };
        }
        return m;
      })
    }));

    addNotification({
      title: '✅ Escrow Contract Accepted!',
      message: 'You accepted the contract offer. Funds are locked safely in Escrow.',
      type: 'success',
      category: 'campaigns'
    });
  };

  const declineEscrowContract = (convId: string, msgId: string) => {
    setMessages(prev => ({
      ...prev,
      [convId]: (prev[convId] || []).map(m => {
        if (m.id === msgId && m.offerDetails) {
          return {
            ...m,
            offerDetails: { ...m.offerDetails, status: 'declined' }
          };
        }
        return m;
      })
    }));
  };

  // Notification Centre Handlers
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const item: NotificationItem = {
      ...notif,
      id: 'notif_' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [item, ...prev]);
    realtimeHub.publish('notifications', { notification: item });
  };

  // Follow Handlers
  const followUser = (userId: string) => {
    setFollowingUserIds(prev => [...new Set([...prev, userId])]);
    addNotification({
      title: '👤 User Followed',
      message: `You are now following user ${userId}`,
      type: 'info',
      category: 'community'
    });
  };

  const unfollowUser = (userId: string) => {
    setFollowingUserIds(prev => prev.filter(id => id !== userId));
  };

  // Community Feed Handlers
  const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'commentsCount'>) => {
    const newPost: CommunityPost = {
      ...post,
      id: 'post_' + Date.now(),
      timestamp: 'Just now',
      likesCount: 1,
      commentsCount: 0,
      isLiked: true
    };

    setCommunityPosts(prev => [newPost, ...prev]);

    addNotification({
      title: '📢 Community Post Live',
      message: `Your post "${post.title}" is live on the Creator Lounge feed.`,
      type: 'success',
      category: 'community'
    });
  };

  const likeCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const votePoll = (postId: string, optionId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId && p.pollOptions) {
        const options = p.pollOptions.map(opt => {
          if (opt.id === optionId) {
            const users = opt.votedUserIds || [];
            if (!users.includes(currentUser.id)) {
              return { ...opt, votes: opt.votes + 1, votedUserIds: [...users, currentUser.id] };
            }
          }
          return opt;
        });
        const total = options.reduce((sum, o) => sum + o.votes, 0);
        return { ...p, pollOptions: options, pollTotalVotes: total };
      }
      return p;
    }));
  };

  const saveCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, isSaved: !p.isSaved } : p));
  };

  const deleteCommunityPost = (postId: string) => {
    setCommunityPosts(prev => prev.filter(p => p.id !== postId));
  };

  const addComment = (postId: string, content: string, parentId?: string) => {
    const newCmt: CommunityComment = {
      id: 'cmt_' + Date.now(),
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content,
      timestamp: 'Just now',
      likesCount: 0,
      parentId
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCmt]
    }));

    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
  };

  const likeComment = (commentId: string) => {
    setComments(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(postId => {
        copy[postId] = copy[postId].map(c => {
          if (c.id === commentId) {
            return {
              ...c,
              likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
              isLiked: !c.isLiked
            };
          }
          return c;
        });
      });
      return copy;
    });
  };

  const pinComment = (commentId: string) => {
    setComments(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(postId => {
        copy[postId] = copy[postId].map(c => {
          if (c.id === commentId) {
            return { ...c, isPinned: !c.isPinned };
          }
          return c;
        });
      });
      return copy;
    });
  };

  const toggleJoinGroup = (groupId: string) => {
    setCommunityGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          membersCount: g.isJoined ? g.membersCount - 1 : g.membersCount + 1,
          isJoined: !g.isJoined
        };
      }
      return g;
    }));
  };

  const toggleRsvpEvent = (eventId: string) => {
    setCommunityEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          attendeesCount: e.isAttending ? e.attendeesCount - 1 : e.attendeesCount + 1,
          isAttending: !e.isAttending
        };
      }
      return e;
    }));
  };

  const createEvent = (event: Omit<CommunityEvent, 'id' | 'attendeesCount'>) => {
    const newEvt: CommunityEvent = {
      ...event,
      id: 'evt_' + Date.now(),
      attendeesCount: 1,
      isAttending: true
    };
    setCommunityEvents(prev => [newEvt, ...prev]);
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
        editMessage,
        deleteMessage,
        pinMessage,
        starMessage,
        reactToMessage,
        startNewConversation,
        createGroupChat,
        togglePinConversation,
        toggleArchiveConversation,
        toggleMuteConversation,
        blockUser,
        reportUser,
        acceptEscrowContract,
        declineEscrowContract,
        blockedUserIds,
        notifications,
        unreadNotifsCount,
        markNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,
        followingUserIds,
        followUser,
        unfollowUser,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        votePoll,
        saveCommunityPost,
        deleteCommunityPost,
        comments,
        addComment,
        likeComment,
        pinComment,
        communityGroups,
        toggleJoinGroup,
        communityEvents,
        toggleRsvpEvent,
        createEvent,
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
