import { IDevice, IAction, IOption } from "~/interfaces";

export const mockStoreData = {

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
    } as IAction,
    'device': {
        name: "testDevice",
        on: 'http://localhost:3101/1',
        off: 'http://localhost:3101/0',
    } as IDevice,
    'option': {
        name: "TestOption",
        value: []
    } as IOption
}