<template>
  <div class="login-form-container" v-if="show">
    <b-form @submit.prevent="onSubmit">
      <b-form-group v-if="isSignupForm">
        <b-form-input id="input-5" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="password"
          id="input-3"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <a href="#" @click="makeFormSignup">Don't have an account? Sign up</a>
      <b-button type="submit" variant="primary">{{isSignupForm?"Sign up":"Sign in"}}</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    show: Boolean,
    login: Function,
    toggleLoginForm: Function,
    signup: Function,
    viewHomePage: Function
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: ""
      },
      brearerToken: "",
      isSignupForm: false
    };
  },
  methods: {
    makeFormSignup() {
      this.isSignupForm = !this.isSignupForm;
    },
    async onSubmit() {
      if (this.isSignupForm) {
        this.signup(JSON.stringify(this.form));
      } else {
        this.login(JSON.stringify(this.form));
        // this.viewHomePage();
      }

      this.isSignupForm = false;
      this.form.email = "";
      this.form.name = "";
      this.form.password = "";
    }
  }
};
</script>

<style scoped>
.login-form-container {
  margin: 200px auto;
}

.form-control {
  height: 60px;
}
.btn-primary {
  display: block;
  width: 20%;
  border-radius: 100px;
  height: 50px;
  background-color: #25a2b8;
  border-color: #25a2b8;
}
a {
  text-decoration: none;
  color: #25a2b8;
}

@media only screen and (min-width: 1071px) {
  .login-form-container {
    width: 50%;
  }
  .btn-primary {
    width: 40%;
    margin: 20px auto 0 auto;
  }
}

@media only screen and (max-width: 1070px) {
  .login-form-container {
    width: 90%;
  }
  .btn-primary {
    width: 60%;
    margin: 20px auto 0 auto;
  }
}

@media only screen and (max-width: 600px) {
  .login-form-container {
    width: 90%;
  }
  .btn-primary {
    width: 100%;
    margin-top: 20px;
  }
}
</style>