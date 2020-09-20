import app from './app'
import dotenv from 'dotenv';
dotenv.config();

import './database';

const port: string = process.env.HTTP_PORT ? process.env.HTTP_PORT : ''

function main() {
    app.listen(process.env.PORT || port);
    console.log(`>> Servidor rodando http://localhost:${port}`);
}

main();