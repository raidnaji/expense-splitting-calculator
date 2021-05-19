import { Fragment } from 'react'

const IncomeForm = ({ userIncome, partnerIncome }) => {


    return (
        <Fragment>
            <form action="">
                <div className="formCenter">
                    <div className="formGroup">
                        <label htmlFor="expenseItem">Your Annual Income</label>
                        <input
                            type="tel"
                            className="formControl"
                            name="userIncome" id="userIncome"
                            placeholder="Ex. $50,000"
                            />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="amount">Your Partner's Annual Income</label>
                        <input type="tel"
                            className="formControl"
                            name="partnerIncome" id="partnerIncome"
                            placeholder="Ex. $50,000"
                             />
                    </div>

                </div>
            </form>
        </Fragment>
    )
}

export default IncomeForm;