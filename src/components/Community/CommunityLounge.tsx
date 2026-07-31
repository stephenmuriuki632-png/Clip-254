import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Plus,
  Send,
  Users,
  Calendar,
  Search,
  CheckCircle,
  MoreVertical,
  Pin,
  Trash2,
  UserPlus,
  UserCheck,
  TrendingUp,
  Sparkles,
  BarChart2,
  Video,
  ExternalLink,
  Shield,
  ThumbsUp,
  Radio,
  Clock,
  Award,
  Globe
} from 'lucide-react';
import { CommunityPost, CommunityGroup, CommunityEvent } from '../../types';

export const CommunityLounge: React.FC = () => {
  const {
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
    followingUserIds,
    followUser,
    unfollowUser,
    creators,
    currentUser,
    startNewConversation,
    setActiveTab
  } = useApp();

  // Tab State: 'feed' | 'groups' | 'events' | 'network' | 'moderation'
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'groups' | 'events' | 'network'>('feed');

  // Feed Filter
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchPostQuery, setSearchPostQuery] = useState<string>('');

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Modals
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('Collab Requests');
  const [postMediaUrl, setPostMediaUrl] = useState('');
  const [pollOptionsInput, setPollOptionsInput] = useState<string[]>(['Option 1', 'Option 2']);
  const [isPollPost, setIsPollPost] = useState(false);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<CommunityEvent['category']>('Masterclass');
  const [eventHost, setEventHost] = useState(currentUser.name);
  const [eventDate, setEventDate] = useState('2026-08-20T18:00');
  const [eventPrizePool, setEventPrizePool] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventMeetingLink, setEventMeetingLink] = useState('');

  // Filtered Posts
  const filteredPosts = communityPosts.filter(p => {
    if (categoryFilter !== 'all' && p.category.toLowerCase().replace(/\s+/g, '') !== categoryFilter.toLowerCase().replace(/\s+/g, '')) {
      return false;
    }
    if (searchPostQuery) {
      const q = searchPostQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q);
    }
    return true;
  });

  // Handle Comment Send
  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Handle New Post Submit
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    const pollOpts = isPollPost
      ? pollOptionsInput.filter(o => o.trim().length > 0).map((optText, idx) => ({
          id: `opt_${idx + 1}`,
          optionText: optText,
          votes: 0,
          votedUserIds: []
        }))
      : undefined;

    addCommunityPost({
      title: postTitle,
      content: postContent,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      category: postCategory,
      mediaUrl: postMediaUrl || undefined,
      mediaType: postMediaUrl ? 'image' : undefined,
      pollOptions: pollOpts,
      pollTotalVotes: isPollPost ? 0 : undefined,
      tags: ['#ClipForge', `#${postCategory.replace(/\s+/g, '')}`]
    });

    setShowCreatePostModal(false);
    setPostTitle('');
    setPostContent('');
    setPostMediaUrl('');
    setIsPollPost(false);
  };

  // Handle New Event Submit
  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;

    createEvent({
      title: eventTitle,
      category: eventCategory,
      hostName: eventHost,
      hostAvatar: currentUser.avatar,
      date: eventDate.replace('T', ' '),
      prizePoolKES: eventPrizePool ? Number(eventPrizePool) : undefined,
      description: eventDescription,
      meetingLink: eventMeetingLink || 'https://meet.google.com/clipforge-live',
      bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    });

    setShowCreateEventModal(false);
    setEventTitle('');
    setEventDescription('');
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-800/60">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-500/30">
              Kenyan Creator Hub
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-500/30">
              <Radio className="w-3 h-3 animate-ping text-emerald-400" /> Live Discussions
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Creator Lounge & Collaboration Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Connect with Kenya's top video editors, UGC creators, stream clippers, and brands. Share editing tips, post collaboration requests, or join live masterclasses.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreatePostModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create Discussion</span>
          </button>
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Host Event</span>
          </button>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 overflow-x-auto">
        {[
          { id: 'feed', label: 'Community Feed', icon: Sparkles },
          { id: 'groups', label: 'Niche Hubs & Groups', icon: Users },
          { id: 'events', label: 'Events & Masterclasses', icon: Calendar },
          { id: 'network', label: 'Following & Network', icon: UserCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl font-heading font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COMMUNITY FEED */}
      {activeSubTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search posts, editors, or topics..."
                    value={searchPostQuery}
                    onChange={(e) => setSearchPostQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: 'all', label: 'All Discussions' },
                  { id: 'CollabRequests', label: 'Collab Requests' },
                  { id: 'Tips&Tricks', label: 'Tips & Tutorials' },
                  { id: 'Showcase', label: 'Video Showcase' },
                  { id: 'JobOpportunity', label: 'Gigs & Jobs' },
                  { id: 'Announcements', label: 'Announcements' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                      categoryFilter === cat.id
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="font-bold text-sm">No posts found in this category.</p>
                  <p className="text-xs">Be the first to start a conversation or share a tip!</p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const postCmts = comments[post.id] || [];
                  const isCommentsExpanded = expandedComments[post.id];

                  return (
                    <div
                      key={post.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                    >
                      {/* Author Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.authorName}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white">
                                {post.authorName}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                                {post.authorRole}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                            {post.category}
                          </span>
                          {post.isPinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
                          <button
                            onClick={() => deleteCommunityPost(post.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Body */}
                      <div className="space-y-2">
                        <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>
                      </div>

                      {/* Render Image or Video Media */}
                      {post.mediaUrl && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                          {post.mediaType === 'video' ? (
                            <video src={post.mediaUrl} controls className="w-full max-h-80 object-cover" />
                          ) : (
                            <img src={post.mediaUrl} alt="Post attachment" className="w-full max-h-80 object-cover" />
                          )}
                        </div>
                      )}

                      {/* Render Poll Options if attached */}
                      {post.pollOptions && (
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            <span>Interactive Community Poll</span>
                            <span>{post.pollTotalVotes || 0} Total Votes</span>
                          </div>

                          {post.pollOptions.map((opt) => {
                            const pct = post.pollTotalVotes && post.pollTotalVotes > 0
                              ? Math.round((opt.votes / post.pollTotalVotes) * 100)
                              : 0;
                            const hasVoted = opt.votedUserIds?.includes(currentUser.id);

                            return (
                              <button
                                key={opt.id}
                                onClick={() => votePoll(post.id, opt.id)}
                                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all relative overflow-hidden flex items-center justify-between ${
                                  hasVoted
                                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-bold'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 bg-white dark:bg-slate-800'
                                }`}
                              >
                                <div
                                  className="absolute left-0 top-0 bottom-0 bg-indigo-500/15 transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                                <span className="relative z-10 font-medium">{opt.optionText}</span>
                                <span className="relative z-10 font-bold">{pct}% ({opt.votes})</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Hashtags */}
                      {post.tags && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Controls Bar */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                        
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => likeCommunityPost(post.id)}
                            className={`flex items-center gap-1.5 font-bold transition-colors ${
                              post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
                            <span>{post.likesCount}</span>
                          </button>

                          <button
                            onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                            className="flex items-center gap-1.5 font-bold hover:text-indigo-600 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.commentsCount} Comments</span>
                          </button>

                          <button
                            onClick={() => saveCommunityPost(post.id)}
                            className={`flex items-center gap-1.5 font-bold transition-colors ${
                              post.isSaved ? 'text-indigo-600' : 'hover:text-indigo-600'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-indigo-600' : ''}`} />
                            <span>{post.isSaved ? 'Saved' : 'Save'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(window.location.href);
                              alert('Link copied to clipboard!');
                            }
                          }}
                          className="flex items-center gap-1 hover:text-indigo-600 font-bold"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </button>

                      </div>

                      {/* Expanded Comments Section */}
                      {isCommentsExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
                          
                          {/* Add Comment Input */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Write a comment or reply..."
                              value={commentInputs[post.id] || ''}
                              onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                            />
                            <button
                              onClick={() => handleSendComment(post.id)}
                              className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                            >
                              Comment
                            </button>
                          </div>

                          {/* Comments List */}
                          <div className="space-y-2">
                            {postCmts.map(cmt => (
                              <div key={cmt.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img src={cmt.authorAvatar} alt={cmt.authorName} className="w-6 h-6 rounded-lg object-cover" />
                                    <span className="font-bold text-xs text-slate-900 dark:text-white">{cmt.authorName}</span>
                                    <span className="text-[10px] text-slate-400">{cmt.timestamp}</span>
                                    {cmt.isPinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />}
                                  </div>

                                  <div className="flex items-center gap-2 text-xs">
                                    <button onClick={() => likeComment(cmt.id)} className="text-slate-400 hover:text-red-500 flex items-center gap-1">
                                      <Heart className={`w-3 h-3 ${cmt.isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                                      <span>{cmt.likesCount}</span>
                                    </button>
                                    <button onClick={() => pinComment(cmt.id)} className="text-slate-400 hover:text-amber-500">
                                      <Pin className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-700 dark:text-slate-300 pl-8">{cmt.content}</p>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Sidebar: Recommended Creators & Trending Hubs */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Suggested African Creators Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
                <h3 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Featured African Talent</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Suggested</span>
              </div>

              <div className="space-y-3">
                {creators.slice(0, 4).map((c) => {
                  const isFollowing = followingUserIds.includes(c.id);
                  return (
                    <div key={c.id} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{c.name}</h4>
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 truncate">{c.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            const convId = startNewConversation(c);
                            setActiveTab('messages');
                          }}
                          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs"
                          title="Message"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => isFollowing ? unfollowUser(c.id) : followUser(c.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                            isFollowing
                              ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trending Niche Hubs Widget */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
                <h3 className="font-heading font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Trending Creator Hubs</span>
                </h3>
              </div>

              <div className="space-y-2">
                {communityGroups.slice(0, 3).map(g => (
                  <div key={g.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{g.name}</h4>
                      <span className="text-[10px] text-slate-400">{g.membersCount} members</span>
                    </div>
                    <button
                      onClick={() => toggleJoinGroup(g.id)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold"
                    >
                      {g.isJoined ? 'Joined' : 'Join'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: GROUPS & NICHE HUBS */}
      {activeSubTab === 'groups' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communityGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-28 overflow-hidden">
                  <img src={group.coverImage} alt={group.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase">
                    {group.category}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1">
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {group.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>{group.membersCount.toLocaleString()} Active Members</span>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => toggleJoinGroup(group.id)}
                    className={`w-full py-2.5 rounded-2xl font-bold text-xs transition-colors ${
                      group.isJoined
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {group.isJoined ? 'Joined Hub' : 'Join Niche Hub'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EVENTS & MASTERCLASSES */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase shadow-2xs">
                    {evt.category}
                  </span>
                  {evt.prizePoolKES && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                      <Award className="w-3 h-3" /> {evt.prizePoolKES.toLocaleString()} KES Prize Pool
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <img src={evt.hostAvatar} alt={evt.hostName} className="w-6 h-6 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Host: {evt.hostName}</span>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => toggleRsvpEvent(evt.id)}
                    className={`flex-1 py-2.5 rounded-2xl font-bold text-xs transition-colors ${
                      evt.isAttending
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {evt.isAttending ? '✓ Attending RSVP' : 'RSVP Event'}
                  </button>

                  <a
                    href={evt.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FOLLOWING & NETWORK */}
      {activeSubTab === 'network' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              My Network & Followed Creators
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.map((c) => {
                const isFollowing = followingUserIds.includes(c.id);
                return (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-500/20" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</h4>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400">{c.role}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => isFollowing ? unfollowUser(c.id) : followUser(c.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                        isFollowing ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create Discussion Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Create Community Discussion
              </h3>
              <button onClick={() => setShowCreatePostModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Looking for Premiere Pro Video Editor for 10x TikTok Clips"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Collab Requests">Collab Requests</option>
                    <option value="Tips & Tricks">Tips & Tutorials</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Media URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={postMediaUrl}
                    onChange={(e) => setPostMediaUrl(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Details & Context</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your request, budget, or question..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPollPost}
                  onChange={(e) => setIsPollPost(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Attach Interactive Community Poll</span>
              </label>

              {isPollPost && (
                <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Poll Options</span>
                  {pollOptionsInput.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const copy = [...pollOptionsInput];
                        copy[idx] = e.target.value;
                        setPollOptionsInput(copy);
                      }}
                      className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setPollOptionsInput(prev => [...prev, `Option ${prev.length + 1}`])}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    + Add Option
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs"
              >
                Publish Discussion
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-700">
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Host Masterclass or Hackathon
              </h3>
              <button onClick={() => setShowCreateEventModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CapCut Pro Transition Masterclass"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Type</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Masterclass">Masterclass</option>
                    <option value="Livestream">Livestream</option>
                    <option value="Hackathon">Hackathon / Competition</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Meetup">Creator Meetup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Prize Pool KES (Optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 50000"
                    value={eventPrizePool}
                    onChange={(e) => setEventPrizePool(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="What will creators learn or compete for?"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs"
              >
                Schedule Event
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
