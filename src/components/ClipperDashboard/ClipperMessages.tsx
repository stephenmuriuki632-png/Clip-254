import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Mic,
  Image as ImageIcon,
  CheckCheck,
  Pin,
  MoreVertical,
  Video
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClipperMessages: React.FC = () => {
  const { conversations, messages, activeConvId, setActiveConvId, sendMessage, currentUser } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const currentConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConvId ? (messages[activeConvId] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeConvId) return;
    sendMessage(activeConvId, inputMsg.trim());
    setInputMsg('');
  };

  const handleSendVoiceNote = () => {
    if (!activeConvId) return;
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      sendMessage(activeConvId, '🎤 Voice Note (0:18 sec audio draft)');
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[600px]">
      
      {/* Conversations Sidebar */}
      <div className="border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" /> Realtime Clipper Chat
          </h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                activeConvId === conv.id
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <img src={conv.participantAvatar} alt={conv.participantName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{conv.participantName}</h4>
                  <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className="md:col-span-2 flex flex-col h-full bg-slate-50/30 dark:bg-slate-950/20">
        {currentConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={currentConv.participantAvatar} alt={currentConv.participantName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{currentConv.participantName}</h4>
                  <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online • Ready to respond
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeMessages.map(m => {
                const isMe = m.senderId === currentUser.id;
                return (
                  <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                      {m.timestamp} {isMe && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendVoiceNote}
                className={`p-2 rounded-xl border transition-colors ${
                  isRecordingVoice ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="Send Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message to brand or creator..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            Select a conversation to start chatting.
          </div>
        )}
      </div>

    </div>
  );
};
