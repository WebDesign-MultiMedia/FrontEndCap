import React, { useState, useEffect } from 'react';
import '/src/index.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Font from 'react-font';


const ExpenseTracker = () => {
    const [tableEntries, setTableEntries] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [itemType, setItemType] = useState(''); // "Expense" or "Income"
    const [mydata, setMyData] = useState([]);
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
    });

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await fetch("http://localhost:8080/ExpensesLogs");
                const data = await response.json();
                setMyData(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchExpenses();
    }, []);

    useEffect(() => {
        const updateSummary = () => {
            const totalIncome = mydata.reduce(
                (t, e) => (e.type === 'Income' ? t + (+e.amount) : t),
                0
            );
            const totalExpense = mydata.reduce(
                (ex, e) => (e.type === 'Expense' ? ex + (+e.amount) : ex),
                0
            );

            setSummary({
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
            });
        };

        updateSummary();
    }, [mydata]);



    const handleAddItem = async () => {
        if (!name || amount <= 0 || !itemType) {
            alert("Please enter valid data");
            return; 
        } 

        const newItem = {
            name,
            amount,
            type: itemType,
          };
        
          try {
            // Create both fetch requests
            const sheetDBRequest = fetch("https://sheetdb.io/api/v1/a270zvbrqge0t", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newItem),
            });
        
            const localServerRequest = fetch("http://localhost:8080/ExpensesLogs/add", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newItem),
            });
        
            // Use Promise.all to send both requests concurrently
            const [sheetDBResponse, localServerResponse] = await Promise.all([sheetDBRequest, localServerRequest]);
        
            // Handle SheetDB Response
            if (sheetDBResponse.ok) {
              const sheetDBData = await sheetDBResponse.json();
              console.log('SheetDB information added:', sheetDBData);
            } else {
              console.error('Failed to add data to SheetDB', await sheetDBResponse.text());
            }
        
            // Handle Local Server Response
            if (localServerResponse.ok) {
              const localServerData = await localServerResponse.json();
              console.log('Local server information added:', localServerData);
            } else {
              console.error('Failed to add data to local server', await localServerResponse.text());
            }
        
            // Reset form fields after successful submission
            setMyData(newItem);
            setName('');
            setAmount(0);
            setItemType('');
        
          } catch (error) {
            console.error('Error occurred while sending data:', error);
          }

        alert("Entry added successfully");
        window.location.reload();
        

        // No need for window reload, update happens automatically
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/ExpensesLogs/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMyData(mydata.filter((entry) => entry.id !== id));
                alert("Deleted successfully");
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            alert("Error deleting entry");
        }
    };

    return (
        <>
        <Navbar />
            <div className='bg-black min-h-screen'>

                <div className="summary p-4 sm:p-8">
                 <Font family='Josefin Slab'>   <h1 id="balanceTitle" className="text-2xl sm:text-3xl font-bold text-center text-yellow-400">
                        &#10004; Balance: <span id="updatedBal">${summary.balance.toFixed(2)}</span>
                    </h1></Font>
                    <br />
                    <Font family='Libre Baskerville'>
                    <div className="total flex justify-around items-center w-full text-center">
                        <div className="text-lg sm:text-xl text-gray-50">
                            Total Income:
                            <h2 className="text-green-500" id="updatedInc">${summary.totalIncome.toFixed(2)}</h2>
                        </div>
                        <hr className="w-px h-12 bg-gray-100 mx-4" />
                        <div className="text-lg sm:text-xl text-gray-50">
                            Total Expenses:
                            <h2 className="text-red-500" id="updatedExp">${summary.totalExpense.toFixed(2)}</h2>
                        </div>
                    </div></Font>

                    <div className="root mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div id="items" className="space-y-4">
                            <Font family='Josefin Slab'> <h2 className="text-xl font-semibold lg:text-center lg:text-2xl text-white text-center">Expenses</h2></Font>
                           <Font family='Josefin Slab'>    <table id="table" className="w-full sm:bg-gray-800 sm:w-6/12 md:w-full md:relative md:left-0 sm:relative sm:left-52 lg:bg-gray-900 lg:text-white lg:font-semibold lg:text-center lg:w-9/12 lg:relative lg:left-40 table-auto border-collapse text-white">
                               <thead>
                                   <tr className="titles bg-gray-600 text-yellow-400">
                                     <th className="p-1 border">S.no.</th>
                                       <th className="p-1 border sm:w-52" id="titleName">Name</th>
                                        <th className="p-1 border sm:w-52">Amount</th>
                                        <th className="p-1 border sm:w-40 sm:text-center">Type</th>
                                        <th className="p-1 border">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mydata.map((entry, index) => (
                                        <tr key={index} className="hover:bg-red-500 text-lg">
                                            <td className="relative text-center border">{index + 1}</td>
                                            <td className="relative left-4 border">{entry.name}</td>
                                            <td className="relative left-4 border ">${parseFloat(entry.amount).toFixed(2)}</td>
                                            <td className='p-0 border'>{entry.type}</td>
                                            <td
                                                onClick={() => handleDelete(entry.id)}
                                                className="relative left-4 border cursor-pointer text-red-600 hover:text-red-800"
                                            >
                                                &#9746;
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></Font>
                        </div>

                        <div id="new" className="space-y-4">
                            <Font family='Josefin Slab'> <h2 className="text-xl font-semibold sm:text-red-400 md:text-green-400 lg:text-purple-400 text-white sm:text-center lg:text-left text-">Add New</h2></Font>
                            <div className="inputs space-y-4 border-solid border-1 border-black lg:w-96 lg:relative lg:left-3 sm:w-6/12 sm:relative sm:left-52">
                                <div className="inputitem flex items-center">
                                    <p className="w-28 text-center text-white font-mono">Entry type: </p>
                                    <select 
                                        id='itemType'
                                        value={itemType}
                                        onChange={(e) => setItemType(e.target.value)}
                                        className="border p-2 rounded w-full text-center bg-gray-900 text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                    </select>
                                </div>

                                <div className="inputitem flex items-center">
                                    <p className="w-28 text-center text-white font-mono">Name:</p>
                                    <input
                                        id="name"
                                        type="text"
                                        // maxLength={10}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="name"
                                        className="border p-2 rounded w-full bg-gray-900 text-white"
                                    />
                                </div>

                                <div className="inputitem flex items-center">
                                    <p className="w-28 text-center text-white font-mono">Amount:</p>
                                    <input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                                        placeholder="$"
                                        className="border p-2 rounded w-full bg-gray-900 text-white"
                                    />
                                </div>
                            </div>
                            <button
                                id="expensesBtnSbm"
                                onClick={handleAddItem}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 relative left-32 lg:w-60 lg:relative lg:left-16 sm:w-60 sm:relative sm:left-72"
                            >
                                Add Entry
                            </button>
                            <iframe  className=' lg:relative lg:left-10  md:relative md:left-32  relative right-12 '  width="600" height="546" seamless frameborder="0"  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRO2mEi3ico8P9rXa-T3uFfF2Dx8r5mVu7rLJ8nhguF9w8sMdBH4esi5QQcoQfyJ8Cr_weZW-Z4MX7e/pubchart?oid=55008347&amp;format=interactive"></iframe>
                        
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ExpenseTracker;
