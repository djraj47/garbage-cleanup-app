import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mwzlnjxnmrsassxmxpqj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13emxuanhubXJzYXNzeG14cHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4ODYwODksImV4cCI6MjA2ODQ2MjA4OX0.7BI16UwrFKXIPa4lPCZKgIaLJ0vxIs6Z1VmQR08Kzto";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
