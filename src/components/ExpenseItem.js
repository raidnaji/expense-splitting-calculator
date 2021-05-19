import { Fragment } from "react";

import { AiFillDelete } from 'react-icons/ai'


const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
    const { expenseItem, amount } = expense;
    return (
        <Fragment>

            <li className="item">
                <div className="info">
                    <span className="expense">{expenseItem}</span>
                    <span className="amount">{amount}</span>
                </div>
                <div>

                    <button
                        className="clearBtn"
                        aria-label="delete button"
                        title="delete button"
                        onClick={handleDelete}>
                        <AiFillDelete />
                    </button>
                </div>
            </li>

        </Fragment>
    );
}

export default ExpenseItem;