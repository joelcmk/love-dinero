import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';

//import Input from '../../Components/Input/input';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

function Dashboard({ countries }) {
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
    </div>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from('countries').select();

  return {
    props: {
      countries: data,
    },
  };
}

export default Dashboard;
