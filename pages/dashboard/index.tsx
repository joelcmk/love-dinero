import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';
import Profile from '@/Components/Profile/Profile';
import Button from '@/Components/Button/Button';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
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
      <div className="w-full">
        <h1 className="mb-12">Expenses list</h1>
        {!!errorText && <Alert text={errorText} />}
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul>
            {todos.map((expense) => (
              <Expense
                key={expense.id}
                expense={expense}
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
        <Budget expenses={todos} />
        <NewExpense
          addExpense={addExpense}
          setNewCategory={newCategory}
          setNewAmount={setNewAmount}
          newAmount={newAmoutn}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;

const Expense = ({
  expense,
  onDelete,
}: {
  todo: Todos;
  onDelete: () => void;
}) => {
  return (
    <li>
      <div>
        <div>
          <div>
            {console.log(expense.category)}
            {expense.category} {expense.amount}
          </div>
        </div>
        <div></div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

const Alert = ({ text }: { text: string }) => (
  <div>
    <div>{text}</div>
  </div>
);
