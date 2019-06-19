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
                                    <input type="checkbox" v-model="cWeekDays[0]" id="day0">
                                </v-flex>
                                <v-flex >
                                    
                                <label for="day1">Dienstag</label>
                                <input type="checkbox" v-model="cWeekDays[1]" id="day1">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day2">Mittwoch</label>
                                    <input type="checkbox" v-model="cWeekDays[2]" id="day2">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day3">Donnerstag</label>
                                    <input type="checkbox" v-model="cWeekDays[3]" id="day3">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day4">Freitag</label>
                                    <input type="checkbox" v-model="cWeekDays[4]" id="day4">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day5">Sammstag</label>
                                    <input type="checkbox" v-model="cWeekDays[5]" id="day5">
                                </v-flex>
                                <v-flex>
                                    
                                    <label for="day6">Sonntag</label>
                                    <input type="checkbox" v-model="cWeekDays[6]" id="day6">
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
            (await Axios.get('http://localhost:3002/action')).data
        )
        store.commit(
            'writeDevice',
            (await Axios.get('http://localhost:3002/device')).data
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
        console.log(name)
        this.selectedDevices = this.devices.filter(device => id.includes(device._id))
    }
    get actions(){
        return (this.$store.state as RootState).actions
    }
    get devices(): IDevice[]{

        console.log("state",this.$store.state)
        return this.$store.state.devices
    }
    add(){

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
    }
}
</script>
