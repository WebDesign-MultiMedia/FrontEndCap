import React, { useState } from 'react';
import '/src/index.css';

const ExpenseTracker = () => {
    const [tableEntries, setTableEntries] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [itemType, setItemType] = useState(0); // 0 for Expense, 1 for Income

    const updateSummary = () => {
        const totalIncome = tableEntries.reduce((t, e) => e.type === 1 ? t + e.amount : t, 0);
        const totalExpense = tableEntries.reduce((ex, e) => e.type === 0 ? ex + e.amount : ex, 0);
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
    };

    const { totalIncome, totalExpense, balance } = updateSummary();

    return (
        <div className="summary">
            <h1 id="balanceTitle">&#10004; Balance: <span id="updatedBal">{balance}</span></h1>
            <br />
            <div className="total">
                <div>Total Income: <h2 style={{ color: 'green' }} id="updatedInc">{totalIncome}</h2></div>
                <hr className="vertical" />
                <div>Total Expenses: <h2 style={{ color: 'red' }} id="updatedExp">{totalExpense}</h2></div>
            </div>

            <div className="root">
                <div id="items">
                    <h2>Expenses</h2>
                    <table id="table">
                        <thead>
                            <tr className="titles">
                                <th>S.no.</th>
                                <th id="titleName">Name</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.amount}</td>
                                    <td style={{ color: entry.type === 0 ? 'red' : 'green' }}>
                                        {entry.type === 0 ? 'Expense' : 'Income'}
                                    </td>
                                    <td onClick={() => handleDelete(entry)} style={{ cursor: 'pointer' }}>&#9746;</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr className="vertical" />
                <div id="new">
                    <h2>Add new</h2>
                    <div className="inputs">
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Entry type:</p>
                            <select id='itemType' value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="0">Expense</option>
                                <option value="1">Income</option>
                            </select>
                        </div>
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Name:</p>
                            <input id="name" type="text" maxLength={10} value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
                        </div>
                        <div className="inputitem">
                            <p style={{ width: '9rem' }}>Amount:</p>
                            <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$" />
                        </div>
                    </div>
                    <button id="expensesBtnSbm" onClick={handleAddItem}>Add Expense</button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
