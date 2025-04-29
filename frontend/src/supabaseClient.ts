import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vftmkshiqmpwgckxeqca.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdG1rc2hpcW1wd2dja3hlcWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MjYyMzIsImV4cCI6MjA2MTMwMjIzMn0.1VeJbWNFxgAPZ36nhve0KJ4x7J_TkfexfgLuNFEiuCY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
