import {describe, test} from 'mocha'
import {expect} from 'chai'
import WS from 'ws';
import axios from 'axios'

const mockStoreData = {

    'action': {
        device: {
            name: "testDevice",
            on: 'http://localhost:3101/1',
            off: 'http://localhost:3101/0',
        },
        name: 'TestAction',
        method: 'off',
        interval: {
            daysOfWeek: [1,3,5],
            hour: 15,
            minute: 0
        }
    },
    'device': {
        name: "testDevice",
        on: 'http://localhost:3101/1',
        off: 'http://localhost:3101/0',
    },
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
                let {data: getData1} = await axios.get(url) 
                await axios.put(url, mockStoreData[store])
                let {data: getData2} = await axios.get(url)
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
                await axios.put(url, mockStoreData[store])
                let {data: getData2} = await axios.get(url) 
                await axios.delete(url, {
                    data:
                    mockStoreData[store]
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

            let status = await axios.get(`http://localhost:3002/A`)
            .then(
                resp => resp.status
            )
            .catch(
                resp => resp.status
            )
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

            let status = await axios.delete(`http://localhost:3002/A`)
            .then(
                resp => resp.status
            )
            .catch(
                resp => resp.status
            )
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

            let status 
            await axios.put(`http://localhost:3002/A`, {})
            .then(
                resp => status = resp.status
            )
            .catch(
                resp => status = resp.status
            )
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
