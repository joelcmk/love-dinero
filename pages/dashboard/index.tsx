import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';

import Expenses from '@/Components/Expenses/Expenses';
import Chart from '@/Components/Chart/Chart';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { calculateOverrideValues } from 'next/dist/server/font-utils';

function Dashboard({ session, router }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [todos, setTodos] = useState<Todos[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmoutn, setNewAmount] = useState(null);
  const [errorText, setErrorText] = useState('');

  const [expensesList, setExpensesList] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setTodos(todos);
    };

    fetchExpenses();
  }, [supabase]);

  const addExpense = async (newCategory: string) => {
    let category = newCategory.trim();
    let amount = newAmoutn;
    if (category.length) {
      const { data: todo, error } = await supabase
        .from('todos')
        .insert({ category, user_id: user.id, amount })
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewCategory('');
      }
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      await supabase.from('todos').delete().eq('id', id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'var(--dasboard_background_color)',
      }}
    >
      <Nav setExpensesList={setExpensesList} />
      {!expensesList ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '400px' }}>
            <Chart expenses={todos} />
          </div>
          <Budget expenses={todos} />
          <NewExpense
            addExpense={addExpense}
            setNewCategory={newCategory}
            setNewAmount={setNewAmount}
            newAmount={newAmoutn}
          />
        </div>
      ) : (
        <Expenses todos={todos} onDelete={deleteExpense} />
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
