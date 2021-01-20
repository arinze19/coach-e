<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>


<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }

    }
}
</script>


<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #0f0e17;
  border: 1px solid #0f0e17;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:focus {
  outline: 0
}


a:active,
button:active {
  background-color: #a7a9be;
  border-color: #a7a9be;
}

.flat {
  background-color: transparent;
  color: #0f0e17;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #0f0e17;
  color: #0f0e17;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color:  #a7a9be;
}

</style>