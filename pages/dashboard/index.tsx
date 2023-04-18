import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
import Button from '@/Components/Button/Button';
import { useRouter } from 'next/router';

//import Input from '../../Components/Input/input';

import { supabase } from '../supabase';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

function Dashboard({ countries }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      router.push('/dashboard');
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
      <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
      <Footer />
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
