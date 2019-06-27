<template>
    <v-layout row wrap>
        <v-flex v-for="device in devices" :key="device._id" xs6 md3>
            
            <v-btn :color="device.state ? 'blue' : 'orange'" @click="toggle(device)">{{device.name}}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Axios from 'axios'
import { RootState, IDevice } from '../interfaces';
const ON = 1
const OFF = 0
@Component<Page>({

    async asyncData({store}){

        store.commit(
            'writeAction',
            (await Axios.get(`http://${store.state.HOST}:${store.state.PORT}/controller/admin/action`)).data
        )
        store.commit(
            'writeDevice',
            (await Axios.get(`http://${store.state.HOST}:${store.state.PORT}/controller/admin/device`)).data
        )
    },
    mounted(){
        
        this.$store.dispatch('init')
    }
})
export default class Page extends Vue{
    private prevent = false
    get devices(){

        return (this.$store.state as RootState).devices
    }
    async toggle(device: IDevice){
        if(this.prevent) return ;
        this.prevent = true
        if(+device.state == 1){
            // await Axios.get(device.off)
            await Axios.put(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/device`, {state: OFF, _id: device._id})
        } else {
            // await Axios.get(device.on)
            await Axios.put(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/device`, {state: ON, _id: device._id})
        }
        this.prevent = false
    }
}
</script>
