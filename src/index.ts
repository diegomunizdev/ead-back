import app from './app'
import dotenv from 'dotenv';
dotenv.config();

import './database';

const port: string = process.env.HTTP_PORT ? process.env.HTTP_PORT : ''

function main() {
    app.listen(port);
    console.log(`>> Server running on http://localhost:${port}`);
}

main();