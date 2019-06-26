import Controller from '.'
import Api from './Api'
import WS from 'ws'
import { spawn } from 'child_process';
import { execAction } from './Actions';
import ControllerFS from './FS'
import { IController } from '~/interfaces';
import http from 'http'
require('dotenv').config()


const HOST = process.env.CTRL_HOST || 'localhost'
const PORT = (process.env.CTRL_PORT && +process.env.CTRL_PORT) || 3001

const httpServer = http.createServer(api)
const wsServer = new WS.Server({server: httpServer})
wsServer.on('connection', () => {
    console.info(`wsServer listens on ws://${HOST}:${PORT}`) 
})
const ctrl = Controller(
    async function(ctrl: IController, {dayOfWeek, hours, minutes, t}){
        return Promise.all(
            ctrl.actions
            .filter(action => {
                return action.interval && action.interval.daysOfWeek.includes(dayOfWeek)
                && action.interval.hour === hours
                && action.interval.minute === minutes
            })
            .map(execAction)
            .flat()
        )
    }, 
    wsServer,
    new ControllerFS()
)
const ctrlServer = Api(ctrl)
function api(req, res){
    ctrlServer(req, res)
}


export type Controller = typeof ctrl;

httpServer.listen(PORT, HOST, () => {


    console.info(`controller api listens on: http://${HOST}:${PORT}`)
    if(process.env.test){

        spawn('cmd', ['WaterGate - Test', '/c', 'test.bat'], {
            shell: true,
            windowsHide: false,
            detached: true
        })
    }
})

export default ctrl