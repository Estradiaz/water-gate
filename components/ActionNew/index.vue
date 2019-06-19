<template>
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
                        deletable-chips
                        multiple
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
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { IDevice } from '../../interfaces';
@Component<ActionNew>({
})
export default class ActionNew extends Vue{
    hours: number = 0
    minutes: number = 0
    weekdays: number[] = []
    actionName: string = ""
    deviceSelection: IDevice | null = null
    set cDevice(value: any){

        console.log(value)
        this.deviceSelection = value
    }
    get cDevice(): any{

        return this.deviceSelection
    }
    get cTime(): string{

        return `${this.hours}`.padStart(2,'0') + ':' + `${this.minutes}`.padStart(2, '0')
    }
    set cTime(time: string){

        [this.hours, this.minutes] = time.split(':').map(x => +x)
    }
    get cWeekDays(): boolean[]{

        let wd = Array(7).fill(false)
        this.weekdays.map(_wd => {

        wd[_wd] = true
        })
        return wd
    }
    set cWeekDays(wd: boolean[]){

        this.weekdays = wd.filter(x => x).map((x, i) => i)
    }    
}
</script>

