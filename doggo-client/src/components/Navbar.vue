<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Doggo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="viewHomePage">Home</b-nav-item>
          <b-nav-item v-if="user._id" to="/allbreeds">All Breeds</b-nav-item>
          <b-nav-item @click="toggleLoginForm" v-if="!user._id">Login</b-nav-item>

          <b-nav-item-dropdown v-if="user._id" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{user.name}}</em>
            </template>
            <b-dropdown-item @click="logout" to="/">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
export default {
  props: {
    user: Object,
    logout: Function,
    toggleLoginForm: Function,
    viewHomePage: Function
  },
  methods: {
    returnHome() {
      this.toggleLoginForm();
    }
  }
};
</script>

