import React, { useState, useEffect} from 'react';
import '/src/index.css';
import Navbar from './Navbar';

const ExpenseTracker = () => {
    const [tableEntries, setTableEntries] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [itemType, setItemType] = useState(0); // 0 for Expense, 1 for Income
    const [mydata, setMyData] = useState([]);

    const updateSummary = () => {
        // const totalIncome = tableEntries.reduce((t, e) => e.type === 1 ? t + e.amount : t, 0);
        // const totalExpense = tableEntries.reduce((ex, e) => e.type === 0 ? ex + e.amount : ex, 0);
        // const dataIncome = mydata.reduce((t,e) => e.type === 1 ? t + e.amount : t, 0);
        // const dataExpense = mydata.reduce((ex, e) => e.type === 0 > ex + e.amount: ex, 0);

        // return {
        //     totalIncome,
        //     totalExpense,
        //     balance: totalIncome - totalExpense,
        // };
        const combinedData = [...tableEntries, ...mydata];

        const totalIncome = combinedData.reduce((t, e) => (e.type === 1 || e.entryType === 'Income') ? t + (+e.amount) : t, 0);
        const totalExpense = combinedData.reduce((ex, e) => (e.type === 0 || e.entryType === 'Expense') ? ex + (+e.amount) : ex, 0);
    
        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    };

    const handleAddItem = () => {
        if (!name || amount <= 0) {
            alert("Incorrect Input");
            return;
        }

        const newEntry = {
            type: Number(itemType),
            name,
            amount: Number(amount),
        };

        setTableEntries([...tableEntries, newEntry]);
        setName('');
        setAmount(0);
    };

    const handleDelete = (entryToDelete) => {
        const updatedEntries = tableEntries.filter(entry => entry.name !== entryToDelete.name);
        setTableEntries(updatedEntries);

        const updatedData = mydata.filter(entry => entry.name !== entryToDelete.name)
        setMyData(updatedData);
        
    };

  

    const { totalIncome, totalExpense, balance } = updateSummary();


  
  useEffect(()=>{
   async function fetchExpenses(){
     try {
       const response = await fetch("http://localhost:8080/ExpensesLogs");
       const data = await response.json();
       setMyData(data);
     } catch (error) {
       console.error(error); 
     }
   }
   fetchExpenses();
  }, [])
  console.log(mydata);

    return (
      <>
      <Navbar/>
        <div className="summary p-4 sm:p-8">
        <h1 id="balanceTitle" className="text-2xl sm:text-3xl font-bold text-center">
          &#10004; Balance: <span id="updatedBal">{balance}</span>
        </h1>
        <br />
        <div className="total flex justify-around items-center">
          <div className="text-lg sm:text-xl">
            Total Income: 
            <h2 className="text-green-500" id="updatedInc">{totalIncome}</h2>
          </div>
          <hr className="w-px h-12 bg-gray-300 mx-4" />
          <div className="text-lg sm:text-xl">
            Total Expenses: 
            <h2 className="text-red-500" id="updatedExp">{totalExpense}</h2>
          </div>
        </div>
    
        <div className="root mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="items" className="space-y-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <table id="table" className="w-full table-auto border-collapse">
              <thead>
                <tr className="titles bg-gray-200">
                  <th className="p-2 border">S.no.</th>
                  <th className="p-2 border" id="titleName">Name</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Delete</th>
                </tr>
              </thead>
              <tbody>
              {[...tableEntries, ...mydata].map((entry, index) => (
  <tr key={index} className="hover:bg-gray-100">
    <td className="p-2 border">{index + 1}</td>
    <td className="p-2 border">{entry.name}</td>
    <td className="p-2 border">{entry.amount} </td>
    <td className={`p-2 border ${entry.type === 0 || entry.entryType === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
      {entry.type === 0 || entry.entryType === 'Expense' ? 'Expense' : 'Income'}
    </td>
    <td 
      onClick={() => handleDelete(entry)} 
      className="p-2 border cursor-pointer text-red-600 hover:text-red-800"
    >
      &#9746;
    </td>
  </tr>
))}
              </tbody>
            </table>
          </div>
    
          <div id="new" className="space-y-4">
            <h2 className="text-xl font-semibold">Add new</h2>
            <div className="inputs space-y-4">
              <div className="inputitem flex items-center">
                <p className="w-28">Entry type:</p>
                <select 
                  id='itemType' 
                  value={itemType} 
                  onChange={(e) => setItemType(e.target.value)} 
                  className="border p-2 rounded w-full"
                >
                  <option value="0">Expense</option>
                  <option value="1">Income</option>
                </select>
              </div>
              <div className="inputitem flex items-center">
                <p className="w-28">Name:</p>
                <input 
                  id="name" 
                  type="text" 
                  maxLength={10} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="name" 
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="inputitem flex items-center">
                <p className="w-28">Amount:</p>
                <input 
                  id="amount" 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="$" 
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
            <button 
              id="expensesBtnSbm" 
              onClick={handleAddItem} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>
      </>
    );
};

export default ExpenseTracker;
