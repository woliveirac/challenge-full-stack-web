<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-group
         prepend-icon="$expand"
         sub-group>
          <v-list-item slot="activator">
            <v-list-item-title>Módulo Acadêmico</v-list-item-title>
          </v-list-item>
          <router-link to="/">
            <v-list-item class="ml-5 list-item">
              <v-list-item-icon>
                <v-icon>mdi-emoticon</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Alunos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Grupo A</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col :lg="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>Desafio Grupo A &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  props: {
    source: String,
  },

  components: {},

  data: () => ({
    drawer: true,
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.list-item {
  margin: 5px;
  border-radius: 4px;
}
.list-item:hover {
  background: #747272;
}
.list-item:active {
  background: rgb(87, 86, 86);
}
</style>