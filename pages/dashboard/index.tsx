import Nav from '@/Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Budget from '../../Components/Budget/Budget';
import NewExpense from '@/Components/NewExpense/NewExpense';

import Input from '../../Components/Input/input';

function Dashboard() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Input />
      <Nav />
      <Budget />
      <NewExpense />
      <Footer />
    </div>
  );
}

export default Dashboard;
