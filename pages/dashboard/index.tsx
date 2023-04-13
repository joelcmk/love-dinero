import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
import { useRouter } from 'next/router';

//import Input from '../../Components/Input/input';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

function Dashboard({ countries }) {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <ul>
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
      <Nav />
      <Budget />
      <NewExpense />
      <Footer />
      <button onClick={() => supabase.auth.signOut()}>Log out</button>
    </div>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from('Test-table').select();
  //let { newData } = await supabase.from('Test-table').select();

  return {
    props: {
      countries: data,
    },
  };
}

export default Dashboard;
