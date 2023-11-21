import Transaction from "./server/models/transaction.js";
import mongooseConnection from "./server/helpers/mongoose-connection.js";

const mockTransactions = [
    {
        source: "0x2d1C16Fa10F2c361BfCc13559fE245889Da1D728",
        destination: "0x95fF8D3CE9dcB7455BEB7845143bEA84Fe5C4F6f",
        amount: 1.652,
        status: true,
        gasUsed: 15468,
        receiptHash: "0x1c5832d3606f2dbefed1b98f9d5b68357a686d538db6ddcde43335d874c7fb46",
        createdAt: Date.now()
    },
    {
        source: "0xe59C24676fBF48f2b3F52dbF4D4938610378B081",
        destination: "0xFf00000000000000000000000000000000048888",
        amount: 0.389,
        status: true,
        gasUsed: 23000,
        receiptHash: "0x03fd32f7cd8b8e1c899bb6847cb04ffe4f6f3e8af612f63fa2552d1f50c5f50c",
        createdAt: Date.now()
    },
    {
        source: "0x7217FbB1337462be420B271cd77f213a20354E33",
        destination: "0x95fF8D3CE9dcB7455BEB7845143bEA84Fe5C4F6f",
        amount: 0.006,
        status: true,
        gasUsed: 34198,
        receiptHash: "0xeb326f6eb255e9b0b0e87c2b6d4b8fe067882d78d69fc5d70a6d103f469ed90b",
        createdAt: Date.now()
    },
    {
        source: "0x66288E5EAa4B4e22A38423f00A8e0E359bD71e78",
        destination: "0xFf00000000000000000000000000000000042069",
        amount: 4.078,
        status: true,
        gasUsed: 9824,
        receiptHash: "0x18721c48702281c2a9504ef4c1e3d0b9b64d81a3056423d3ac756d7dc583771a",
        createdAt: Date.now()
    },
    {
        source: "0x6798639591530FbBAfd12c2826422B58bD2c5219",
        destination: "0x6375394335f34848b850114b66A49D6F47f2cdA8",
        amount: 0.126,
        status: false,
        gasUsed: 45238,
        receiptHash: "0x525b2ce499afc6bef1052edb6ee4b7cd836068a36817e78d5bafd81651675c92",
        createdAt: Date.now()
    }
]


mongooseConnection()

mockTransactions.forEach(async(eachTransaction) => {
    const newTransaction = new Transaction(eachTransaction)
    await newTransaction.save()   
})