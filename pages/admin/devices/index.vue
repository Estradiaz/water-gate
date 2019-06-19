<template>
  <v-layout
    wrap
    justify-center
    align-center
  >
    <device-component
        v-for="device in devices" 
        :key="device.name" 
        :device="device" 
        @del="del"
        @update="update"
    />
    <v-flex xs12 sm6 md4 lg4>
        <v-card>
            <v-card-text>
                
                <v-form>

                    <v-text-field
                        label= "name"
                        v-model.lazy="deviceName"
                    >
                    </v-text-field>
                    <v-text-field
                        label= "on"
                        v-model.lazy="deviceOn"
                    >
                    </v-text-field>
                    <v-text-field
                        label= "off"
                        v-model.lazy="deviceOff"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions
            >
                <v-btn @click="add">
                    Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>

  </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import axios from 'axios'
import DeviceComponent from '@/components/Device/index.vue'
import { IDevice, RootState } from '../../../interfaces';
@Component<Devices>({

    components: {
        DeviceComponent
    },
    async asyncData({store}){

        const data = (await axios.get('http://localhost:3002/device')).data
        console.log(data);
        store.commit(
            'writeDevice',
            data
        )
    }
})
export default class Devices extends Vue{
    deviceName: string = ""
    deviceOn: string = ""
    deviceOff: string = ""    
    
    
    get devices(){

        console.log("state",this.$store.state)
        return (this.$store.state as RootState).devices.map(device => Object.assign({}, device))
    }
    set devices(devices: IDevice[]){

        this.$store.commit('writeDevices', devices)
    }

    async del(device: IDevice){

        console.log("del", device)
        this.devices = (await axios.delete(`http://localhost:3002/device/`, {data: device})).data.slice()
    }
    
    async update(device: IDevice){

        console.log('update', device)
        axios.put('http://localhost:3002/device/', {
            name: device.name, 
            on: device.on,
            off: device.off,
            _id: device._id
        })
    }
    async add(){

        console.log('add')
        let name = this.deviceName
        this.deviceName = "";
        let on = this.deviceOn;
        this.deviceOn = "";
        let off = this.deviceOff;
        this.deviceOff = "";
        console.log("add", {name, on, off})

        let response = await axios.put('http://localhost:3002/device/', {
            name,
            on,
            off
        })
    }
    
}
</script>
