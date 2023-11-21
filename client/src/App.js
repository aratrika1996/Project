import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import TransactionList from './components/Transaction/TransactionList'
import Address from './components/Address/Address'
import Wallet from './components/Wallet/Wallet'
import TransactionDetails from './components/Transaction/TransactionDetails'
import Transfer from './components/Address/Transfer'


function App() {
  const [transactions, setTransactions] = useState([])
  const [addresses, setAddresses] = useState([])
  const [accountDetails, setAccountDetails] = useState({})

  useEffect(() => {
    const fetchAppData = async () => {
      try {

        // fetch addresses
        const addressResponse = await fetch('http://localhost:8080/account/addresses');
        
        if (!addressResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const addressResult = await addressResponse.json();
        setAddresses(addressResult);

        // fetch wallet details
        const accountResponse = await fetch('http://localhost:8080/account/balance');
        
        if (!accountResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const accountResult = await accountResponse.json();
        setAccountDetails(accountResult);

      } catch (error) {
        console.log("Error")
      }
    };

    fetchAppData();

  }, [])

  useEffect(() => {
    const fetchTransactionData = async() => {
      try {

        // fetch transaction data
        const transactionResponse = await fetch('http://localhost:8080/transaction/history');
        
        if (!transactionResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const transactionResult = await transactionResponse.json();
        setTransactions(transactionResult);
    }
    catch {
      console.log("Error")
    }
    }

    fetchTransactionData()
  }, [transactions])

  const handleBalanceChange = (newBalance) => {
    setAccountDetails({
      ...accountDetails,
      balance : newBalance
    })
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/transaction' />} />
          <Route path="/transaction" element={<TransactionList transactions={transactions} />} />
          <Route path='/transaction/:hash' element={<TransactionDetails />} />
          <Route path="/address" element={<Address addresses={addresses} />} />
          <Route path="/transfer/:nodeAddress" element={<Transfer accountDetails={accountDetails} onUpdateTransaction={setTransactions} onTransfer={handleBalanceChange} />} />
          <Route path="/wallet" element={<Wallet accountDetails={accountDetails} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
