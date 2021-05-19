import "../styles/App.css";
import firebase from "../config/firebase.js";
import { useEffect, useState } from "react";

import Header from './Header';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import Warning from './Warning';
import Footer from './Footer';


function App() {

  const expensesRef = firebase.database().ref('expenses');

  const [expenses, setExpenses] = useState([]);
  const [expenseItem, setExpenseItem] = useState("");
  const [amount, setAmount] = useState("");
  const [warning, setWarning] = useState({ display: true });

  const [userIncome, setUserIncome] = useState(30000);
  const [partnerIncome, setPartnerIncome] = useState(60000);
  const [userIncomeRatio, setUserIncomeRatio] = useState(0);
  const [partnerIncomeRatio, setPartnerIncomeRatio] = useState(0);

  useEffect(() => {
    //referencing our DB
    const dbRef = firebase.database().ref();

    //listening out for a value and responding to the value
    dbRef.on("value", (response) => {

      //Initializing an empty array
      const newExpensesArray = []
      // const newIncomesArray = []

      //setting the data to a variable
      const data = response.val();

      for (let key in data) {
        if (key === "expenses") {
          const expensesData = data[key];

          for (let expensesKey in expensesData) {

            const expenseEntry = expensesData[expensesKey]

            let item = {
              key: expensesKey,
              expenseItem: expenseEntry.expenseItem,
              amount: expenseEntry.amount
            }

            newExpensesArray.push(item);
          }
        }
      }

      setExpenses(newExpensesArray);
    });

  }, [expenseItem]);


  const handleUserInput = (event) => {
    let userIncomeInputValue = event.target.value;
    setUserIncome(userIncomeInputValue);
  }

  const handlePartnerInput = (event) => {
    let partnerIncomeInputValue = event.target.value;
    setPartnerIncome(partnerIncomeInputValue);
  }

  const handleExpenseItem = (event) => {

    let expenseItemInputValue = event.target.value;
    setExpenseItem(expenseItemInputValue);
  }

  const handleExpenseAmount = (event) => {

    let expenseAmountInputValue = event.target.value;
    setAmount(expenseAmountInputValue);
  }

  const handleWarning = ({ text, type }) => {
    setWarning({ display: true, text, type });
    setTimeout(() => {
      setWarning({ display: false })
    }, 3000)
  }

  // submitting the data to firebase
  const handleSubmitClick = (event) => {
    event.preventDefault();
    if (expenseItem !== '' && amount > 0) {
      handleWarning({ type: 'Success', text: 'Expense added' });

      const expensesRef = firebase.database().ref('expenses');


      expensesRef.push({ expenseItem, amount });

      setAmount("");
      setExpenseItem("");
    } else {
      //call handle warning
      handleWarning({ type: 'Danger', text: `Expense amount must be greater than $0.` })
    }
  }

  const handleClearList = (expenses) => {

    expensesRef.set({});
  }

  const handleDelete = (expenseKey) => {
    const expensesRef = firebase.database().ref('expenses');
    expensesRef.child(expenseKey).remove();
  }

  useEffect(() => {

    let parsedUserIncome = parseInt(userIncome);
    let parsedPartnerIncome = parseInt(partnerIncome);

    let num = (parsedUserIncome / (parsedUserIncome + parsedPartnerIncome));
    let userIncomeRatio = (num.toFixed(2));

    let num2 = (parsedPartnerIncome / (parsedUserIncome + parsedPartnerIncome));
    let partnerIncomeRatio = num2.toFixed(2);


    setUserIncomeRatio(userIncomeRatio);
    setPartnerIncomeRatio(partnerIncomeRatio);

  }, [userIncome, partnerIncome]);


  return (
    <>
      <div className="container">
        <div className="contentWrap">

          <div className="warningBox">
            {warning.display ? <Warning type={warning.type} text={warning.text} /> : null}
            <Warning />
          </div>

          <Header />

          <main>

            <div className="incomeBox">
              <IncomeForm
                userIncome={userIncome}
                partnerIncome={partnerIncome}
                handleUserInput={handleUserInput}
                handlePartnerInput={handlePartnerInput}
              />
            </div>

            <div className="forms">
              <ExpenseForm
                expenseItem={expenseItem}
                amount={amount}
                handleSubmitClick={handleSubmitClick}
                handleExpenseItem={handleExpenseItem}
                handleExpenseAmount={handleExpenseAmount}
              />
            </div>

            <div className="expenseTotal">

              <p className="expenseTotalText">
                Total Expenses: <span className="finalExpenses">
                  ${expenses.reduce((accumulator, current) => {
                return (accumulator += parseInt(current.amount))
              }, 0)}
                </span>
              </p>

              <p className="expenseTotalText">
                You will pay <span className="total">{Math.round(userIncomeRatio * 100)}%</span> of expenses of <span className="total">${Math.round(expenses.reduce((accumulator, current) => {
                return (accumulator += parseInt(current.amount) * userIncomeRatio)
              }, 0))}/month.</span>
              </p>

              <p className="expenseTotalText">
                Partner will pay <span className="total">{Math.round(partnerIncomeRatio * 100)}%</span> of expenses of <span className="total">${
                  Math.round(expenses.reduce((accumulator, current) => {
                    return (accumulator += parseInt(current.amount) * partnerIncomeRatio)
                  }, 0)
                  )}/month.</span>
              </p>

            </div>

            <div className="listBox">
              <ExpenseList
                expenses={expenses}
                handleClearList={handleClearList}
                handleDelete={handleDelete}
              />
            </div>
          </main>
        </div>

        <Footer />
      </div>

    </>
  );
}

export default App;