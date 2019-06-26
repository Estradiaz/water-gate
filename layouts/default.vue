<template>
    <v-app>
        <v-toolbar color="primary">
            <v-spacer>
            </v-spacer>
            <v-toolbar-items>
                <v-btn flat color="white" to="/">WaterGate</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat color="white" to="/admin/devices">Devices</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat color="white" to=/admin/actions>Actions</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <nuxt />
    </v-app>
</template>
