import '/src/App.css'
import Navbar from './components/Navbar';
import RecordLog from './components/RecordLog';
import CalendarApp from './components/Calender'
import ExpenseTracker from './components/Expenses';
import MyChart from './components/Monitor';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  const Yerr = "Yerr World :)";
  
  return (
  <>
  <Navbar />
<Routes>
  <Route path='/' element={  <RecordLog/> } />
  <Route path='/Calender' element={<CalendarApp/>}/>
  <Route path='/Expenses' element={<ExpenseTracker/>}/>
  <Route path='/Monitor' element={<MyChart/>}/>
</Routes>
  </>
  );
}

export default App
