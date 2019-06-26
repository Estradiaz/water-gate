import { describe, test } from 'mocha'
import { expect } from 'chai'

require('dotenv').config()

describe('tests env', () => {

    test('CTRL PORT is 3001', () => {

        expect(process.env.CTRL_PORT).to.eq('3001')
    })
    test('CTRL HOST is localhost', () => {

        expect(process.env.CTRL_HOST).to.eq('localhost')
    })
})