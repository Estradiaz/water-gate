<template>
    <v-flex>
        <v-card>
            <v-card-title primary-title>
                {{action.name}}
            </v-card-title>
            <v-card-text>
                <v-layout column>
                    <v-flex>
                        Device: {{action.device.name || action.device.map(d => d.name).join(' | ')}}
                    </v-flex>
                    <v-flex>
                        Wochentage {{daysOfWeek}}
                    </v-flex>
                    <v-flex>
                        Time: {{hours}}:{{minutes}}
                    </v-flex>
                    <v-flex>
                        {{action.method}}
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions
            >
                <v-btn @click="del(action)">
                    Delete
                </v-btn>
                
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import { IAction } from '../../interfaces';
export default Vue.extend({
    props: {
        action: {
            required: true,
            type: Object as () => IAction
        }
    },
    computed: {

        daysOfWeek: function(){

            let a: IAction = this.action
            return (a.interval && a.interval.daysOfWeek.join(' | '))
            || ""
        },
        hours: function(){

            let a: IAction = this.action
            return (a.interval && a.interval.hour)
            || ""
        },
        minutes: function(){

            let a: IAction = this.action
            return (a.interval && a.interval.minute)
            || ""
        },
        
    },
    methods: {
        del(action: IAction){

            this.$emit('delete', action)
        }
    }
})
</script>
