import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmtnelcezlbwrbhqbtnw.supabase.co';
const supabaseAnonKey = 'sb_publishable_GMt6vr8pE9TZqfyeG6KxnQ_A5VCdccL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
