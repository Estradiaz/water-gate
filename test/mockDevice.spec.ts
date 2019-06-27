import { describe, test } from 'mocha'
import { expect } from 'chai'
import axios from 'axios'

describe('validates mock device on localhost 3101', () => {

    const HOST = 'localhost'
    const PORT = '3101'

    test('register devices 1 to 8 - off', (done) => {

        (async () => {

            try {

                const datas = await Promise.all(
                    Array.from({length: 8}, _ => 0)
                    .map(async (_, index) => (await axios.get(`http://${HOST}:${PORT}/${index+1}/0`)).data)
                )
                datas.forEach(data => {
                    expect(data).to.equal(0)
                })
                done()
            } catch (e) {
                
                done(e)
            }

        })()
    })

    test('get all states - dependent on register decvices 1 to 8',(done) => {

        (async () => {

            try {

                const {data} = await axios.get(`http://${HOST}:${PORT}/`)
                expect(Object.keys(data).length).to.equal(8)
                Array.from(data).forEach(data => {
                    expect(data).to.equal(0)
                })
                done()
            } catch (e) {

                done(e)
            }

        })()
    })

    test('turn device 2 on', (done) => {

        (async () => {

            try {
                const {data} = await axios.get(`http://${HOST}:${PORT}/2/1`)
                expect(data).to.equal(1)
                done()
            } catch (e) {

                done(e)
            }
        })()
    })
})