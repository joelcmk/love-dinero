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
    <div>
      {todos.map((expense: any, index: any) => (
        <div key={index}>
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
        </div>
      ))}
    </div>
  );
}

export default Expenses;
