import { Fragment } from 'react'

const IncomeForm = ({ userIncome, partnerIncome, handleUserInput, handlePartnerInput }) => {

    console.log(userIncome);
    console.log(partnerIncome);

    return (
        <Fragment>
            <form action="">
                <div className="formCenter">
                    <div className="formGroup">
                        <label htmlFor="expenseItem">Your Annual Income</label>
                        <input
                            type="number"
                            className="formControl"
                            name="userIncome" id="userIncome"
                            placeholder="Ex. $50,000"
                            value={userIncome}
                            onChange={handleUserInput}
                            />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="amount">Your Partner's Annual Income</label>
                        <input type="number"
                            className="formControl"
                            name="partnerIncome" id="partnerIncome"
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