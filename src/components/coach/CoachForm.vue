<template>
  <form @submit.prevent="registerCoach">
    <base-card>
      <div class="form-control">
        <div :class="{invalid: !firstName.isValid}">
          <label for="firstname">First Name:</label>
          <input type="text" name="firstname" v-model.trim="firstName.val" />
          <p v-if="!firstName.isValid"> Please enter a first name</p>
        </div>
        <div :class="{invalid: !lastName.isValid}">
          <label for="lastname">Last Name:</label>
          <input type="text" name="lastname" v-model.trim="lastName.val" />
          <p v-if="!lastName.isValid"> Please enter a last name</p>
        </div>
        <div :class="{invalid: !rate.isValid}">
          <label for="rate">Hourly rate:</label>
          <input type="number" name="rate" v-model.number="rate.val" />
          <p v-if="!rate.isValid"> Please enter a non-negative rate name</p>
        </div>
        <div :class="{invalid: !description.isValid}">
          <label for="description">Description:</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            v-model.trim="description.val"
          ></textarea>
          <p v-if="!description.isValid"> Please enter description of yourself</p>
        </div>
        <h3>Select Area of Expertise</h3>
        <div :class="{invalid: !areas.isValid}">
          <input
            type="checkbox"
            name="frontend"
            id="frontend"
            value="frontend"
            v-model="areas.val"
          />
          <label for="frontend">Frontend</label>
        </div>
        <div :class="{invalid: !areas.isValid}">
          <input
            type="checkbox"
            name="backend"
            id="backend"
            value="backend"
            v-model="areas.val"
          />
          <label for="backend">Backend</label>
        </div>
        <div :class="{invalid: !areas.isValid}">
          <input
            type="checkbox"
            name="career"
            id="career"
            value="career"
            v-model="areas.val"
          />
          <label for="career">Career Advisory</label>
        </div>
        <p v-if="!areas.isValid"> Please select an area of expertise</p>
      </div>
      <base-button> Submit </base-button>
    </base-card>
  </form>
</template>

<script>
export default {
  emits: ['register-coach'],
  data() {
    return {
      firstName: {
          val: '',
          isValid: true
      },
      lastName: {
          val: '',
          isValid: true
      },
      rate: {
          val: null,
          isValid: true
      },
      description: {
          val: '',
          isValid: true
      },
      areas: {
          val: [],
          isValid: true
      },
      isFormValid: true
    };
  },
  methods: {
    isValid() {
        if(this.firstName.val === ''){
            this.firstName.isValid = false
            this.isFormValid       = false
        }
        if(this.lastName.val === ''){
            this.lastName.isValid = false
            this.isValid          = false
        }
        if(!this.rate.val || this.rate.val < 0){
            this.rate.isValid = false
            this.isFormValid  = false
        }
        if(this.description.val === ''){
            this.description.isValid = false
            this.isFormValid         = false
        }
        if(this.areas.val.length === 0){
            this.areas.isValid = false
            this.isFormValid   = false
        }
    },
    registerCoach() {
        this.isValid()
        if(!this.isFormValid) {
            return
        }

      const newCoach = {
        first: this.firstName.val,
        last: this.lastName.val,
        rate: this.rate.val,
        desc: this.description.val,
        areas: this.areas.val,
      };
      this.$emit('register-coach', newCoach)
      this.$router.replace('/coaches')
    },
  },
};
</script>


<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>