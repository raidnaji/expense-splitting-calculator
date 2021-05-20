import { Fragment } from 'react'

const IncomeForm = ({ userIncome, partnerIncome, handleUserInput, handlePartnerInput }) => {

    return (
        <Fragment>
            <form action="submit">
                <div className="formCenter">
                    <div className="formGroup">
                        <label htmlFor="userIncome">Your Annual Income</label>
                        <input
                            id="expenseItem"
                            type="number"
                            className="formControl"
                            name="userIncome" 
                            placeholder="Ex. $50,000"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            value={userIncome}
                            onChange={handleUserInput}
                            />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="partnerIncome">Your Partner's Annual Income</label>
                        <input 
                            id="partnerIncome"
                            type="number"
                            className="formControl"
                            name="partnerIncome" 
                            pattern="[0-9]*"
                            inputmode="numeric"
                            placeholder="Ex. $50,000"
                            value={partnerIncome}
                            onChange={handlePartnerInput}
                             />
                    </div>

                </div>
            </form>
        </Fragment>
    )
}

export default IncomeForm;