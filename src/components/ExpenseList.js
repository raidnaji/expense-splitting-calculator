
import ExpenseItem from './ExpenseItem'
import { AiFillDelete } from 'react-icons/ai'

const ExpenseList = ({ expenses, handleClearList, handleDelete, handleEdit }) => {
    return (
        <>
        <ul className="list">
            {expenses.map((expense, index) => {
                return (
                    <ExpenseItem 
                    expense={expense} 
                    handleDelete={() => handleDelete(expense.key)}
                    handleEdit={() => handleEdit(expense.key)}
                    key={expense.key}
                    />
                );
            }
            )}
        </ul>
        {expenses.length > 0 ? 
        <button className="btn"
                    onClick={handleClearList}>
                    delete expenses
            <AiFillDelete className="btnIcon" />
        
        </button>  : null}

        </>
    )
}

export default ExpenseList;

