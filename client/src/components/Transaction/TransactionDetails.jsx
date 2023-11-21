import React, {useState, useEffect} from 'react'
import cross from "../../assets/images/cross.svg"
import check from "../../assets/images/check.svg"

const TransactionDetails = ({transaction}) => {

  const [time, setTime] = useState("")
  useEffect(() => {
    const time = new Date(transaction.createdAt)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    setTime(time.toLocaleDateString('en-US', options))
  }, [])
  return (
    <div className='wallet-card'>
        <p className='wallet-card-details'><strong>Transaction Hash:</strong> {transaction.transactionHash}</p>
        <p className='wallet-card-details'><strong>Gas Used:</strong> {transaction.gasUsed}</p>
        <p className='wallet-card-details status-group'><strong>Status:</strong> <span className={transaction.status ? "status-btn success-btn" : "status-btn failure-btn"}>
          <img className='status-icon' src={transaction.status ? check : cross} />
          {transaction.status ? "Success" : "Fail"}</span></p>
        <div className='hr'></div>
        <p className='wallet-card-details'><strong>From:</strong> {transaction.source}</p>
        <p className='wallet-card-details'><strong>To:</strong> {transaction.destination}</p>
        <div className='hr'></div>
        <p className='wallet-card-details'><strong>Amount:</strong> {transaction.amount} ETH</p>
        <div className='hr'></div>
        <p className='wallet-card-details'><strong>Created At:</strong> {time}</p>
    </div>
  )
}

export default TransactionDetails