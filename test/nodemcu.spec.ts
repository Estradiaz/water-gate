import { describe, it } from 'mocha'
import { expect } from 'chai'
import axios from 'axios'
import { execSync } from 'child_process';

describe('node mcu', () => {

    it('node mcu should identify itself in netstat', () => {

        let match = execSync('netstat -a').toString().match(/esp-\d{6}/)
        expect(match).to.be.not.null
    })
    it('node mcu name should be added to dns', () => {


    })
    it('node mcu hostname should be changeable from server', () => {


    })
    it('node mcu should be updateable from server', () => {


    })
    it('getApi - ', (done) => {
        (async () => (

            await axios.get('http://localhost')
        ))()
    })
})