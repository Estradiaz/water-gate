import { IDevice, IAction, IOption } from "~/interfaces";

export const mockStoreData = {

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
            minute: (new Date()).getMinutes() + 2
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