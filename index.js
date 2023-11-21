import express from "express"
import cors from "cors"
import mongooseConnection from "./server/helpers/mongoose-connection.js"
import { getAddresses, getFakeAddresses, getBalance, getFakeAccountDetails } from "./server/controllers/account.js"
import {getTransactionHistory, sendTransaction} from "./server/controllers/transaction.js"

const app = express()
app.use(cors());
const port = 8080

app.use(express.json())

mongooseConnection()

app.get('/account/addresses', async(req, res) => {
    let addresses = await getAddresses()
    // if the hardhat is not running then get fake accounts using faker.js
    if (addresses.length === 0) {
        addresses = getFakeAddresses()
    }
    else {
        //discarding the first address as we are setting the first address to the wallet address
        const newAddresses = addresses.slice(1)
        addresses = newAddresses
    }
    res.json(addresses)
})

app.get('/transaction/history', async(req, res) => {
    const transactions = await getTransactionHistory()
    res.json(transactions)
})

app.get('/account/balance', async(req, res) => {
    let addresses = await getAddresses()
    let accountDetails = {}
    // if the hardhat is not running then get fake account details using faker.js
    if (addresses.length === 0) {
        accountDetails = getFakeAccountDetails()
    }
    else {
        accountDetails = await getBalance(addresses[0])
    }
    res.json(accountDetails)
    
})

app.post('/transaction/send', async(req, res) => {
    await sendTransaction(req.body)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})