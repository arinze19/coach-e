<template>
  <base-card>
    <base-dialog :show="!!error" @close="closeDialog">
      {{ error }}
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="sendAuth">
      <div class="form-control">
        <label for="email"> Email: </label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password"> Password: </label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!inputIsValid">
        Please enter a valid email and password(email characters must be more
        than 6)
      </p>
      <base-button>{{ switchActionMainText }} </base-button>
      <base-button mode="flat" @click="switchAction" type="button">
        {{ switchActionAltText }}
      </base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      inputIsValid: true,
      action: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async sendAuth() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.inputIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.action === 'login') {
          this.isLoading = true;

          await this.$store.dispatch('login', actionPayload);
        } else {
          this.isLoading = true;
          await this.$store.dispatch('signup', actionPayload);
        }
        
        const redirectUrl = '/' + (this.$router.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      } catch (err) {
        this.error = err.message || 'An Error occured, try again...';
      }

      this.isLoading = false;
    },
    switchAction() {
      if (this.action === 'login') {
        this.action = 'sign up';
      } else {
        this.action = 'login';
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
  computed: {
    switchActionMainText() {
      if (this.action === 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },
    switchActionAltText() {
      if (this.action === 'sign up') {
        return 'Login instead';
      } else {
        return 'Sign Up instead';
      }
    },
  },
};
</script>



<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>