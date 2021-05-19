import "../styles/App.css";
import firebase from "../config/firebase.js";
import { useEffect, useState } from "react";

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
  const [userIncome, setUserIncome] = useState(50000);
  const [partnerIncome, setPartnerIncome] = useState(100000);
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

  useEffect ( () => {

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
      {warning.display ? <Warning type={warning.type} text={warning.text} /> : null}
      <Warning />

      <h1>Expense Splitting Calculator</h1>

      <div className="forms">

        <div className="incomeBox">
          <IncomeForm 
          userIncome={userIncome} 
          partnerIncome={partnerIncome} 
          setUserIncome={setUserIncome}
          setPartnerIncome={setPartnerIncome}
          />
        </div>

        <ExpenseForm
          expenseItem={expenseItem}
          amount={amount}
          handleSubmitClick={handleSubmitClick}
          handleExpenseItem={handleExpenseItem}
          handleExpenseAmount={handleExpenseAmount}
           />
      </div>

      <div className="expenseTotal">
        <h2>
          Total Expenses: <span className="finalExpenses">
            ${expenses.reduce((accumulator, current) => {
          return (accumulator += parseInt(current.amount))
        }, 0)}
          </span>
        </h2>
        <h2>
          You will pay <span className="total">{Math.round(userIncomeRatio * 100)}%</span> of expenses of <span className="total">${Math.round(expenses.reduce((accumulator, current) => {
            return (accumulator += parseInt(current.amount) * userIncomeRatio)
          }, 0))}/month.</span>
        </h2>
        <h2>
          Partner will pay <span className="total">{Math.round(partnerIncomeRatio * 100)}%</span> of expenses of <span className="total">${
            Math.round(expenses.reduce((accumulator, current) => {
              return (accumulator += parseInt(current.amount) * partnerIncomeRatio)
            }, 0)
            )}/month.</span>
        </h2>
      </div>

      <div className="listBox">
        <ExpenseList
          expenses={expenses}
          handleClearList={handleClearList}
          handleDelete={handleDelete}
           />
      </div>

      <Footer />

    </>
  );
}

export default App;
