import Transaction from "../models/transaction.js"

const getTransactionHistory = async() => {
    const transactionsHistory = await Transaction.find().lean().exec()
    return transactionsHistory
}

const sendTransaction = async(transactionDetails) => {
    const newTransaction = new Transaction(transactionDetails)
    await newTransaction.save()
    return newTransaction
}

export { getTransactionHistory, sendTransaction }