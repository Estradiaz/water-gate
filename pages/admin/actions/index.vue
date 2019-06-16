<template>
    <v-layout>
        <Action 
            v-for="action in actions" 
            :key="action.name"
            :action.sync="action"
        />
        <v-flex>
            <v-text-field
                name="name"
                label="Name"
                v-model="actionName"
            ></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Action from '@/components/Action/index.vue'
import Axios from 'axios';
import { RootState } from '../../../interfaces';
@Component<Actions>({

    components: {
        Action
    },
    async asyncData({store}){

        store.commit(
            'writeAction',
            (await Axios.get('http://localhost:3002/action')).data
        )
    }
})
export default class Actions extends Vue{
    get actions(){
        return (this.$store.state as RootState).actions
    }
}
</script>
