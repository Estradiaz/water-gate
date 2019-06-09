<template>
    <v-layout>
        <Action 
            v-for="action in actions" 
            :key="action.name"
            :action.sync="action"
        />
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Action from '@/components/Action/index.vue'
import Axios from 'axios';
import { RootState } from '../../../interfaces';
export default Vue.extend({
    components: {
        Action
    },
    computed: {
        actions: function(){

            return (this.$store.state as RootState).actions
        }
    },
    async asyncData({store}){

        store.commit(
            'writeAction',
            (await Axios.get('http://localhost:3002/action')).data
        )
    }
})
</script>
