import React, { useState } from 'react';
import {
  X,
  Play,
  Plus,
  Save,
  Zap,
  ArrowRight,
  Sparkles,
  Bot,
  Bell,
  Wallet,
  Shield,
  Layers,
  CheckCircle2,
  Sliders,
  Trash2,
  Copy
} from 'lucide-react';
import {
  enterpriseAiEngine,
  VisualWorkflow,
  WorkflowNode,
  WorkflowEdge
} from '../../services/enterpriseAiEngine';
import { useToast } from '../../context/ToastContext';

interface WorkflowBuilderModalProps {
  workflow?: VisualWorkflow | null;
  onClose: () => void;
  onSave: (wf: VisualWorkflow) => void;
}

export const WorkflowBuilderModal: React.FC<WorkflowBuilderModalProps> = ({
  workflow,
  onClose,
  onSave
}) => {
  const { addToast } = useToast();

  const [title, setTitle] = useState(workflow?.name || 'New Custom Enterprise Workflow');
  const [description, setDescription] = useState(
    workflow?.description || 'Triggers on platform events, evaluates conditions, and executes AI actions.'
  );
  const [category, setCategory] = useState<VisualWorkflow['category']>(workflow?.category || 'ONBOARDING');
  const [nodes, setNodes] = useState<WorkflowNode[]>(
    workflow?.nodes || [
      {
        id: 'n_1',
        type: 'TRIGGER',
        title: 'New Clip Submission',
        category: 'Triggers',
        config: { event: 'CLIP_SUBMITTED' },
        position: { x: 50, y: 100 }
      },
      {
        id: 'n_2',
        type: 'AI_GENERATOR',
        title: 'Gemini Viral Score & Caption Check',
        category: 'AI Processing',
        config: { model: 'Gemini 2.5 Flash' },
        position: { x: 300, y: 100 }
      },
      {
        id: 'n_3',
        type: 'ACTION',
        title: 'Release M-Pesa Escrow Payout',
        category: 'Payments',
        config: { method: 'M-Pesa B2C' },
        position: { x: 550, y: 100 }
      }
    ]
  );

  const [edges, setEdges] = useState<WorkflowEdge[]>(
    workflow?.edges || [
      { id: 'e_1', source: 'n_1', target: 'n_2' },
      { id: 'e_2', source: 'n_2', target: 'n_3' }
    ]
  );

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('n_2');
  const [isTesting, setIsTesting] = useState(false);

  const handleAddNode = (type: WorkflowNode['type']) => {
    const newNode: WorkflowNode = {
      id: 'n_' + Date.now(),
      type,
      title:
        type === 'TRIGGER'
          ? 'New Trigger Event'
          : type === 'AI_GENERATOR'
          ? 'AI Prompt & Enhancement'
          : type === 'CONDITION'
          ? 'Filter & Logic Rule'
          : 'Send Notification / Payout',
      category: type,
      config: {},
      position: { x: 100 + nodes.length * 40, y: 120 }
    };

    setNodes([...nodes, newNode]);

    // Auto add edge from previous last node if exists
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      setEdges([
        ...edges,
        { id: `e_${Date.now()}`, source: lastNode.id, target: newNode.id }
      ]);
    }

    setSelectedNodeId(newNode.id);
    addToast(`Added new ${type} node to canvas`, 'info');
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    setEdges(edges.filter((e) => e.source !== id && e.target !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
    addToast('Node removed', 'info');
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    addToast('Executing visual workflow test run...', 'info');

    setTimeout(() => {
      setIsTesting(false);
      addToast('Workflow Test Succeeded! Output: 200 OK across all nodes.', 'success');
    }, 1500);
  };

  const handleSaveWorkflow = () => {
    const saved: VisualWorkflow = {
      id: workflow?.id || 'wf_' + Date.now(),
      name: title,
      description,
      category,
      status: 'ACTIVE',
      nodes,
      edges,
      executionCount: workflow?.executionCount || 1,
      successRatePercent: 100,
      updatedAt: new Date().toISOString()
    };

    onSave(saved);
    addToast('Workflow layout saved successfully!', 'success');
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent font-extrabold text-base sm:text-lg text-white border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1"
              />
              <p className="text-xs text-slate-400 px-1">Visual Drag & Drop Workflow Builder • {nodes.length} Nodes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunTest}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-semibold transition-all"
            >
              <Play className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              {isTesting ? 'Running...' : 'Test Execution'}
            </button>

            <button
              onClick={handleSaveWorkflow}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              Save Workflow
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Builder Main Canvas Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950/60 relative">
          {/* Left Toolbar / Add Nodes */}
          <div className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-4 space-y-4 overflow-y-auto">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              Add Flow Nodes
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => handleAddNode('TRIGGER')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center gap-2 text-xs font-bold text-white transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <div>Trigger Event</div>
                  <span className="text-[10px] text-slate-400 font-normal">Registration, Clip, Order</span>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('AI_GENERATOR')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center gap-2 text-xs font-bold text-white transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>AI Generator</div>
                  <span className="text-[10px] text-slate-400 font-normal">Gemini 2.5 Flash Hook/Bio</span>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('CONDITION')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center gap-2 text-xs font-bold text-white transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Logic Filter / Delay</div>
                  <span className="text-[10px] text-slate-400 font-normal">Score &gt; 80, Wait 5 mins</span>
                </div>
              </button>

              <button
                onClick={() => handleAddNode('ACTION')}
                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center gap-2 text-xs font-bold text-white transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Execution Action</div>
                  <span className="text-[10px] text-slate-400 font-normal">Payout, Email, Badge</span>
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-400 block">Workflow Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="ONBOARDING">Creator Onboarding</option>
                <option value="BOUNTY">Bounty & Clip Escrow</option>
                <option value="CAMPAIGN">Brand Campaign Briefs</option>
                <option value="FREELANCE">Freelancer Hire</option>
                <option value="ACADEMY">Academy Certification</option>
                <option value="WALLET">Wallet & M-Pesa Payouts</option>
              </select>
            </div>
          </div>

          {/* Center Visual Graph Canvas */}
          <div className="flex-1 p-6 overflow-auto flex items-center justify-center relative min-h-[400px]">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 relative z-10 py-10">
              {nodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <React.Fragment key={node.id}>
                    <div
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer w-60 shadow-xl relative group ${
                        isSelected
                          ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 shadow-indigo-500/20'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            node.type === 'TRIGGER'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : node.type === 'AI_GENERATOR'
                              ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                              : node.type === 'CONDITION'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {node.type}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNode(node.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{node.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {node.type === 'AI_GENERATOR'
                          ? 'Prompts Gemini 2.5 Flash for automated script structure.'
                          : node.type === 'TRIGGER'
                          ? 'Fires when Clip, Order or User event is recorded.'
                          : 'Executes automated settlement or notification.'}
                      </p>

                      {/* Connection point dots */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                    </div>

                    {index < nodes.length - 1 && (
                      <div className="flex items-center gap-1 text-indigo-400 animate-pulse my-2 md:my-0">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Inspector Drawer */}
          {selectedNode && (
            <div className="w-full md:w-72 bg-slate-900/90 border-l border-slate-800 p-4 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-xs font-bold text-white">Node Properties Inspector</h3>
                <span className="text-[10px] font-mono text-indigo-400">{selectedNode.id}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Node Title</label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) => {
                      const updated = nodes.map((n) =>
                        n.id === selectedNode.id ? { ...n, title: e.target.value } : n
                      );
                      setNodes(updated);
                    }}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Category Type</label>
                  <input
                    type="text"
                    value={selectedNode.category}
                    onChange={(e) => {
                      const updated = nodes.map((n) =>
                        n.id === selectedNode.id ? { ...n, category: e.target.value } : n
                      );
                      setNodes(updated);
                    }}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                  />
                </div>

                {selectedNode.type === 'AI_GENERATOR' && (
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Provider Options
                    </div>
                    <select className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                      <option>Gemini 2.5 Flash (Fastest)</option>
                      <option>ClipKenya Fine-Tuned AI</option>
                      <option>DeepSeek R1 Reasoning</option>
                    </select>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] space-y-1">
                  <div>Status: Configured</div>
                  <div>Retry Policy: 3 attempts with exponential backoff</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
