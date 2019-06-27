import { ValidStore } from "./Controller/Api/admin";

export interface IControllerFS {

    write(elements: IAction[], storeName: 'action'): void
    write(elements: IDevice[], storeName: 'device'): void
    write(elements: IStoreElement[], storeName?: ValidStore): void
    append(element: IAction, storeName: 'action'): void
    append(element: IDevice, storeName: 'device'): void
    append(element: IStoreElement, storeName?: ValidStore): void
    delete({_id, name}: {_id: string | number, name: ValidStore}): void
    readAllSync(storeName?: string): IAction[] | IDevice[] | IStoreElement[]

}

export type BroadcastStoreUpdateMsg = {
    store: 'action'
    type: 'append'
    data: IAction
} | {
    store: 'action'
    type: 'write'
    data: IAction[]
} | {
    store: 'device'
    type: 'append'
    data: IDevice
} | {
    store: 'device'
    type: 'write'
    data: IDevice[]
} | {
    store: 'option'
    type: 'append'
    data: IOption
} | {
    store: 'option'
    type: 'write'
    data: IOption[]
}

export interface IStoreElement {
    name: string,
    _id: string,
}

export interface IDevice extends IStoreElement {

    name: string
    on: string,
    off: string,
    state: boolean,
    getState: string
    // on(): Promise<boolean>
    // off(): Promise<boolean>
}

export type ActionName = string
export type ActionInterval = {
    daysOfWeek: number[]
    hour: number
    minute: number
}
export type ActionTrigger = {
    name: ActionName
    delta: number
}
export interface IAction extends IStoreElement{

    name: ActionName
    device: IDevice | IDevice[]
    method: 'on' | 'off'
    interval?: ActionInterval
    trigger?: ActionTrigger[]
}
export interface IOption extends IStoreElement{

    name: string
    value: any
}

export interface IPersistence<T> {

    // write(obj: T): Promise<string>
    write(obj: T[], store: ValidStore): void
    append(obj: T, store: ValidStore): void
    // read(key: string): Promise<T>
    readSync(key: string): T | undefined
    // readAll(): Promise<T[]>
    readAllSync(store?: ValidStore): T[]
}

export type RootState = {
    PORT: string,
    HOST: string,
    actions: IAction[]
    devices: IDevice[]
    options: IOption[]
}

export interface IController {
    options: IOption[]
    devices: IDevice[]
    actions: IAction[]
    loop(t: number): Promise<any>
    stop(): void
}