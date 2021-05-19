import { Fragment } from 'react'

const ExpenseForm = ({ expenseItem, amount, handleSubmitClick, handleExpenseItem, handleExpenseAmount}) => {
    return (
        <Fragment >
            <form action="" onSubmit={handleSubmitClick}>

                <div className="formCenter">
                    <div className="formGroup">
                        <label htmlFor="expenseItem">expense</label>
                        <input 
                        type="text" 
                        className="formControl" 
                        name="expenseItem" id="expenseItem"
                        placeholder="Enter household expense" 
                        value={expenseItem}
                        onChange={handleExpenseItem}/>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="amount">amount</label>
                        <input type="tel"
                        className="formControl" 
                        name="amount" id="amount"
                        placeholder="Enter dollar amount" 
                        value={amount}
                        onChange={handleExpenseAmount}/>
                    </div>

                </div>

                <button className="btn" type="submit">Enter</button>

            </form>
        </Fragment>
    )
}

export default ExpenseForm;