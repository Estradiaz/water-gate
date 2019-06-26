<template>
    <v-layout column>
        <v-flex v-for="device in devices" :key="device._id">
            
            <v-btn color="success" @click="toggle(device)">{{device.name}}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Axios from 'axios'
import { RootState, IDevice } from '../interfaces';
@Component<Page>({

    async asyncData({store}){

        store.commit(
            'writeAction',
            (await Axios.get('http://localhost:3002/action')).data
        )
        store.commit(
            'writeDevice',
            (await Axios.get('http://localhost:3002/device')).data
        )
    },
})
export default class Page extends Vue{
    get devices(){

        return (this.$store.state as RootState).devices
    }
    toggle(device: IDevice){

        if(device/**.state */){

        } else {

        }
    }
}
</script>
