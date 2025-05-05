
import { createClient } from '@supabase/supabase-js';

// These environment variables are automatically injected by Lovable when connected to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have the required variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anonymous Key is missing. Make sure you have connected to Supabase properly.');
}

// Initialize the Supabase client with appropriate error handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is properly initialized
export const isSupabaseConnected = () => {
  return !!supabase;
};
