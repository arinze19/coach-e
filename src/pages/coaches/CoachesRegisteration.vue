<template>
  <div>
    <h1>Register page</h1>
    <coach-form @register-coach="addCoach"></coach-form>
  </div>
</template>

<script>
import CoachForm from '../../components/coach/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    addCoach(data) {
      this.$store.dispatch('coachesModule/registerCoach', data);
    },
  },
};
</script>