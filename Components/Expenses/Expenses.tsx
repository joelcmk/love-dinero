import Nav from '@/Components/Nav/Nav';
import Button from '@/Components/Button/Button';
import styles from './Expense.module.css';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineCar,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbFridge } from 'react-icons/tb';

function Expenses({
  expense,
  onDelete,
  todos,
}: {
  expense: any;
  onDelete: any;
}) {
  function icons(icon) {
    switch (icon) {
      case 'home':
        return <AiOutlineHome />;
      case 'shopping':
        return <AiOutlineShopping />;
      case 'credit card':
        return <AiOutlineCreditCard />;
      case 'car':
        return <AiOutlineCar />;
      case 'food':
        return <IoFastFoodOutline />;
      case 'utilities':
        return <AiOutlineAppstoreAdd />;
      case 'household':
        return <TbFridge />;
      default:
        return <AiOutlineAppstoreAdd />;
    }
  }

  function toUpperCase(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  function addColor(category: string) {
    switch (category) {
      case 'home':
        return '#00B8D9';
      case 'shopping':
        return '#F8BB00';
      case 'transportation':
        return '#46D7A8';
      case 'food':
        return '#0989F8';
      case 'utilities':
        return '#FE8D00';
      case 'household':
        return '#A5A8F8';
      default:
        return '#3ACB5F';
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100% - 100px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--budget_wrapper_background)',
          width: '30%',
          height: '90%',
          borderRadius: '10px',
          overflowY: 'auto',
        }}
        // className={styles.wrapper}
      >
        <table className={styles.expenses}>
          <tbody>
            <tr
              style={{
                textAlign: 'left',
                height: '50px',
              }}
            >
              <th style={{ paddingLeft: '1em' }}>Category</th>
              <th style={{}}>Amount</th>
              <th>Delete</th>
            </tr>

            {todos.map((expense: any, index: any) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: '1em' }}>
                      <span
                        style={{
                          color:
                            index % 2 ? addColor(expense.category) : 'black',
                        }}
                      >
                        {icons(expense.category)}
                      </span>{' '}
                      {toUpperCase(expense.category)}
                    </p>
                  </div>{' '}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: '1em' }}>{expense.amount}</p>
                  </div>{' '}
                </td>
                <td style={{ width: '100px' }}>
                  <Button
                    variant="update"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(expense.id, index);
                    }}
                    style={{ padding: '0 1em' }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
