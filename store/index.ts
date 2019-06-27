import { RootState, BroadcastStoreUpdateMsg, IAction, IDevice, IOption } from "~/interfaces";
import { ActionTree, MutationTree } from "vuex";

// require('dotenv').config()
// const PORT = process.env.CTRL_PORT
// const HOST = process.env.CTRL_HOST
export const state = () => ({

    HOST: 'localhost',
    PORT: '3001',
    actions: [],
    devices: [],
    options: []
}) as RootState

export const actions: ActionTree<RootState, RootState> = {

    init({dispatch, rootState}){

        const ws = new WebSocket(`ws://${rootState.HOST}:${rootState.PORT}`)
        
        ws.addEventListener('open'
        , ( code => {

        }))
        ws.addEventListener('close', ( code => {


        }))
        ws.addEventListener('message', (msg) => {

            try {

                const data: BroadcastStoreUpdateMsg = JSON.parse(msg.data);

                switch(data.store){

                    case 'action':
                        dispatch('runAction', data)
                        break;
                    case 'device':
                        dispatch('runDevice', data)
                        break;
                    case 'option':
                        dispatch('runOption', data)
                        break;
                }
            } catch {

                // do nothing
            }
        })
    },
    runAction({commit}, data: BroadcastStoreUpdateMsg & {store: 'action'}){

        commit(`${data.type}Action`, data.data)
    },
    runDevice({commit}, data: BroadcastStoreUpdateMsg & {store: 'device'}){
        
        commit(`${data.type}Device`, data.data)
    },
    runOption({commit}, data: BroadcastStoreUpdateMsg & {store: 'option'}){

        commit(`${data.type}Option`, data.data)
    }
}

export const mutations: MutationTree<RootState> = {

    writeAction(s, actions: IAction[]){
        s.actions = actions
    },
    appendAction(s, action: IAction){
        s.actions.push(action)
    },
    writeDevice(s, devices: IDevice[]){
        s.devices = devices
    },
    appendDevice(s, device: IDevice){
        s.devices.push(device)
    },
    writeOption(s, options: IOption[]){
        s.options = options
    },
    appendOption(s, option: IOption){
        s.options.push(option)
    },
}