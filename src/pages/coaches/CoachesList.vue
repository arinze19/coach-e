<template>
  <div>
    <base-dialog :show="error" :title="'An Error Occured'" @close="closeError">
      <p>An error occured</p>
    </base-dialog>
    <section>
      <filter-coach @change-filter="setFilter"></filter-coach>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="getCoaches(true)">Refresh</base-button>
          <base-button v-if="!isLoggedIn" to="/auth?redirect=register" link> Login to register as coach </base-button>
          <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">
            Register as a coach
          </base-button>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <p v-else-if="error">an error occured</p>
        <ul v-else-if="hasCoaches && !isLoading">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h2 v-else>No Coaches available</h2>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coach/CoachItem.vue';
import FilterCoach from '../../components/coach/FilterCoach.vue';

export default {
  components: { CoachItem, FilterCoach },
  data() {
    return {
      isLoading: false,
      error: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coachesModule/coaches'];
      const filteredCoaches = coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          //============== logic
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
      return filteredCoaches;
    },
    hasCoaches() {
      return this.$store.getters['coachesModule/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coachesModule/isCoach'];
    },
  },

  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async getCoaches(refresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coachesModule/getCoaches', {
          refresh: refresh,
        });
        this.isLoading = false;
      } catch {
        this.isLoading = false;
        this.error = true;
      }
    },

    closeError() {
      this.error = false;
    },
  },
  created() {
    this.getCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>