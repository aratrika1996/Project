import mongoose from "mongoose"

function mongooseConnection() {
    mongoose.connect('mongodb://localhost:27017/Aratrika_Blockchain_Explorer_DB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', (error) => {
        console.error('MongoDB connection error: ', error)
    })

    db.once('open', async() => {
        console.log('Connected to MongoDB')
    })
}

export default mongooseConnection