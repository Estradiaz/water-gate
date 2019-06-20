import {describe, test} from 'mocha'
import {expect} from 'chai'
import WS from 'ws';
import axios from 'axios'
import { IStoreElement } from '~/interfaces';
import { doesNotReject } from 'assert';

const mockStoreData = {

    'action': {
        device: {
            name: "D0",
            on: 'http://localhost:3101/write/0/1',
            off: 'http://localhost:3101/write/0/0',    
        },
        name: 'D0 on',
        method: 'on',
        interval: {
            daysOfWeek: [0,1,2,3,4,5,6],
            hour: (new Date()).getHours(),
            minute: (new Date()).getMinutes() + 1
        }
    } ,
    'device': {
        name: "D0",
        on: 'http://localhost:3101/write/0/1',
        off: 'http://localhost:3101/write/0/0',
    } ,
    'option': {
        name: "TestOption",
        value: []
    } 
}

describe(
    'test websocket server handling',
    () => {
        test(
            'ws should connect to port 3001 wsServer within 2000ms', 
            (done) => {

                    new Promise((resolve, reject) => {
    
                        const ws = new WS('ws://localhost:3001');
                        ws.on('open', () => done())
                        ws.on('error', done);
                    })
            }

        ).timeout(2000)

        
    }
)
Array.from(['device', 'action', 'option']).forEach(store => {
    const url = `http://localhost:3002/${store}/`
    
    describe(`${store} update behaviour`, ()=> {

        test('get should get all current ' + store + 's', (done) => {
            (async () => {

                try{
        
                    await axios.get(url)
                    done();
                } catch (e){
        
                    done(e)
                }
            })()

        }).timeout(2000);
        test(`put /${store} should add ${store}`, (done) => {
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

                const ws = new WS('ws://localhost:3001');
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

              status  = (await axios.get(`http://localhost:3002/A`)).status
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

              status  = (await axios.delete(`http://localhost:3002/A`)).status
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

              status  = (await axios.put(`http://localhost:3002/A`, {})).status
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
describe('test controller action handling 2minutes ', () => {

    it('action trigger 62000ms min later', (done) => {
        (async () => {

            // await axios.put(`http://localhost:3002/action`, mockStoreData['action'])
            let read = (await axios('http://localhost:3101/read/0')).data
            expect(+read).to.equal(0)
            setTimeout( async () => {
                let data = (await axios('http://localhost:3101/read/0')).data
                console.log(data)
                expect(+data).to.equal(1)
                done()
            }, 61000)
        })()
    }).timeout(62000)
})