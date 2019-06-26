import express from 'express'
import cors from 'cors';
import admin from './admin'
import device from './device'
import { Controller } from '../run';

export default function(ctrl: Controller) {

    const server = express()
    server.use(cors({
        origin: [
            /.*/
        ]
    }))
    server.use(express.json())
    server.use(express.urlencoded({extended: true}))
    server.use('/admin', admin(ctrl))
    server.use('/device', device(ctrl))
    return server
}
