import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  Paperclip,
  DollarSign,
  Check,
  CheckCheck,
  Pin,
  Star,
  Trash2,
  Edit2,
  Copy,
  Forward,
  Smile,
  Mic,
  Image,
  Video,
  FileText,
  Archive,
  VolumeX,
  ShieldAlert,
  UserX,
  Search,
  Plus,
  Users,
  MoreVertical,
  X,
  FileArchive,
  Play,
  Pause,
  Download,
  Info,
  ChevronDown,
  ShieldCheck,
  Radio,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { UserProfile, Conversation } from '../../types';

export const MessagingInbox: React.FC = () => {
  const {
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
    creators,
    currentUser
  } = useApp();

  // Search & Filter
  const [convFilter, setConvFilter] = useState<'all' | 'private' | 'group' | 'campaign' | 'pinned' | 'archived'>('all');
  const [searchConvQuery, setSearchConvQuery] = useState('');
  const [searchChatQuery, setSearchChatQuery] = useState('');
  const [showSearchChatBar, setShowSearchChatBar] = useState(false);

  // Active chat inputs & attachments
  const [inputText, setInputText] = useState('');
  const [replyingToMsg, setReplyingToMsg] = useState<{ id: string; senderName: string; text: string } | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showCampaignDetailsPanel, setShowCampaignDetailsPanel] = useState(false);

  // Voice note recording simulation
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const recordingIntervalRef = useRef<any>(null);

  // Modals
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showContractOfferModal, setShowContractOfferModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Contract form states
  const [offerTitle, setOfferTitle] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDeliverables, setOfferDeliverables] = useState('');
  const [offerDeadline, setOfferDeadline] = useState('2026-08-15');

  // Group Creation states
  const [groupNameInput, setGroupNameInput] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>([]);

  // Typing indicator simulation
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<any>(null);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessagesList = activeConvId ? (messages[activeConvId] || []) : [];

  // Filtered Conversations
  const filteredConversations = conversations.filter(c => {
    if (convFilter === 'pinned' && !c.isPinned) return false;
    if (convFilter === 'archived' && !c.isArchived) return false;
    if (convFilter !== 'archived' && c.isArchived) return false;
    if (convFilter === 'private' && c.type !== 'private') return false;
    if (convFilter === 'group' && c.type !== 'group') return false;
    if (convFilter === 'campaign' && c.type !== 'campaign') return false;

    if (searchConvQuery) {
      const q = searchConvQuery.toLowerCase();
      return c.participantName.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Messages inside active chat
  const displayedMessages = activeMessagesList.filter(m => {
    if (searchChatQuery) {
      return m.text.toLowerCase().includes(searchChatQuery.toLowerCase());
    }
    return true;
  });

  // Handle Typing Indicator Trigger
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Handle Send
  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    if (editingMsgId) {
      editMessage(activeConvId, editingMsgId, inputText);
      setEditingMsgId(null);
    } else {
      sendMessage(activeConvId, inputText, {
        replyTo: replyingToMsg || undefined
      });
    }

    setInputText('');
    setReplyingToMsg(null);
    setShowEmojiPicker(false);
    setShowGifPicker(false);
    setShowAttachmentMenu(false);
  };

  // Voice Recording Simulator
  const startVoiceRecording = () => {
    setIsRecordingVoice(true);
    setRecordingTimer(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTimer(prev => prev + 1);
    }, 1000);
  };

  const stopVoiceRecordingAndSend = () => {
    if (!activeConvId) return;
    clearInterval(recordingIntervalRef.current);
    setIsRecordingVoice(false);

    const dur = `${Math.floor(recordingTimer / 60)}:${(recordingTimer % 60).toString().padStart(2, '0')}`;
    sendMessage(activeConvId, `Voice Note (${dur})`, {
      mediaType: 'audio',
      voiceDuration: dur,
      mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg'
    });
    setRecordingTimer(0);
  };

  const cancelVoiceRecording = () => {
    clearInterval(recordingIntervalRef.current);
    setIsRecordingVoice(false);
    setRecordingTimer(0);
  };

  // Attach Media Helper
  const attachMedia = (type: 'image' | 'video' | 'document' | 'zip', fileSampleUrl: string, fileName: string) => {
    if (!activeConvId) return;
    sendMessage(activeConvId, `Sent ${type}: ${fileName}`, {
      mediaType: type,
      mediaUrl: fileSampleUrl,
      fileName,
      fileSize: '4.2 MB'
    });
    setShowAttachmentMenu(false);
  };

  // Send GIF
  const sendGif = (gifUrl: string) => {
    if (!activeConvId) return;
    sendMessage(activeConvId, 'Sent GIF', {
      mediaType: 'gif',
      mediaUrl: gifUrl
    });
    setShowGifPicker(false);
  };

  // Create Escrow Offer
  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle || !offerAmount || !activeConvId) return;

    sendMessage(activeConvId, `Contract Offer Created: "${offerTitle}" for ${Number(offerAmount).toLocaleString()} KES`, {
      offerDetails: {
        title: offerTitle,
        amountKES: Number(offerAmount),
        deliverables: offerDeliverables,
        deadline: offerDeadline,
        status: 'pending'
      }
    });

    setShowContractOfferModal(false);
    setOfferTitle('');
    setOfferAmount('');
    setOfferDeliverables('');
  };

  const trendingGifs = [
    { id: 'g1', url: 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif', tag: 'Clap' },
    { id: 'g2', url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', tag: 'Fire' },
    { id: 'g3', url: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif', tag: 'Celebration' },
    { id: 'g4', url: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif', tag: 'Mindblown' }
  ];

  const popularEmojis = ['❤️', '👍', '🔥', '😂', '😮', '🚀', '💯', '👏', '🤝', '🙌'];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-indigo-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-heading font-extrabold flex items-center gap-2">
              <span>ClipKenya Real-Time Messages & Group Hub</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> Live Supabase
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              End-to-end campaign chat, escrow contract proposals, voice notes, media sharing, and group moderation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewChatModal(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Direct Chat</span>
          </button>
          <button
            onClick={() => setShowCreateGroupModal(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {/* Main Inbox Grid */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs overflow-hidden min-h-[650px] grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Conversations Sidebar */}
        <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          
          <div className="p-3.5 space-y-3 border-b border-slate-100 dark:border-slate-700">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages or users..."
                value={searchConvQuery}
                onChange={(e) => setSearchConvQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {[
                { id: 'all', label: 'All' },
                { id: 'private', label: 'Direct' },
                { id: 'group', label: 'Groups' },
                { id: 'campaign', label: 'Campaigns' },
                { id: 'pinned', label: 'Pinned' },
                { id: 'archived', label: 'Archived' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setConvFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                    convFilter === f.id
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[520px]">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                <MessageSquare className="w-6 h-6 mx-auto text-slate-300" />
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isActive = activeConvId === c.id;
                return (
                  <div
                    key={c.id}
                    className={`group relative rounded-xl p-2.5 transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                    }`}
                    onClick={() => setActiveConvId(c.id)}
                  >
                    {/* Avatar with Status Dot */}
                    <div className="relative shrink-0">
                      <img
                        src={c.groupAvatar || c.participantAvatar}
                        alt={c.participantName}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                      />
                      {c.onlineStatus === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800" />
                      )}
                      {c.type === 'group' && (
                        <span className="absolute -top-1 -right-1 p-0.5 rounded-full bg-indigo-600 text-white">
                          <Users className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {c.participantName}
                          </h4>
                          {c.isPinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
                          {c.isMuted && <VolumeX className="w-3 h-3 text-slate-400 shrink-0" />}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">{c.lastMessageTime}</span>
                      </div>

                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate pr-2">
                          {c.lastMessage}
                        </p>
                        {c.unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold shrink-0">
                            {c.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Actions Menu */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => togglePinConversation(c.id)}
                        className="p-1 text-slate-400 hover:text-amber-500 rounded"
                        title={c.isPinned ? 'Unpin' : 'Pin'}
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => toggleArchiveConversation(c.id)}
                        className="p-1 text-slate-400 hover:text-indigo-500 rounded"
                        title={c.isArchived ? 'Unarchive' : 'Archive'}
                      >
                        <Archive className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Active Chat Main Pane */}
        <div className="md:col-span-8 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40 relative">
          
          {/* Chat Top Header */}
          {activeConv ? (
            <div className="p-3.5 sm:px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-2xs z-10">
              
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.groupAvatar || activeConv.participantAvatar}
                  alt={activeConv.participantName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                      {activeConv.participantName}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                    <span>{activeConv.participantRole}</span>
                    <span>•</span>
                    {activeConv.onlineStatus === 'online' ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                      </span>
                    ) : (
                      <span>Last seen {activeConv.lastSeen || 'recently'}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeConv.type === 'campaign' && (
                  <button
                    onClick={() => setShowCampaignDetailsPanel(!showCampaignDetailsPanel)}
                    className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Brief & Files</span>
                  </button>
                )}

                <button
                  onClick={() => setShowContractOfferModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Escrow Offer</span>
                </button>

                <button
                  onClick={() => setShowSearchChatBar(!showSearchChatBar)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Search in chat"
                >
                  <Search className="w-4 h-4" />
                </button>

                <div className="relative group">
                  <button className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-1 z-20 hidden group-hover:block text-xs">
                    <button
                      onClick={() => toggleMuteConversation(activeConv.id)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>{activeConv.isMuted ? 'Unmute' : 'Mute Notifications'}</span>
                    </button>
                    <button
                      onClick={() => blockUser(activeConv.participantId)}
                      className="w-full text-left p-2 rounded-lg hover:bg-red-50 text-red-600 dark:hover:bg-red-950/60 flex items-center gap-2"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Block User</span>
                    </button>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="w-full text-left p-2 rounded-lg hover:bg-red-50 text-red-600 dark:hover:bg-red-950/60 flex items-center gap-2"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Report User</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ) : null}

          {/* Search inside active chat bar */}
          {showSearchChatBar && (
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/80 border-b border-indigo-200 dark:border-indigo-800 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <input
                type="text"
                placeholder="Search keywords in this conversation..."
                value={searchChatQuery}
                onChange={(e) => setSearchChatQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button onClick={() => { setSearchChatQuery(''); setShowSearchChatBar(false); }} className="text-slate-400 font-bold text-xs">✕</button>
            </div>
          )}

          {/* Campaign Details Side Drawer Overlay */}
          {showCampaignDetailsPanel && activeConv?.type === 'campaign' && (
            <div className="absolute right-0 top-16 bottom-0 w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-5 z-20 overflow-y-auto space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h4 className="font-heading font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase">
                  Campaign Brief & Files
                </h4>
                <button onClick={() => setShowCampaignDetailsPanel(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {activeConv.campaignTitle || 'M-Pesa Global UGC Campaign'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 mt-1 inline-block">
                  Budget: {activeConv.campaignBudgetKES?.toLocaleString() || '45,000'} KES (In Escrow)
                </span>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">Deliverable Checklist</h5>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {(activeConv.campaignDeliverables || ['1x 45s Vertical Video', 'M-Pesa App Demo', '2 Revisions']).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">Attached Campaign Files</h5>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <span className="font-bold truncate max-w-[140px]">MPesa_Brand_Guide.pdf</span>
                    </div>
                    <a href="#download" className="text-indigo-600 dark:text-indigo-400 font-bold">Download</a>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileArchive className="w-4 h-4 text-amber-500" />
                      <span className="font-bold truncate max-w-[140px]">Raw_Logos_Assets.zip</span>
                    </div>
                    <a href="#download" className="text-indigo-600 dark:text-indigo-400 font-bold">Download</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[460px]">
            {displayedMessages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="font-bold">This is the start of your real-time conversation.</p>
                <p>Send a message, file, or Escrow contract offer below.</p>
              </div>
            ) : (
              displayedMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`group/msg flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 relative`}
                  >
                    {/* Top Sender & Time Label */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                      <span className="font-bold text-slate-600 dark:text-slate-300">{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                      {msg.isPinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />}
                      {msg.isStarred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    </div>

                    {/* Message Card */}
                    <div
                      className={`relative max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                        isMe
                          ? 'bg-indigo-600 text-white font-medium rounded-tr-none shadow-2xs'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-tl-none shadow-2xs'
                      }`}
                    >
                      {/* Quoted Reply if present */}
                      {msg.replyTo && (
                        <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 text-[11px] border-l-2 border-indigo-400 mb-2">
                          <span className="font-bold opacity-80">{msg.replyTo.senderName}</span>
                          <p className="truncate opacity-90">{msg.replyTo.text}</p>
                        </div>
                      )}

                      {/* Main Message Text */}
                      {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                      {/* Render Image Media */}
                      {msg.mediaType === 'image' && msg.mediaUrl && (
                        <div className="rounded-xl overflow-hidden border border-white/20 my-1">
                          <img src={msg.mediaUrl} alt="Attached image" className="max-h-60 w-full object-cover" />
                        </div>
                      )}

                      {/* Render Video Media */}
                      {msg.mediaType === 'video' && msg.mediaUrl && (
                        <div className="rounded-xl overflow-hidden border border-white/20 my-1">
                          <video src={msg.mediaUrl} controls className="max-h-60 w-full rounded-xl" />
                        </div>
                      )}

                      {/* Render Audio Voice Note */}
                      {msg.mediaType === 'audio' && (
                        <div className="p-2.5 rounded-xl bg-black/20 dark:bg-white/10 flex items-center gap-3 my-1">
                          <button className="p-2 rounded-full bg-indigo-500 text-white">
                            <Play className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex-1">
                            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                              <div className="w-1/3 h-full bg-white" />
                            </div>
                            <span className="text-[10px] opacity-80 mt-1 block">Voice Note • {msg.voiceDuration || '0:14'}</span>
                          </div>
                        </div>
                      )}

                      {/* Render Document/ZIP file */}
                      {(msg.mediaType === 'document' || msg.mediaType === 'zip') && (
                        <div className="p-2.5 rounded-xl bg-black/10 dark:bg-white/10 border border-white/20 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {msg.mediaType === 'zip' ? <FileArchive className="w-5 h-5 text-amber-300" /> : <FileText className="w-5 h-5 text-indigo-300" />}
                            <div>
                              <p className="font-bold text-xs truncate max-w-[180px]">{msg.fileName || 'document.pdf'}</p>
                              <span className="text-[10px] opacity-75">{msg.fileSize || '3.5 MB'}</span>
                            </div>
                          </div>
                          <a href={msg.mediaUrl || '#'} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white">
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}

                      {/* Render GIF */}
                      {msg.mediaType === 'gif' && msg.mediaUrl && (
                        <div className="rounded-xl overflow-hidden my-1">
                          <img src={msg.mediaUrl} alt="GIF" className="max-h-48 rounded-xl object-cover" />
                        </div>
                      )}

                      {/* Render Escrow Contract Offer Card if attached */}
                      {msg.offerDetails && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                              ClipKenya Escrow Contract
                            </span>
                            <span className="text-xs font-extrabold text-amber-300">
                              {msg.offerDetails.amountKES.toLocaleString()} KES
                            </span>
                          </div>
                          <p className="font-bold text-xs text-white">{msg.offerDetails.title}</p>
                          <p className="text-[11px] text-slate-300">{msg.offerDetails.deliverables}</p>

                          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[10px]">
                            <span>Deadline: {msg.offerDetails.deadline}</span>
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              msg.offerDetails.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              Status: {msg.offerDetails.status.toUpperCase()}
                            </span>
                          </div>

                          {msg.offerDetails.status === 'pending' && !isMe && (
                            <div className="pt-2 flex items-center gap-2">
                              <button
                                onClick={() => acceptEscrowContract(activeConv.id, msg.id)}
                                className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                              >
                                Accept & Start
                              </button>
                              <button
                                onClick={() => declineEscrowContract(activeConv.id, msg.id)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reactions list under message */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className="flex items-center gap-1 pt-1 flex-wrap">
                          {msg.reactions.map((r, ri) => (
                            <button
                              key={ri}
                              onClick={() => reactToMessage(activeConv.id, msg.id, r.emoji)}
                              className="px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-bold flex items-center gap-1"
                            >
                              <span>{r.emoji}</span>
                              <span>{r.count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Edited status */}
                      {msg.isEdited && <span className="text-[9px] opacity-60 block text-right">edited</span>}

                      {/* Status Checkmarks */}
                      <div className="flex justify-end pt-0.5">
                        <CheckCheck className="w-3 h-3 text-indigo-200 dark:text-indigo-400" />
                      </div>

                    </div>

                    {/* Action Bar on Hover */}
                    <div className="opacity-0 group-hover/msg:opacity-100 transition-opacity bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-md flex items-center gap-1 z-10">
                      {popularEmojis.slice(0, 4).map(e => (
                        <button key={e} onClick={() => reactToMessage(activeConv.id, msg.id, e)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-xs">
                          {e}
                        </button>
                      ))}
                      <button
                        onClick={() => setReplyingToMsg({ id: msg.id, senderName: msg.senderName, text: msg.text })}
                        className="p-1 hover:bg-slate-100 text-slate-500 rounded text-xs"
                        title="Reply"
                      >
                        <Forward className="w-3 h-3 scale-x-[-1]" />
                      </button>
                      <button
                        onClick={() => pinMessage(activeConv.id, msg.id)}
                        className="p-1 hover:bg-slate-100 text-slate-500 rounded text-xs"
                        title="Pin Message"
                      >
                        <Pin className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => starMessage(activeConv.id, msg.id)}
                        className="p-1 hover:bg-slate-100 text-slate-500 rounded text-xs"
                        title="Star Message"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                      {isMe && (
                        <button
                          onClick={() => deleteMessage(activeConv.id, msg.id)}
                          className="p-1 hover:bg-red-50 text-red-500 rounded text-xs"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}

            {/* Live Typing Indicator */}
            {isTyping && (
              <div className="text-[11px] text-slate-400 italic flex items-center gap-1.5 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                <span>typing message...</span>
              </div>
            )}
          </div>

          {/* Replying Banner Preview */}
          {replyingToMsg && (
            <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/80 border-t border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs">
              <div className="truncate">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Replying to {replyingToMsg.senderName}: </span>
                <span className="text-slate-600 dark:text-slate-300 truncate">{replyingToMsg.text}</span>
              </div>
              <button onClick={() => setReplyingToMsg(null)} className="text-slate-400 font-bold ml-2">✕</button>
            </div>
          )}

          {/* Voice Note Recording Simulator Overlay */}
          {isRecordingVoice ? (
            <div className="p-3 bg-red-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white animate-ping" />
                <span className="font-bold text-xs">Recording Voice Note ({recordingTimer}s)...</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={cancelVoiceRecording} className="px-3 py-1 rounded bg-white/20 text-xs font-bold">Cancel</button>
                <button onClick={stopVoiceRecordingAndSend} className="px-3 py-1 rounded bg-white text-red-600 font-bold text-xs">Send Voice Note</button>
              </div>
            </div>
          ) : (
            /* Input Bar */
            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 relative">
              
              {/* Attachment Popover */}
              {showAttachmentMenu && (
                <div className="absolute bottom-16 left-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 space-y-1 w-52 z-30 text-xs">
                  <button
                    onClick={() => attachMedia('image', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', 'Thumbnail_Preview.jpg')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2.5"
                  >
                    <Image className="w-4 h-4 text-sky-500" />
                    <span>Upload Image</span>
                  </button>
                  <button
                    onClick={() => attachMedia('video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Draft_Clip_4K.mp4')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2.5"
                  >
                    <Video className="w-4 h-4 text-purple-500" />
                    <span>Upload Video Clip</span>
                  </button>
                  <button
                    onClick={() => attachMedia('document', '#', 'Video_Script_Draft.pdf')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Document / PDF</span>
                  </button>
                  <button
                    onClick={() => attachMedia('zip', '#', 'Project_Assets_Bundle.zip')}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2.5"
                  >
                    <FileArchive className="w-4 h-4 text-amber-500" />
                    <span>ZIP Archive</span>
                  </button>
                </div>
              )}

              {/* Emoji Picker Popover */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 z-30 grid grid-cols-5 gap-2 w-60">
                  {popularEmojis.map(e => (
                    <button
                      key={e}
                      onClick={() => { setInputText(prev => prev + e); setShowEmojiPicker(false); }}
                      className="text-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              {/* GIF Selector Popover */}
              {showGifPicker && (
                <div className="absolute bottom-16 left-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-3 z-30 w-72 space-y-2">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Select Reaction GIF</span>
                    <button onClick={() => setShowGifPicker(false)} className="text-slate-400 font-bold">✕</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {trendingGifs.map(g => (
                      <img
                        key={g.id}
                        src={g.url}
                        alt={g.tag}
                        onClick={() => sendGif(g.url)}
                        className="rounded-xl h-20 w-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSend} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowGifPicker(!showGifPicker)}
                  className="px-2 py-1 text-[10px] font-extrabold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200"
                  title="GIFs"
                >
                  GIF
                </button>

                <input
                  type="text"
                  placeholder="Type message or paste drive link..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={startVoiceRecording}
                  className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  title="Record Voice Note"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </div>

      </div>

      {/* New Direct Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Start New Direct Conversation
              </h3>
              <button onClick={() => setShowNewChatModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {creators.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    startNewConversation(c);
                    setShowNewChatModal(false);
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3 text-left transition-colors"
                >
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</p>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400">{c.role} • {c.location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Group Chat Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Create Group Chat
              </h3>
              <button onClick={() => setShowCreateGroupModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Group Name</label>
                <input
                  type="text"
                  placeholder="e.g. Swahili UGC Creators Guild"
                  value={groupNameInput}
                  onChange={(e) => setGroupNameInput(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Group Members</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {creators.map(c => (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGroupMembers.includes(c.id)}
                        onChange={() => {
                          setSelectedGroupMembers(prev =>
                            prev.includes(c.id) ? prev.filter(i => i !== c.id) : [...prev, c.id]
                          );
                        }}
                        className="rounded text-indigo-600"
                      />
                      <span>{c.name} ({c.role})</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (groupNameInput && selectedGroupMembers.length > 0) {
                    createGroupChat(groupNameInput, selectedGroupMembers);
                    setShowCreateGroupModal(false);
                    setGroupNameInput('');
                    setSelectedGroupMembers([]);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs"
              >
                Create Group Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Offer Modal */}
      {showContractOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Create Escrow Contract Offer</span>
              </h3>
              <button onClick={() => setShowContractOfferModal(false)} className="text-slate-400 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contract Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1x 45s M-Pesa Global TikTok Video + Rights"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Escrow Amount (KES)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 45000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deliverable Requirements</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 1x 45s 1080p video, 2 revisions allowed, M-Pesa branding logo overlay"
                  value={offerDeliverables}
                  onChange={(e) => setOfferDeliverables(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs"
              >
                Send Contract Offer to Chat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Report User or Group
            </h3>
            <p className="text-xs text-slate-500">
              Please state the reason for your report. Our moderation team will investigate within 2 hours.
            </p>
            <textarea
              rows={3}
              placeholder="Provide details..."
              className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowReportModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
              <button
                onClick={() => {
                  if (activeConv) reportUser(activeConv.participantId, 'Inappropriate behavior');
                  setShowReportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
