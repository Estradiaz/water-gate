export type BroadcastStoreUpdateMsg<T> = {
    type: 'append'
    data: T
} | {
    type: 'write'
    data: T[]
}

export interface IDevice {

    name: string
    on(): Promise<boolean>
    off(): Promise<boolean>
    uniquieHash: string
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
export interface IAction {

    name: ActionName
    device: IDevice
    method: 'on' | 'off'
    interval?: ActionInterval
    trigger?: ActionTrigger[]
}
export interface IOption{

    name: string
    value: any
}

export interface IPersistence<T> {

    // write(obj: T): Promise<string>
    write(obj: T[]): void
    append(obj: T): void
    // read(key: string): Promise<T>
    readSync(key: string): T | undefined
    // readAll(): Promise<T[]>
    readAllSync(): T[]
}

