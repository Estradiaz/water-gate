import { ValidStore } from "./Controller/Api";

export interface IControllerFS {

    write(elements: IAction[], storeName: 'action'): void
    write(elements: IDevice[], storeName: 'device'): void
    write(elements: IStoreElement[], storeName?: string): void
    append(element: IAction, storeName: 'action'): void
    append(element: IDevice, storeName: 'device'): void
    append(element: IStoreElement, storeName?: string): void
    delete({_id}: {_id: string | number}): void
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
    off: string
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
    device: IDevice
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
    readAllSync(): T[]
}

export type RootState = {
    actions: IAction[]
    devices: IDevice[]
    options: IOption[]
}