<template>
    <v-flex xs4 class="ma-3">
        <v-card>
            <v-card-text>
                <v-form>
                    <v-text-field
                        label= "Name"
                        v-model.lazy="device.name"
                    >
                    </v-text-field>
                    <v-text-field
                        label= "on"
                        v-model.lazy="device.on"
                    >
                    </v-text-field>
                    <v-text-field
                        label= "off"
                        v-model.lazy="device.off"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions
            >
                <v-btn @click="del(device.id)">
                    Delete
                </v-btn>
                <v-btn @click="update(device)">
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import { IDevice } from '../../interfaces';
export default Vue.extend({
    props: {
        device: {
            required: true,
            type: Object as () => IDevice
        }
    },
    methods: {
        del: function(id: number){

            this.$emit('del', id)
        },
        update: function(device: IDevice){

            this.$emit('update', device)
        }
    }
})
</script>
