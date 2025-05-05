
import { createClient } from '@supabase/supabase-js';

// These are the project credentials from when we connected to Supabase
const supabaseUrl = "https://eoxvuizjjggarhhyhlsi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveHZ1aXpqamdnYXJoaHlobHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjU4NDksImV4cCI6MjA2MjA0MTg0OX0.a3XQfJDCWrhIR-BJ-HIZmYpgX9yUJxPbrhMuOD09gsk";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper function to check if Supabase is properly initialized
export const isSupabaseConnected = () => {
  return !!supabase;
};
