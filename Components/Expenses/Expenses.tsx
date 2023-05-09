import Nav from '@/Components/Nav/Nav';
import Button from '@/Components/Button/Button';

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
        }}
      >
        <ul>
          {todos.map((expense: any, index: any) => (
            <li key={index}>
              <div>
                {expense.category} {expense.amount}
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(expense.id);
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Expenses;
