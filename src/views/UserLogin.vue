<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">Login</v-card-title>
        <v-card-subtitle>ユーザー情報を入力してください。</v-card-subtitle>
        <v-btn text color="light-blue" to="signup">新規登録はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field v-model="password" type="password" label="Password">
          </v-text-field>

          <v-btn color="success" class="login-btn" :disabled="isValid">
            LOGIN
          </v-btn>

          <v-btn> CLEAR </v-btn>
          <v-alert dense text type="success" class="success-message" v-if="message">
            {{ message }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<style>
.login-form {
  margin: 150px;
  padding: 30px;
}
.login-box {
  margin: 0px auto;
  padding: 30px;
}
.login-title {
  display: inline-block;
}
.login-btn {
  margin-right: 10px;
}
.success-message {
  margin-top: 20px
}
</style>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "正しいメールアドレスを入力してください",
    ],
    password: "",
    message: "",
  }),
  mounted() {
    if (localStorage.message) {
      this.message = localStorage.message;
      localStorage.message = "";
    }
  },
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
