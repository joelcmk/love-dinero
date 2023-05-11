import Nav from '@/Components/Nav/Nav';
import Button from '@/Components/Button/Button';
import styles from './Expense.module.css';

function Expenses({
  expense,
  onDelete,
  todos,
}: {
  expense: any;
  onDelete: any;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100% - 150px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--budget_wrapper_background)',
          width: '40%',
          height: '90%',
          borderRadius: '10px',
          overflowY: 'auto',
        }}
        // className={styles.wrapper}
      >
        <table className={styles.expenses}>
          <tbody>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>

            {todos.map((expense: any, index: any) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: '1em' }}>{expense.category}</p>
                  </div>{' '}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: '1em' }}>{expense.amount}</p>
                  </div>{' '}
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(expense.id);
                    }}
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
