import React from 'react'
import TransactionDetails from './TransactionDetails'

const TransactionList = ({transactions}) => {
  
  return (
    <div className='container'>
      <h1 className='title'>Transaction History</h1>
      {transactions.map((eachTransaction) => (
        <div>
          <TransactionDetails transaction={eachTransaction}/>
        </div>
      ))}
    </div>
  )
}

export default TransactionList