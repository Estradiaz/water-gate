<template>
    <v-layout column>
        <v-flex>
            
            <v-layout row wrap>
                <v-layout column
                >
                    <v-flex 
                            v-for="action in actions" 
                            :key="action._id"
                    >
                        
                        <Action 
                            :action.sync="action"
                            @delete="del"
                        />
                    </v-flex>
                </v-layout>
                <v-flex>
                    <v-card>
                        <v-card-title primary-title>
                            New
                        </v-card-title>
                        <v-card-text>
                            
                            <v-layout column>
                                <v-flex>
                                    
                                    <v-text-field
                                        name="name"
                                        label="Name"
                                        v-model="actionName"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex>
                                    
                                    <v-select
                                        :items="devices"
                                        item-text="name"
                                        item-value="_id"
                                        v-model="cDevice"
                                        label="Device"
                                        chips
                                        multiple
                                        clearable
                                        deletable-chips
                                    ></v-select>
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day0">Montag</label>
                                    <input type="checkbox" v-model="cWeekDays[1]" id="day0">
                                </v-flex>
                                <v-flex >
                                    
                                <label for="day1">Dienstag</label>
                                <input type="checkbox" v-model="cWeekDays[2]" id="day1">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day2">Mittwoch</label>
                                    <input type="checkbox" v-model="cWeekDays[3]" id="day2">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day3">Donnerstag</label>
                                    <input type="checkbox" v-model="cWeekDays[4]" id="day3">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day4">Freitag</label>
                                    <input type="checkbox" v-model="cWeekDays[5]" id="day4">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day5">Sammstag</label>
                                    <input type="checkbox" v-model="cWeekDays[6]" id="day5">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day6">Sonntag</label>
                                    <input type="checkbox" v-model="cWeekDays[0]" id="day6">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="time">Zeit</label>
                                    <input id="time" type="time" v-model="time" format="24hr">
                                </v-flex>
                                <v-flex>
                                    
                                    <v-switch :label="`Action: ${onoff ? 'on' : 'off'}`" v-model="onoff"></v-switch>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="success" @click="add">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>    
    </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Action from '@/components/Action/index.vue'
import Axios from 'axios';
import { RootState, IDevice, IAction } from '../../../interfaces';
import { setInterval, clearInterval } from 'timers';
@Component<Actions>({

    components: {
        Action
    },
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
   
})
export default class Actions extends Vue{
    actionName: string = ""
    
    time: string = ""
    onoff: boolean = false
    cWeekDays: boolean[] = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]
    selectedDevices: IDevice[] = []
    get cDevice(): string[]{

        return this.selectedDevices.map(device => device._id)
    }
    set cDevice(id: string[]){
        this.selectedDevices = this.devices.filter(device => id.includes(device._id))
    }
    get actions(){
        return (this.$store.state as RootState).actions
    }
    set actions(actions: IAction[]){

        this.$store.commit('writeAction', actions)
    }
    get devices(): IDevice[]{

        return this.$store.state.devices
    }
    async del(action: IAction){

        let actions = (await Axios.delete(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/admin/action`, {data: action})).data.slice()
        this.actions = actions
    }
    async add(){

        if(!this.selectedDevices.length) return ;
        //@ts-ignore
        const action: IAction & {_id: undefined} = {
            name: this.actionName,
            device: this.selectedDevices,
            method: this.onoff ? 'on' : 'off',
            interval: {
                
                daysOfWeek: this.cWeekDays.map((x, i) => x ? i : x).filter(x => x) as number[],
                hour: +this.time.split(':')[0],
                minute: +this.time.split(':')[1]
            },
            
        }
        let response = await Axios.put(`http://${this.$store.state.HOST}:${this.$store.state.PORT}/controller/admin/action`, action)
        this.actions = [...this.actions, response.data]
    }
}
</script>
