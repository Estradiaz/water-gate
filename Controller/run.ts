import Controller from '.'
import Api from './Api'
import WS from 'ws'
import { spawn } from 'child_process';
import { execAction } from './Actions';
import ControllerFS from './FS'
import { IController } from '~/interfaces';

const wsServer = new WS.Server({
    port: 3001
})
wsServer.on('connection', () => {

    console.log('wsServer listens on 3001')
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
export type Controller = typeof ctrl;

Api(ctrl).listen(3002, 'localhost', () => {


    console.log('controller api listens on 3002')
    console.log(process.env.test)
    if(process.env.test){

        spawn('cmd', ['WaterGate - Test', '/c', 'test.bat'], {
            shell: true,
            windowsHide: false,
            detached: true
        })
    }
})

export default ctrl