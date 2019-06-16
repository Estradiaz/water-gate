<template>
    <v-card height="100%">
        <v-card-text>
            
            <v-layout align-center column>
                <v-flex>
                    <v-date-picker

                        label= "Datum"
                        v-model.lazy="cTerminDate"
                        :events="funcEvents"
                        event-color="green"
                        @input="dateInput"
                    >
                    </v-date-picker>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        date: {
            required: true,
            type: String
        },
        events: {
            default: [],
            type: Array
        }
    },
    computed: {
        cTerminDate: {
            get: function(): string{

                //@ts-ignore
                return this.date
            },
            set: function(value: string){

                if(/\d\d\d\d-\d\d-\d\d/.test(value)){

                    //@ts-ignore
                    this.$emit('update:date', value)
                } else if (value === ""){
                    
                    //@ts-ignore
                    this.$emit('update:date', "")
                }
            }
        },
        cEvents: function(): boolean[]{

            return []
        }
    }
})
</script>
