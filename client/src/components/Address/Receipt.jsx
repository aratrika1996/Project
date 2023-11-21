import React from 'react'

const Receipt = ({receiptData, onNewTransfer}) => {
  const {
    transactionHash,
    blockHash,
    blockNumber,
    gas,
    from,
    to,
    amount,
  } = receiptData;
  return (
    <div className='wallet-card'>
        <h2 className='wallet-card-title'>Receipt</h2>
        <p className='wallet-card-details'><strong>Transaction Hash:</strong> {transactionHash}</p>
        <p className='wallet-card-details'><strong>Block Hash:</strong> {blockHash}</p>
        <p className='wallet-card-details'><strong>Block Number:</strong> {blockNumber}</p>
        <p className='wallet-card-details'><strong>Gas Used:</strong> {gas}</p>
        <div className='hr'></div>
        <p className='wallet-card-details'><strong>From:</strong> {from}</p>
        <p className='wallet-card-details'><strong>To:</strong> {to}</p>
        <div className='hr'></div>
        <p className='wallet-card-details'><strong>Amount:</strong> {amount} ETH</p>
        <button className='wallet-btn' onClick={onNewTransfer}>New Transfer</button>
    </div>
  )
}

export default Receipt