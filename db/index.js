const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://manchanda:b8SyYWujxWNs8s9L@cluster0.q2nma.mongodb.net/quizTaker?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db