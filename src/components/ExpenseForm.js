import { Fragment } from 'react'

const ExpenseForm = ({ expenseItem, amount, handleSubmitClick, handleExpenseItem, handleExpenseAmount}) => {
    return (
        <Fragment >
            <form action="submit" onSubmit={handleSubmitClick}>

                <div className="formCenter">
                    <div className="formGroup">
                        <label htmlFor="expenseItem">expense</label>
                        <input 
                        id="expenseItem"
                        type="text" 
                        className="formControl" 
                        name="expenseItem" 
                        placeholder="Enter household expense" 
                        value={expenseItem}
                        onChange={handleExpenseItem}/>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="amount">amount</label>
                        <input 
                        id="amount"
                        type="number"
                        className="formControl" 
                        name="amount" 
                        pattern="[0-9]*" 
                        inputmode="numeric"
                        placeholder="Enter dollar amount" 
                        value={amount}
                        onChange={handleExpenseAmount}/>
                    </div>

                </div>

                <button className="btn" type="submit">Submit Expense</button>

            </form>
        </Fragment>
    )
}

export default ExpenseForm;