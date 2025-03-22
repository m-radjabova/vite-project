import { Expence } from "../App"
import { TiDelete } from "react-icons/ti";

interface Props {
    expenses: Expence[]
    deleteExpense: (id: number) => void
}

function ExpenseList({expenses, deleteExpense}: Props) {
  return (
    <div className=" mt-3">
        <ul className="list-group">
            {expenses.map(expense => (
                <li className="list-group-item d-flex justify-content-between align-items-center mt-1" 
                key={expense.id}>
                    <span>{expense.title}</span>
                    <div className=" d-flex align-items-center gap-2">
                        <span className="badge bg-primary rounded-pill"> $ {expense.amount}
                        </span>
                        <TiDelete className="delIcon" onClick={() => deleteExpense(expense.id)} size="2rem" />
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ExpenseList