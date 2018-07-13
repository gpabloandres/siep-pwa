<template>
  <v-app>

    <!-- Sidebar !-->
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <!-- Componente UserSidebar -->
      <user-sidebar />
      <v-divider></v-divider>
      <!-- Componente MenuSidebar -->
      <menu-sidebar />

    </v-navigation-drawer>

    <!-- Menu toolbar !-->
    <v-toolbar
      app
      color="primary"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <!-- Contenido de navegacion !-->
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
  import UserSidebar from './components/user_sidebar.vue'
  import MenuSidebar from './components/menu_sidebar.vue'

  export default {
    components: { UserSidebar, MenuSidebar },
    data () {
      return {
        title: 'Siep',
        drawer: false
      }
    },
    name: 'App'
  }
</script>
