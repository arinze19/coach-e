<template>
    <span class="badge" :class="title">
        {{ text }}
    </span>
    
</template>

<script>
export default {
    props: ['title'],
    computed: {
        text() {
            return this.title.toUpperCase()
        }
    }
}
</script>


<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color:peachpuff;
  color: white;
}

.backend {
  background-color: #e53170;
  color: white;
}

.career {
  background-color: #a7a9be;
  color: white;
}
</style>