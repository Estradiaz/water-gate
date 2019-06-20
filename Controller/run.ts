import Controller from '.'
import Api from './Api'
import WS from 'ws'
import { spawn } from 'child_process';
import { execAction } from './Actions';
import ControllerFS from './FS'

const wsServer = new WS.Server({
    port: 3001
})
wsServer.on('connection', () => {

    console.log('wsServer listens on 3001')
})
let lastMinute
const ctrl = Controller(function(ctrl: Controller, t: number){
    console.log('action to ground-controll', t - Date.now(), t)
    const date = new Date();
    let dayOfWeek = date.getDay()
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(lastMinute === minutes) return;
    lastMinute = minutes
    console.log(ctrl.actions)
    let triggerActions = ctrl.actions
    .filter(action => {
        return action.interval && action.interval.daysOfWeek.includes(dayOfWeek)
        && action.interval.hour === hours
        && action.interval.minute === minutes
    })
    .forEach(execAction)
    console.log(triggerActions)
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