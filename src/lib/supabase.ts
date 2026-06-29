import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  branch: string | null;
  cgpa: number | null;
  college: string | null;
  created_at: string;
  updated_at: string;
};

export type CareerReport = {
  id: string;
  user_id: string;
  title: string;
  input_data: Record<string, unknown>;
  results: Record<string, unknown>;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  type: 'career' | 'course' | 'roadmap';
  reference_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};
