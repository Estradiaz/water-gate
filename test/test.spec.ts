import { describe, test } from 'mocha'
import { expect } from 'chai'

describe('tests test env', () => {

    test('1 is 1', () => {

        expect(1).to.eq(1)
    })
    test('2 is not 1', () => {

        expect(2).to.not.eq(1)
    })
})