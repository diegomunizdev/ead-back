import app from './app'
import dotenv from 'dotenv'
dotenv.config()

import './database'

function main() {
    app.listen(process.env.PORT || process.env.HTTP_PORT, () => {
        console.log(`>> Servidor rodando http://localhost:${process.env.HTTP_PORT}`)
    })
    
}

main();