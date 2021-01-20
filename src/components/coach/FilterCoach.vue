<template>
  <base-card>
    <h2>Filter coaches by area of expertise</h2>
    <div class="filter-options">
      <label for="frontend"> frontend:</label>
      <input type="checkbox"  id="frontend" @change="setFilter" checked />

      <label for="backend"> backend:</label>
      <input type="checkbox"  id="backend" @change="setFilter" checked />

      <label for="career"> career:</label>
      <input type="checkbox"  id="career" @change="setFilter" checked />
    </div>
  </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    }, 
    methods: {
        setFilter(event) {
            const inputId        = event.target.id;
            const isActive       = event.target.checked;
            const updatedFilters = {
                ...this.filters,    
                [inputId]: isActive    // ===================== logic
            }
            this.filters = updatedFilters
            this.$emit('change-filter', updatedFilters)
        }
    }
}

</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>