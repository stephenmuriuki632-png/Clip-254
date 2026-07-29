import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Heart, Share2, Tag, Plus, Send } from 'lucide-react';
import { MOCK_POSTS } from '../../data/mockData';

export const CommunityLounge: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const post = {
      id: 'post_' + Date.now(),
      authorId: 'usr_me_001',
      authorName: 'Maina Kamau',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      authorRole: 'Pro Creator',
      title: newTitle,
      content: newContent,
      category: 'General' as const,
      likesCount: 1,
      commentsCount: 0,
      timestamp: 'Just now',
      tags: ['#ClipKenyaFam']
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            Creator Community Lounge & Collab Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect with fellow African editors, voiceover artists, and creators. Share tips, co-host podcasts, and find co-creators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Post Form & Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Create Post Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
              Start a Discussion or Collab Request
            </h3>
            <form onSubmit={handlePostSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Topic Title (e.g. Need Swahili Voiceover Artist for 5 TikTok Clips)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <textarea
                required
                rows={3}
                placeholder="Share project details, budget, or tips for the community..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Community</span>
                </button>
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img src={p.authorAvatar} alt={p.authorName} className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{p.authorName}</h4>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{p.authorRole} • {p.timestamp}</span>
                  </div>
                  <span className="ml-auto px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold border border-indigo-200 dark:border-indigo-800">
                    {p.category}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {p.content}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => handleLike(p.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      p.isLiked ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${p.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{p.likesCount}</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{p.commentsCount} Comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Community Guidelines */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-indigo-400">ClipKenya Collab Rules</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              1. Keep discussions respectful and creator-focused.<br />
              2. Use ClipKenya Escrow for any paid collaboration deals.<br />
              3. No spamming non-verified external links.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
