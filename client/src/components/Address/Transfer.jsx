import React, {useState, useEffect} from 'react'
import Receipt from './Receipt'
import sha256 from 'crypto-js/sha256'
import arrow from "../../assets/images/arrow.svg"
import { useParams } from 'react-router-dom';

const Transfer = ({accountDetails, onUpdateTransaction, onTransfer}) => {
    const { nodeAddress } = useParams();
    // State variables
    const [sourceAccount, setSourceAccount] = useState(accountDetails.address)
    const [destinationAccount, setDestinationAccount] = useState('')
    const [amount, setAmount] = useState(0)
    const [receiptData, setReceiptData] = useState({
        transactionHash: '',
        blockHash: '',
        blockNumber: 0,
        from: '',
        to: '',
        amount: 0,
        gas: 21000
    })
    const [showTransfer, setShowTransfer] = useState(true)
    const [showReceipt, setShowReceipt] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // Initialization
    useEffect(() => {
        setSourceAccount(accountDetails.address)
        setDestinationAccount(nodeAddress)
        setShowReceipt(false)
    }, [])

    // Functions

    // Handling input field
    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    // Validate the input field
    const validateData = (e) => {
        e.preventDefault()
        if (amount === 0) {
            setShowError(true)
            setErrorMessage("Sorry, you can not send 0 ETH!")
        }
        else if (amount > Number(accountDetails.balance)) {
            setShowError(true)
            setErrorMessage("Sorry, you don't have enough balance in your wallet!")
        }
        else {
            setShowError(false)
            handleSubmit()
        }
    }

    // Handle form submission
    const handleSubmit = () => {
        setShowTransfer(false)
        saveTransaction()
        setShowReceipt(true)
        setReceiptData((prevData) => ({
            ...prevData,
            transactionHash : sha256(sourceAccount + Math.random().toString(36).slice(-8)).toString(),
            blockHash : sha256(destinationAccount + "hello").toString(),
            blockNumber : Math.floor(Math.random() * 100000),
            from : sourceAccount,
            to : destinationAccount,
            amount : amount
        }))
        setAmount(0)
        const newBalance = accountDetails.balance - amount
        onTransfer(newBalance)
        
    }

    const saveTransaction = async() => {
        try {
            const transactionData = {
                source: sourceAccount,
                destination: destinationAccount,
                amount: amount,
                status: true,
                gasUsed: receiptData.gas,
                receiptHash: sha256(sourceAccount + Math.random().toString(36).slice(-8)).toString(),
                createdAt: Date.now()
            }

            const response = await fetch('http://localhost:8080/transaction/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                 body: JSON.stringify(transactionData),
            })

            onUpdateTransaction((prevData) => ({
                ...prevData,
                transactionData
            }))
            
            if (!response.ok) {
              console.log("error while saving data")
            }
            
    
        } catch (error) {
            console.log("error while saving data")
        }
    }

    // Handle new transfer
    const newTransfer = () => {
        setShowTransfer(true)
        setShowReceipt(false)
    }

    return (
        <div className='container'>
            {showTransfer && 
                <div className='wallet-card'>
                    <h2 className='wallet-card-title'>Transfer</h2>
                    <div className='address-group'>
                        <p className='wallet-card-desc'><strong>From:</strong> {sourceAccount}</p>
                        <img src={arrow} className='wallet-card-img' />
                        <p className='wallet-card-desc'><strong>To:</strong> {destinationAccount}</p>
                    </div>
                    <form>
                        <div className='wallet-card-details'>
                            <strong>Amount:</strong> <input className='wallet-input' type="number" min={0} placeholder='Enter amount' value={amount} onChange={(e) => handleChangeAmount(e)}  /> ETH
                            {showError && <p className='error-text'>{errorMessage}</p>}
                        </div>
                        <button className='wallet-btn' onClick={(e) => validateData(e)}>Submit</button>
                    </form>
                </div>
            }   
            {showReceipt && <Receipt receiptData={receiptData} onNewTransfer={newTransfer} /> }
        </div>
    )
}

export default Transfer