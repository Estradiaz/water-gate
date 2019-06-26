import express from 'express'
import admin from './admin'
import device from './device'
import { Controller } from '../run';

export default function(ctrl: Controller) {

    const server = express()
    server.use('/admin/', admin(ctrl))
    server.use('/device/', device(ctrl))
    return server
}
