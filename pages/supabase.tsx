/* eslint-disable @next/next/no-typos */
import { createClient } from '@supabase/supabase-js';

async function GetStaticProps() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY as string;

  const suprabaseAdmin = createClient(supabaseUrl || '', supabaseAnonKey || '');

  const { data } = await suprabaseAdmin
    .from('Test-table')
    .select('*')
    .order('id');
  console.log(data);
  return { props: { data: data } };
}

export default GetStaticProps;
