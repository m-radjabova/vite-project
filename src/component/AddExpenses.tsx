import { useState } from "react";

interface AddExpensesProps {
    addExpense: (title: string, amount: number) => void;
}
  
  function AddExpenses({ addExpense }: AddExpensesProps) {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const AddExpenses = (e: React.FormEvent) => {
      e.preventDefault();
      addExpense(name, amount);
      setName("");
      setAmount(0);
    };

    return (
      <div className="mt-3 mb-3">
        <h1>Add Expenses</h1>
        <form onSubmit={AddExpenses}>
          <div className="d-flex mb-3 gap-3">
            <div className="flex-grow-1">
              <label htmlFor="name" className="form-label">Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" required />
            </div>
            <div className="flex-grow-1">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input onChange={(e) => setAmount(Number(e.target.value))} type="number" className="form-control" id="amount" required />
            </div>
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
  
  export default AddExpenses;