export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          role: string;
          primary_role: string | null;
          additional_roles: string[] | null;
          name: string;
          username: string;
          email: string;
          bio: string | null;
          profile_photo: string | null;
          cover_photo: string | null;
          country: string | null;
          city: string | null;
          languages: string[] | null;
          skills: string[] | null;
          portfolio: string[] | null;
          verification_status: string | null;
          rating: number | null;
          total_reviews: number | null;
          completed_jobs: number | null;
          response_rate: number | null;
          response_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      campaigns: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string;
          category_id: string | null;
          category: string | null;
          budget: number;
          payment_per_clip: number;
          difficulty: string | null;
          status: string | null;
          deadline: string | null;
          visibility: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['campaigns']['Row']> & {
          creator_id: string;
          title: string;
          description: string;
          budget: number;
          payment_per_clip: number;
        };
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>;
      };
      campaign_files: {
        Row: {
          id: string;
          campaign_id: string;
          video_url: string;
          thumbnail_url: string | null;
          attachments: string[] | null;
          file_size: number | null;
          file_type: string | null;
          duration: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['campaign_files']['Row']> & {
          campaign_id: string;
          video_url: string;
        };
        Update: Partial<Database['public']['Tables']['campaign_files']['Insert']>;
      };
      clip_submissions: {
        Row: {
          id: string;
          campaign_id: string;
          clipper_id: string;
          video_url: string;
          notes: string | null;
          status: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['clip_submissions']['Row']> & {
          campaign_id: string;
          clipper_id: string;
          video_url: string;
        };
        Update: Partial<Database['public']['Tables']['clip_submissions']['Insert']>;
      };
      approvals: {
        Row: {
          id: string;
          submission_id: string;
          approved_by: string;
          feedback: string | null;
          payout_amount: number;
          approved_at: string;
        };
        Insert: Partial<Database['public']['Tables']['approvals']['Row']> & {
          submission_id: string;
          approved_by: string;
          payout_amount: number;
        };
        Update: Partial<Database['public']['Tables']['approvals']['Insert']>;
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          currency: string;
          total_earnings: number;
          pending_earnings: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['wallets']['Row']> & {
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['wallets']['Insert']>;
      };
      transactions: {
        Row: {
          id: string;
          wallet_id: string;
          user_id: string;
          type: string;
          amount: number;
          currency: string | null;
          status: string | null;
          description: string | null;
          mpesa_receipt: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['transactions']['Row']> & {
          wallet_id: string;
          user_id: string;
          type: string;
          amount: number;
        };
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
      withdrawals: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          currency: string | null;
          payment_method: string | null;
          account_number: string;
          status: string | null;
          reviewed_by: string | null;
          processed_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['withdrawals']['Row']> & {
          user_id: string;
          amount: number;
          account_number: string;
        };
        Update: Partial<Database['public']['Tables']['withdrawals']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          receiver_id: string;
          message: string;
          attachments: string[] | null;
          read_status: boolean | null;
          sent_at: string;
        };
        Insert: Partial<Database['public']['Tables']['messages']['Row']> & {
          conversation_id: string;
          sender_id: string;
          receiver_id: string;
          message: string;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      conversations: {
        Row: {
          id: string;
          participants: string[];
          last_message: string | null;
          last_activity: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['conversations']['Row']> & {
          participants: string[];
        };
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string | null;
          read: boolean | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['notifications']['Row']> & {
          user_id: string;
          title: string;
          message: string;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['reviews']['Row']> & {
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
        };
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      ugc_campaigns: {
        Row: {
          id: string;
          brand_id: string;
          title: string;
          deliverables: string[] | null;
          budget: number;
          deadline: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['ugc_campaigns']['Row']> & {
          brand_id: string;
          title: string;
          budget: number;
        };
        Update: Partial<Database['public']['Tables']['ugc_campaigns']['Insert']>;
      };
      ugc_submissions: {
        Row: {
          id: string;
          ugc_campaign_id: string;
          creator_id: string;
          video_url: string;
          notes: string | null;
          approval_status: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['ugc_submissions']['Row']> & {
          ugc_campaign_id: string;
          creator_id: string;
          video_url: string;
        };
        Update: Partial<Database['public']['Tables']['ugc_submissions']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          seller_id: string;
          title: string;
          description: string;
          price: number;
          delivery_time: string | null;
          category: string;
          rating: number | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['services']['Row']> & {
          seller_id: string;
          title: string;
          description: string;
          price: number;
          category: string;
        };
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string;
          service_id: string | null;
          status: string | null;
          price: number;
          delivery_date: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
          buyer_id: string;
          seller_id: string;
          price: number;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          videos: string[] | null;
          images: string[] | null;
          social_links: Json | null;
          featured_work: Json | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['portfolios']['Row']> & {
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['portfolios']['Insert']>;
      };
      leaderboards: {
        Row: {
          id: string;
          user_id: string;
          weekly_score: number | null;
          monthly_score: number | null;
          rank: number | null;
          earnings: number | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['leaderboards']['Row']> & {
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['leaderboards']['Insert']>;
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          target_user_id: string | null;
          reason: string;
          status: string | null;
          reviewed_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['reports']['Row']> & {
          reporter_id: string;
          reason: string;
        };
        Update: Partial<Database['public']['Tables']['reports']['Insert']>;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          target_table: string | null;
          record_id: string | null;
          details: Json | null;
          timestamp: string;
        };
        Insert: Partial<Database['public']['Tables']['audit_logs']['Row']> & {
          action: string;
        };
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>;
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          invited_user_id: string | null;
          reward: number | null;
          status: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['referrals']['Row']> & {
          referrer_id: string;
        };
        Update: Partial<Database['public']['Tables']['referrals']['Insert']>;
      };
      badges: {
        Row: {
          id: string;
          badge_name: string;
          description: string | null;
          icon: string | null;
        };
        Insert: Partial<Database['public']['Tables']['badges']['Row']> & {
          badge_name: string;
        };
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          awarded_at: string;
        };
        Insert: Partial<Database['public']['Tables']['user_badges']['Row']> & {
          user_id: string;
          badge_id: string;
        };
        Update: Partial<Database['public']['Tables']['user_badges']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          lessons: Json | null;
          instructor_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['courses']['Row']> & {
          title: string;
          description: string;
        };
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      course_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          completion_percentage: number | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['course_progress']['Row']> & {
          user_id: string;
          course_id: string;
        };
        Update: Partial<Database['public']['Tables']['course_progress']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          xp: number | null;
          level: number | null;
          streak: number | null;
          rewards: Json | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['achievements']['Row']> & {
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      ai_generations: {
        Row: {
          id: string;
          user_id: string;
          tool_used: string;
          prompt: string;
          result: string;
          credits_used: number | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['ai_generations']['Row']> & {
          user_id: string;
          tool_used: string;
          prompt: string;
          result: string;
        };
        Update: Partial<Database['public']['Tables']['ai_generations']['Insert']>;
      };
    };
  };
}
