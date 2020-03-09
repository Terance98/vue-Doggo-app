<template>
  <div id="app">
      <Navbar
        :user="user"
        :login="login"
        :logout="logout"
        :checkLogin="checkLogin"
        :toggleLoginForm="toggleLoginForm"
        :viewHomePage="viewHomePage"
      />

      <router-view v-if="!loginStatus" />
      <LoginForm
        :show="loginStatus"
        :login="login"
        :toggleLoginForm="toggleLoginForm"
        :signup="signup"
        :viewHomePage="viewHomePage"
      />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import LoginForm from "@/components/LoginForm.vue";
import router from "@/router/index";
export default {
  data() {
    return {
      user: {},
      loginStatus: false,
      showHomePage: true
    };
  },
  components: {
    Navbar,
    LoginForm,
  },
  methods: {
    toggleLoginForm() {
      this.loginStatus = !this.loginStatus;
    },
    viewAllBreedsPage() {
      this.loginStatus = false;
      router.push({ path: "/allbreeds" });
    },
    viewHomePage(){
      this.loginStatus = false;
      router.push({ path: "/" });
    },
    signup(rawData) {
      const parsedData = JSON.parse(rawData);
      const params = new URLSearchParams();
      params.append("email", parsedData.email);
      params.append("name", parsedData.name);
      params.append("password", parsedData.password);
      //fetch("http://localhost:5000/api/signup", {
       fetch("https://4h6tp4xmce.execute-api.us-east-1.amazonaws.com/default/doggo-atlas-write-api", {
        method: "POST",
        body: params
      })
        .then(res => res.json())
        .then(op => op)
        .catch(err => (err));
    },

    login(rawData) {
      // if (!localStorage.getItem("authToken")) {
        const parsedData = JSON.parse(rawData);
        const params = new URLSearchParams();
        params.append("email", parsedData.email);
        params.append("password", parsedData.password);
        // fetch("http://localhost:5000/api/login", {
        fetch("https://4h6tp4xmce.execute-api.us-east-1.amazonaws.com/default/doggo-atlas-login-api", {
          method: "POST",
          body: params
        })
          .then(res => res.json())
          .then(op => {
            localStorage.setItem("authToken", JSON.stringify(op));
            this.checkLogin();
          })
          .catch(err => (err));
      // } else {
      //   location.reload();
      // }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.user = {};
    },
    checkLogin() {
      try {
        const storedToken = localStorage.getItem("authToken") || null;
        const bearerToken = "Bearer " + JSON.parse(storedToken).token;
        //  fetch("http://localhost:5000/api/posts", {
        fetch("https://4h6tp4xmce.execute-api.us-east-1.amazonaws.com/default/doggo-verify-token-api", {
          method: "POST",
          headers: { Authorization: bearerToken }
        })
          .then(res => res.json())
          .then(op => {
            this.user = op.authData.foundUser;
            this.viewAllBreedsPage();
            return true;
          });
      } catch (err) {
        return false;
      }
    }
  },
  mounted: function() {
    this.checkLogin();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
