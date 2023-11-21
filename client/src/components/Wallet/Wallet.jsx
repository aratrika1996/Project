import React from 'react'

const Wallet = ({accountDetails}) => {
  return (
    <div className='container'>
      <h2 className='title'>My Wallet</h2>
      <p className='desc'><strong>Address:</strong> {accountDetails.address}</p>
      <p className='desc'><strong>Balance:</strong> {accountDetails.balance} ETH</p>
    </div>
  )
}

export default Wallet