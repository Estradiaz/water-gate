import Controller from '.'
import Api from './Api'
import WS from 'ws'

const wsServer = new WS.Server({
    port: 3001
})
wsServer.on('connection', () => {

    console.log('wsServer listens on 3001')
})
const ctrl = Controller(function(ctrl: any, t: number){
    // console.log('action to ground-controll', t - Date.now(), t)
    
}, wsServer)
export type Controller = typeof ctrl;

Api(ctrl).listen(3002, 'localhost', () => {

    console.log('controller api listens on 3002')
})

export default ctrl