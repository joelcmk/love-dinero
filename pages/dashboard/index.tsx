import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
// import Button from '@/Components/Button/Button';
import { useRouter } from 'next/router';

import { supabase } from '../supabase';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

function Dashboard({ countries }) {
  return (
    <div style={{ backgroundColor: 'var(--dasboard_background_color)' }}>
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
