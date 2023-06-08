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

  console.log(user);

  const [todos, setTodos] = useState<Todos[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmoutn, setNewAmount] = useState(null);
  const [errorText, setErrorText] = useState('');

  const [demo, setDemo] = useState(!user);

  const [expensesList, setExpensesList] = useState(false);

  const [demoData, setDemoData] = useState([
    {
      id: 0,
      user_id: 'demo',
      category: 'food',
      amount: 100,
    },
    {
      id: 1,
      user_id: 'demo',
      category: 'food',
      amount: 100,
    },
    {
      id: 2,
      user_id: 'demo',
      category: 'utilities',
      amount: 100,
    },
    {
      id: 3,
      user_id: 'demo',
      category: 'food',
      amount: 100,
    },
    {
      id: 4,
      user_id: 'demo',
      category: 'food',
      amount: 100,
    },
  ]);

  //console.log(expensesList);

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
    if (!demo) {
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
    } else {
      console.log(newCategory);
      const nextDemoData = [
        ...demoData,
        {
          id: demoData.length,
          user_id: 'demo',
          category: newCategory,
          amount: Number(newAmoutn),
        },
      ];
      setDemoData(nextDemoData);
    }
  };

  const deleteExpense = async (id: number, index) => {
    if (!demo) {
      try {
        await supabase.from('todos').delete().eq('id', id).throwOnError();
        setTodos(todos.filter((x) => x.id != id));
      } catch (error) {
        console.log('error', error);
      }
    } else {
      const nextDemoData = [...demoData];
      nextDemoData.splice(index, 1);
      console.log(nextDemoData);
      setDemoData(nextDemoData);
    }
  };

  console.log(todos);

  console.log(demoData);

  return (
    <div
      style={{
        backgroundColor: 'var(--dasboard_background_color)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Nav setExpensesList={setExpensesList} demo={demo} />
      </div>
      {!expensesList ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '400px' }}>
            <Chart expenses={demo ? demoData : todos} />
          </div>
          <Budget expenses={demo ? demoData : todos} demo={demo} />
          <NewExpense
            demo={demo}
            addExpense={addExpense}
            setNewCategory={newCategory}
            setNewAmount={setNewAmount}
            newAmount={newAmoutn}
          />
        </div>
      ) : (
        <Expenses todos={demo ? demoData : todos} onDelete={deleteExpense} />
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
