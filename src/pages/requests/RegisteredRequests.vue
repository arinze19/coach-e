<template>
  <section>
    <header>
      <base-card>
        <h2>Recieved Requests</h2>
      </base-card>
      <base-dialog :show="!!error" title="Something went wrong..." @close="closeDialog">
        {{ error }}
      </base-dialog>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in recievedRequests"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't recieved any requests yet</h3>
    </header>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    recievedRequests() {
      return this.$store.getters['requestsModule/requests'];
    },
    hasRequests() {
      return this.$store.getters['requestsModule/hasRequests'];
    },
  },
  methods: {
    async getRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requestsModule/getRequests');
      } catch (err) {
        this.error = err.message || 'Something went wrong...';
      }

      this.isLoading = false;
    },
    closeDialog() {
      this.error = null
      this.$router.replace('/coaches')
    }
  },
  created() {
    this.getRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>