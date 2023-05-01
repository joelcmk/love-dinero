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
  console.log(todos);
  return (
    <>
      {todos.map((expense: any) => (
        <div>
          <div>
            {console.log(expense.category)}
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
    </>
  );
}

export default Expenses;
