<template>
    <div class="back-to-index">
        <router-link
            exact
            class="lg:sm-0"
            :to="to">
            <span><svg
                    class="fill-current"
                    height="22"
                    width="22"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm8-10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zM7.46 9.3L11 5.75l1.41 1.41L9.6 10l2.82 2.83L11 14.24 6.76 10l.7-.7z"></path>
                    <title>{{this.translate('actions.back_to_index')}}</title>
                </svg>
            </span>
        </router-link>
    </div>
</template>

<script>
  import pageTitle from '../_partials/page-title'

  export default {
    components: {
      pageTitle
    },

    name: 'back',

    props: {
      to: {
        required: true,
        type: String
      }
    }
  }
</script>
