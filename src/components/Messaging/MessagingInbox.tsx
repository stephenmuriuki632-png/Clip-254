import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, Paperclip, DollarSign, Check, X, ShieldCheck, FileText } from 'lucide-react';

export const MessagingInbox: React.FC = () => {
  const { conversations, messages, activeConvId, setActiveConvId, sendMessage, currentUser } = useApp();
  
  const [inputText, setInputText] = useState('');
  const [showContractOfferModal, setShowContractOfferModal] = useState(false);

  // Contract offer form states
  const [offerTitle, setOfferTitle] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDeliverables, setOfferDeliverables] = useState('');
  const [offerDeadline, setOfferDeadline] = useState('2026-08-15');

  const currentConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConvId ? (messages[activeConvId] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText || !activeConvId) return;

    sendMessage(activeConvId, inputText);
    setInputText('');
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle || !offerAmount || !activeConvId) return;

    sendMessage(activeConvId, `Contract Offer Created: "${offerTitle}" for ${Number(offerAmount).toLocaleString()} KES`, {
      title: offerTitle,
      amountKES: Number(offerAmount),
      deliverables: offerDeliverables,
      deadline: offerDeadline,
      status: 'pending'
    });

    setShowContractOfferModal(false);
    setOfferTitle('');
    setOfferAmount('');
    setOfferDeliverables('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Conversations Sidebar */}
        <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Messages & Contracts</span>
            </h3>
          </div>

          <div className="space-y-2">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeConvId === c.id
                    ? 'bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/60 dark:border-indigo-800 text-slate-900 dark:text-white font-semibold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <img
                  src={c.participantAvatar}
                  alt={c.participantName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {c.participantName}
                    </p>
                    <span className="text-[9px] text-slate-400">{c.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="md:col-span-8 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40 p-4 sm:p-6">
          
          {/* Chat Header */}
          {currentConv && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src={currentConv.participantAvatar}
                  alt={currentConv.participantName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-sm">
                      {currentConv.participantName}
                    </h4>
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-[10px] text-slate-400">{currentConv.participantRole}</span>
                </div>
              </div>

              <button
                onClick={() => setShowContractOfferModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <DollarSign className="w-4 h-4" />
                <span>Create Escrow Contract</span>
              </button>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 max-h-[450px]">
            {activeMessages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-indigo-600 text-white font-medium rounded-tr-none shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-tl-none shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Render Escrow Contract Offer Card if attached */}
                    {msg.offerDetails && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-900 text-white border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase">Escrow Contract Offer</span>
                          <span className="text-xs font-extrabold text-amber-300">
                            {msg.offerDetails.amountKES.toLocaleString()} KES
                          </span>
                        </div>
                        <p className="font-bold text-xs">{msg.offerDetails.title}</p>
                        <p className="text-[10px] text-slate-300">{msg.offerDetails.deliverables}</p>
                        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[10px]">
                          <span>Deadline: {msg.offerDetails.deadline}</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                            Protected by Escrow
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
            <input
              type="text"
              placeholder="Type your message or share Google Drive deliverable link..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>

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

    </div>
  );
};
