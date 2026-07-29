import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  CheckCheck, 
  Archive, 
  MoreVertical, 
  Plus, 
  FileText,
  DollarSign,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NoMessagesEmptyState } from './EmptyStates';

export const CreatorMessages: React.FC = () => {
  const { conversations, messages, activeConvId, setActiveConvId, sendMessage, currentUser } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [searchConv, setSearchConv] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerTitle, setOfferTitle] = useState('Custom Video Editing Contract');
  const [offerAmount, setOfferAmount] = useState(5000);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConvId ? (messages[activeConvId] || []) : [];

  const filteredConversations = conversations.filter(c => 
    c.participantName.toLowerCase().includes(searchConv.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchConv.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConvId) return;

    sendMessage(activeConvId, messageInput);
    setMessageInput('');
  };

  const handleSendOffer = () => {
    if (!activeConvId) return;
    sendMessage(activeConvId, `Custom Offer Created: ${offerTitle} for ${offerAmount.toLocaleString()} KES`, {
      title: offerTitle,
      amountKES: offerAmount,
      deliverables: '3 Vertical short-form edits + captions + color grading',
      deadline: '3 Days',
      status: 'pending'
    });
    setShowOfferModal(false);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden h-[680px] grid grid-cols-1 md:grid-cols-12">
      
      {/* Left Sidebar: Conversations List (4 cols) */}
      <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Messages & Offers</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {conversations.length} Active
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchConv}
              onChange={(e) => setSearchConv(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">No conversations found</div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 text-left transition-colors flex items-center gap-3 ${
                  activeConvId === conv.id
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-l-4 border-indigo-600'
                    : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{conv.participantName}</p>
                    <span className="text-[9px] text-slate-400">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            ))
          )}
        </div>

      </div>

      {/* Right Chat Panel (8 cols) */}
      {activeConv ? (
        <div className="md:col-span-8 flex flex-col h-full bg-white dark:bg-slate-900">
          
          {/* Chat Header */}
          <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.participantAvatar}
                alt={activeConv.participantName}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
              />
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{activeConv.participantName}</h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online • {activeConv.participantRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOfferModal(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Send Custom Offer</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/20 dark:bg-slate-900/20">
            {activeMessages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-200/60 dark:border-slate-700'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Custom Offer Box if present */}
                    {msg.offerDetails && (
                      <div className="p-3 rounded-xl bg-black/20 border border-white/20 space-y-1 mt-2">
                        <p className="font-bold text-xs uppercase tracking-wide">💼 Contract Offer</p>
                        <p className="text-[11px] font-semibold">{msg.offerDetails.title}</p>
                        <p className="text-sm font-mono font-extrabold text-emerald-300">
                          {msg.offerDetails.amountKES.toLocaleString()} KES
                        </p>
                        <p className="text-[9px] opacity-80">{msg.offerDetails.deliverables} • Deadline: {msg.offerDetails.deadline}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-70 pt-1">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-indigo-200" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Typing / Input Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
            <button type="button" className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Type your message to clipper..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        <div className="md:col-span-8 flex items-center justify-center p-8">
          <NoMessagesEmptyState />
        </div>
      )}

      {/* Custom Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-heading">
              Send Direct Escrow Offer
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Contract Title
                </label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Payout Amount (KES)
                </label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowOfferModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendOffer}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
              >
                Send Contract Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
