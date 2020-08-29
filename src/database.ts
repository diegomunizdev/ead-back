import mongoose from 'mongoose';

const database: string = process.env.CONNECTION_DB ? process.env.CONNECTION_DB : ''

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(database, options).then(result => {
    console.log('>>> Database successfully connected')
}).catch(err => {
    console.log('xxx Failure. Could not connect to the databse. Error: ', err);
})