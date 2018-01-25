<template>
    <div class="page-title">
        <back :to="back" v-if="back"/>

        <h1>{{ title }}</h1>

        <span v-if="badge && badge > 0">{{ badge }}</span>
    </div>
</template>

<script>
  import back from "../_partials/back"

  export default {
    components: {
      back
    },

    name: 'page-title',

    props: {
      badge: {
        default: 0,
        required: false,
        type: Number
      },
      back: {
        default: '',
        required: false,
        type: String
      },
      title: {
        required: true,
        type: String
      }
    }
  }
</script>
