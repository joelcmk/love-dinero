import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qdvvqhurcygjzgcgspae.supabase.co',
  process.env.ANON_KEY
);
