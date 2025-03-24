import "bootstrap/dist/css/bootstrap.min.css";
import Display from './component/Display';
import { useState } from 'react'
import ExpenseList from './component/ExpenseList';
import AddExpenses from './component/AddExpenses';

export interface Expence {
  id: number
  title: string
  amount: number
}
function App() {
  const [search, setSearch] = useState<string>("")
  const [money, setMoney] = useState<number>(5000)
  const [expenses, setExpenses] = useState<Expence[]>([
    { id: 1, title: "Shopping", amount: 200 },
    { id: 2, title: "Holiday", amount: 400 },
    { id: 3, title: "Transportation", amount: 100 },
    { id: 4, title: "Fuel", amount: 200 },
    { id: 5, title: "Child Care", amount: 300 },
    { id: 6, title: "Food", amount: 500 },
    { id: 7, title: "Health", amount: 200 },
    { id: 8, title: "Education", amount: 400 }
  ])

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const showRemainingExpenses = () => {
    return money - getAmountExpense()
  }

  const getAmountExpense = () => {
    return expenses.reduce((acc, curr) => { return acc + curr.amount }, 0)
  }

  const addExpense = (title: string, amount: number) => {
    setExpenses([...expenses, { id: expenses.length + 1, title, amount }])
  }

  const editMoney = (amount: number) => {
    setMoney(amount)
  }

  return (
    <div className="container mt-3">
      <h1>My Budget Planner</h1>
        <Display  
        editMoney = {editMoney}
        remaining={showRemainingExpenses()} 
        spent={getAmountExpense()} 
        money={money} 
        />
        <h2>Expenses</h2>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search..." 
          className="form-control" 
          type="search" 
        />
        <ExpenseList deleteExpense={deleteExpense} expenses={expenses.filter(expense => expense.title.toLowerCase().includes(search.toLowerCase()))}/>
        <AddExpenses addExpense={addExpense}/>
    </div>
  )
}

export default App