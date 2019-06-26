import express from 'express'
import { Controller } from '../run';
import { IDevice } from '~/interfaces';
import Axios from 'axios';

async function getState(device: IDevice){

    const state = (await Axios.get(device.getState)).data as boolean
    device.state = state
    return state
}
async function turnOn(device: IDevice){

    const success = (await Axios.get(device.on)).data as boolean
    device.state = true;
    return success;
}
async function turnOff(device: IDevice){

    const success = (await Axios.get(device.off)).data as boolean
    device.state = false;
    return success;
}

export default function (ctrl: Controller){
    const api = express.Router()
    api.use(express.json())
    api.use(express.urlencoded({extended: true}))
    // i dont care about method here
    api.use('/', async (req, res) => {
        const {_id:id} = req.body
        if(id === undefined) {
            res.status(404).end()
            return;
        }
        const device = ctrl.devices.find(x => x._id === id);
        if(device === undefined){
            res.status(404).end()
            return ;
        }
        const { state } = req.body as IDevice
        if(state != await getState(device)){
            if(state){
                turnOff(device)
            } else {
                turnOn(device)
            }
        } 
        res.status(202).end() // success will be worked on later
    })
    return api
}
