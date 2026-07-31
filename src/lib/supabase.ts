import { createClient } from '@supabase/supabase-js';

// Fallback configuration if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are not yet set
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://demo-clipforge-realtime.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-clipforge';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Local Event Hub for live cross-component and multi-tab broadcasting
type RealtimeCallback = (payload: any) => void;

class RealtimeChannelHub {
  private listeners: Map<string, Set<RealtimeCallback>> = new Map();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('clipforge_realtime_hub');
      this.broadcastChannel.onmessage = (event) => {
        const { channel, payload } = event.data || {};
        if (channel) {
          this.notifyListeners(channel, payload);
        }
      };
    }
  }

  public subscribe(channel: string, callback: RealtimeCallback) {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Set());
    }
    this.listeners.get(channel)!.add(callback);

    return () => {
      const set = this.listeners.get(channel);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.listeners.delete(channel);
        }
      }
    };
  }

  public publish(channel: string, payload: any) {
    // Notify local tab listeners
    this.notifyListeners(channel, payload);

    // Broadcast to other browser tabs/windows
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ channel, payload });
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

    // Attempt Supabase Realtime channel broadcast if configured
    try {
      const supabaseChannel = supabase.channel(channel);
      supabaseChannel.send({
        type: 'broadcast',
        event: 'message',
        payload,
      });
    } catch {
      // Ignored if Supabase URL is placeholder
    }
  }

  private notifyListeners(channel: string, payload: any) {
    const set = this.listeners.get(channel);
    if (set) {
      set.forEach((cb) => {
        try {
          cb(payload);
        } catch (e) {
          console.error(`Error in realtime subscriber for channel ${channel}:`, e);
        }
      });
    }
  }
}

export const realtimeHub = new RealtimeChannelHub();
