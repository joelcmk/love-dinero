import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';

//import Input from '../../Components/Input/input';
import { createClient } from '@supabase/supabase-js';
import GetStaticProps from '../supabase';

function Dashboard({ data }: { data: any }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY as string;

  const suprabaseAdmin = createClient(supabaseUrl || '', supabaseAnonKey || '');

  console.log(data);
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Nav />
      <Budget />
      <NewExpense />
      <Footer />
    </div>
  );
}

export default Dashboard;
