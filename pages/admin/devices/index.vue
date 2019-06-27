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
                    <v-text-field
                        label= "state"
                        v-model.lazy="deviceState"
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
        store.commit(
            'writeDevice',
            (await axios.get(`http://${store.state.HOST}:${store.state.PORT}/controller/admin/device`)).data
        )
    }
})
export default class Devices extends Vue{
    deviceName: string = ""
    deviceOn: string = ""
    deviceOff: string = ""    
    deviceState: string = ""    
    
    
    get devices(){

        return (this.$store.state as RootState).devices.map(device => Object.assign({}, device))
    }
    set devices(devices: IDevice[]){

        this.$store.commit('writeDevice', devices)
    }

    async del(device: IDevice){

        this.devices = (await axios.delete(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/admin/device`, {data: device})).data.slice()
    }
    
    async update(device: IDevice){
        axios.put(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/admin/device`, {
            name: device.name, 
            on: device.on,
            off: device.off,
            _id: device._id,
            state: device.state,
            getState: device.getState
        })
    }
    async add(){

        let name = this.deviceName
        this.deviceName = "";
        let on = this.deviceOn;
        this.deviceOn = "";
        let off = this.deviceOff;
        this.deviceOff = "";
        let getState = this.deviceState;
        this.deviceState = "";

        let response = await axios.put(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/admin/device`, {
            name,
            on,
            off,
            state: false,
            getState
        })
        this.devices = [...this.devices, response.data]
    }
    
}
</script>
