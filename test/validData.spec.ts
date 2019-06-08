import {test} from 'mocha'
import {expect} from 'chai'

import { mockStoreData } from './mock'
import { validAction } from '../Controller/Store/ActionStore';
import { validDevice } from '../Controller/Store/DeviceStore';
import { validOption } from '../Controller/Store/OptionStore';


test('validAction', () => {

    const t1 = validAction(mockStoreData['action'])
    const t2 = validAction(mockStoreData['device'])
    expect(t1).to.be.true
    expect(t2).to.be.false
})
test('validDevice', () => {

    const t1 = validDevice(mockStoreData['device'])
    const t2 = validDevice(mockStoreData['action'])
    expect(t1).to.be.true
    expect(t2).to.be.false
})
test('validOption', () => {

    const t1 = validOption(mockStoreData['option'])
    const t2 = validOption(mockStoreData['action'])
    expect(t1).to.be.true
    expect(t2).to.be.false
})