import {describe, test} from 'mocha'
import {expect} from 'chai'
import WS from 'ws';
import axios from 'axios'
import { IStoreElement, IAction, IDevice, IOption } from '~/interfaces';
require('dotenv').config()

const HOST = process.env.CTRL_HOST
const PORT = process.env.CTRL_PORT

const mockStoreData = {

    'action': {
        device: {
            name: "testDevice",
            on: 'http://localhost:3101/1/1',
            off: 'http://localhost:3101/1/0',    
        },
        name: 'TestAction',
        method: 'off',
        interval: {
            daysOfWeek: [1,3,5],
            hour: 15,
            minute: 0
        }
    } as IAction,
    'device': {
        name: "testDevice",
        on: 'http://localhost:3101/1/1',
        off: 'http://localhost:3101/1/0',
        state: false,
        getState: 'http://localhost:3101/1'
    } as IDevice,
    'option': {
        name: "TestOption",
        value: []
    } as IOption
}

describe(
    'test websocket server handling',
    () => {
        test(
            `ws should connect to ws://${HOST}:${PORT} wsServer within 2000ms`, 
            (done) => {

                    new Promise((resolve, reject) => {
    
                        const ws = new WS(`ws://${HOST}:${PORT}`);
                        ws.on('open', () => done())
                        ws.on('error', done);
                    })
            }

        ).timeout(2000)

        
    }
)
Array.from(['device', 'action', 'option']).forEach(store => {
    const url = `http://${HOST}:${PORT}/admin/${store}/`
    
    describe(`${store} update behaviour http://${HOST}:${PORT}/admin/${store}/`, ()=> {

        test('get should get all current ' + store + 's', (done) => {
            (async () => {

                try{
        
                    const {data} = await axios.get(url)
                    console.log('get', data)
                    done();
                } catch (e){
                    console.error('get', e)
                    done(e)
                }
            })()

        }).timeout(2000);
        test(`put ${url} should add ${store}`, (done) => {
            (async () => {
                let {data: getData1} = await axios.get(url)    
                await axios.put(url, mockStoreData[store])
                let {data: getData2} = await axios.get(url)
                try {

                    expect(getData1.length).to.eq(getData2.length - 1)
                    done()
                } catch (e) {

                    done(e)
                }
            })()
        }).timeout(2000)
        test(`put /${store} should update ${store}`, (done) => {
            (async () => {
                
                await axios.put(url, mockStoreData[store])
                let {data: getData1} = await axios.get(url) as {data: IStoreElement[]}
                const changed: IStoreElement = {...mockStoreData[store], _id: getData1[0]._id}
                await axios.put(url, changed)
                let {data: getData2} = await axios.get(url) as {data: IStoreElement[]}
                try {

                    expect(getData1.length).to.eq(getData2.length)
                    done()
                } catch (e) {

                    done(e)
                }
            })()
        }).timeout(2000)

        test(`put /${store} should broadcast`, (done)=>{
            (async () => {
            await new Promise((resolve, reject) => {

                const ws = new WS(`ws://${HOST}:${PORT}`);
                ws.on('open', resolve)
                ws.on('message', (msg) => {

                    ws.removeAllListeners();
                    done()
                })
                ws.on('error', reject);
            })
            const {data} = await axios.put(url, mockStoreData[store])
            
            })()
        }).timeout(2000)

        test(`delete /${store} should remove ${store}`, (done) => {
            (async () => {

                let {data: getData1} = await axios.get(url) 
                const placed: IStoreElement = (await axios.put(url, mockStoreData[store])).data
                let {data: getData2} = await axios.get(url) 
                await axios.delete(url, {
                    data:
                    placed
                })
                let {data: getData3} = await axios.get(url) 
                
                try {
                    expect(getData1.length)
                    .to
                    .eq(getData3.length)
                    .to
                    .eq(getData2.length - 1)

                    done()
                } catch {

                    done()
                }
            })()
        })
    })
})
describe('invalid request', ()=> {

    test('random get', (done) => {
        (async ()=>{

            let status;
            try {

              status  = (await axios.get(`http://${HOST}:${PORT}/A`)).status
            } catch (e){
                status = e.response.status
            }
            try {
                expect(status).to.eq(404)
                done()
            } catch (e){

                done(e)
            }
        })()
    }).timeout(2000)
    test('random delete', (done) => {
        (async ()=>{

            let status;
            try {

              status  = (await axios.delete(`http://${HOST}:${PORT}/A`)).status
            } catch (e){
                status = e.response.status
            }
            try {
                expect(status).to.eq(404)
                done()
            } catch (e){

                done(e)
            }
        })()
    }).timeout(2000)
    test('random put', (done) => {
        (async ()=>{

            let status;
            try {

              status  = (await axios.put(`http://${HOST}:${PORT}/A`, {})).status
            } catch (e){
                status = e.response.status
            }
            try {
                expect(status).to.eq(404)
                done()
            } catch (e){
                
                expect(status).to.eq(404)
                done(e)
            }
        })()
    }).timeout(2000)
})


describe('should controll state of device', () => {

    const url = `http://${HOST}:${PORT}/device/`
    const ON = true
    const OFF = false

    test('turn device on ' + url, (done) => {

        (async () => {
            const {data: devices} = await axios.get(`http://${HOST}:${PORT}/admin/device`)
            const device = devices[0]
            device.state = ON
        
            try {
                
                const {data} = await axios.put(url, device)
                expect(!!data.state).to.equal(ON)
                done()
            } catch (e) {
                done(e)
            }
        })()
    } ).timeout(10000)

    test('websocket should notice state change of device[1]', (done) => {

        (async () => {
            const {data: devices} = await axios.get(`http://${HOST}:${PORT}/admin/device`)
            const device = devices[1]
            const ws = new WS(`ws://${HOST}:${PORT}`)
            ws.on('error', done);
            let counter = 0
            ws.on('message', msg => {

                //@ts-ignore
                const  {store, data} = JSON.parse(msg)
                //@ts-ignore
                if(store !== 'device') return;
                //@ts-ignore
                const devices = data
                let _device = devices.find(d => d._id === device._id)
                // first off 
                // second on
                expect(_device.state).to.equal(!!counter)
                counter++;
                if(counter >= 1){

                    ws.close();
                    done()
                }
            })
            device.state = OFF
            try {
                
                const {data} = await axios.put(url, device)
                expect(!!data.state).to.equal(OFF)
                
            } catch (e) {
                done(e)
            }
            device.state = ON
            try {
                
                const {data} = await axios.put(url, device)
                expect(!!data.state).to.equal(ON)
                
            } catch (e) {
                done(e)
            }
        })()
    }).timeout(20000)
})