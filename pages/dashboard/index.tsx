import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
import Profile from '@/Components/Profile/Profile';
// import Button from '@/Components/Button/Button';
import { useRouter } from 'next/router';

import { supabase } from '../supabase';
import { createClient } from '@supabase/supabase-js';

import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

type Todos = Database['public']['Tables']['todos']['Row'];

function Dashboard({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  const [todos, setTodos] = useState<Todos[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmoutn, setNewAmount] = useState(null);
  const [errorText, setErrorText] = useState('');

  const supabaseUrl = 'https://ckdzyxqpyvunaeuauwjt.supabase.co';
  const supabaseKey = process.env.SUPABASE_KEY;

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [session]);

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

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ backgroundColor: 'var(--dasboard_background_color)' }}>
      <div className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button primary block"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <button
            className="button block"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="w-full">
        <h1 className="mb-12">Todo List.</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addExpense(newCategory);
          }}
          className="flex gap-2 my-2"
        >
          <input
            className="rounded w-full p-2"
            type="text"
            placeholder="make coffee"
            value={newCategory}
            onChange={(e) => {
              setErrorText('');
              setNewCategory(e.target.value);
            }}
          />
          <input
            className="rounded w-full p-2"
            type="number"
            placeholder="20"
            value={newAmoutn}
            onChange={(e) => {
              setErrorText('');
              setNewAmount(e.target.value);
            }}
          />
          <button className="btn-black" type="submit">
            Add
          </button>
        </form>
        {!!errorText && <Alert text={errorText} />}
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul>
            {todos.map((expense) => (
              <Todo
                key={expense.id}
                todo={expense}
                onDelete={() => deleteExpense(expense.id)}
              />
            ))}
          </ul>
        </div>
      </div>
      <Nav />
      <Profile
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '400px' }}></div>
        <Budget />
        <NewExpense />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>();
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data } = await supabase
        .from('todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsCompleted(data.is_complete);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {todo.category} {todo.amount}
          </div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : false}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
