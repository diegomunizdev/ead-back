import mongoose from 'mongoose'

const database: string = process.env.CONNECTION_DB ? process.env.CONNECTION_DB : ''

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(database, options).then(result => {
    console.log('>> Banco de Dados conectado com sucesso')
}).catch(err => {
    console.log('xxx Não foi possível conectar com o Banco de Dados. Error: ', err.message)
})