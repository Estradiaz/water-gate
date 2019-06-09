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
    <v-flex xs4>
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
import Vue from 'vue'
import axios from 'axios'
import DeviceComponent from '@/components/Device/index.vue'
import { IDevice, RootState } from '../../../interfaces';
export default Vue.extend({
    components: {
        DeviceComponent
    },
    data(){
        return {

            deviceName: "",
            deviceOn: "",
            deviceOff: "",
        }
    },
    computed: {
        devices: function(){

            return (this.$store.state as RootState).devices
        }
    },
    methods: {


        del: async function(id: number){

            this.devices = (await axios.delete('http://localhost:3002/devices/')).data.slice()
        },
        update: async function(device: IDevice){

            await axios.put('http://localhost:3002/devices/', {
                name: device.name, 
                on: device.on,
                off: device.off,
                // id: device.id
            })
        },
        add: async function(){

            let name = this.deviceName
            this.deviceName = "";
            let on = this.deviceOn;
            this.deviceOn = "";
            let off = this.deviceOff;
            this.deviceOff = "";
    
            let response = await axios.put('http://localhost:3002/devices/', {
                name,
                on,
                off
            })
        }
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
</script>
