import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    gasUsed: {
        type: Number,
        required: false
    },
    receiptHash: {
        type: String,
        unique: true,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction