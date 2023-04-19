import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
// import Button from '@/Components/Button/Button';
import { useRouter } from 'next/router';
import Input from '../../Components/Input/input';

import { supabase } from '../supabase';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

function Dashboard({ countries }) {
  // const user = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/');
  //   }
  // }, [user, router]);

  // //console.log(user);
  console.log(countries);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Nav />
      <ul>
        {countries?.map((country) => (
          <>
            <li key={country.id}>{country.category}</li>
            <li>{country.amount}</li>
          </>
        ))}
      </ul>
      <Budget />
      <NewExpense />
      <Input variant="green" placeholder="test"></Input>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  //let { data } = await supabase.from('Test-table').select();

  let { data } = await supabase.from('profiles').select();

  console.log('dldlk');
  return {
    props: {
      countries: data,
    },
  };
}

export default Dashboard;
