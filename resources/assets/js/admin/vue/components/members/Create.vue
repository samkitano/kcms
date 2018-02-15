<template>
    <transition name="fade">
        <div class="container mx-auto" v-if="loaded(input)">
            <page-title :back="parent" :title="translate(`${resource}.create`)"/>

            <section class="max-w-md pb-4 px-4 mx-auto">
                <form class="form">
                    <alert type="info" :msg="this.translate('alerts.password_instructions_will_be_sent_by_email')" close/>
                    <alert type="info" :msg="this.translate('alerts.all_fields_required')" close/>

                    <div class="form-block">
                        <template v-for="(field, f) in input">
                            <div class="mb-4" v-if="field.tag === 'input'">
                                <label :for="f">{{ field.label }}*</label>
                                <k-input :id="f"
                                         :name="f"
                                         :ref="f"
                                         :state="field.state"
                                         :title="field.label"
                                         :type="field.type"
                                         :val="input[f].value"
                                         v-if="field.tag === 'input'"
                                         @change="changeModel"/>

                                <p class="error" v-html="input[f].help"/>
                            </div>

                            <div class="mb-4 w-1/3" v-if="field.tag === 'select'">
                                <label :for="f">{{ field.label }}</label>
                                <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state"
                                        v-model="input[f].value">
                                    <option v-for="(value, option) in input[f].options" :value="option">{{ value }}</option>
                                </select>
                                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="clearfix">
                        <btn type="submit"
                             :disabled="working || !changedForm"
                             :text="this.translate('actions.create')"
                             @click="onSubmit"
                        />
                    </div>
                </form>
            </section>
        </div>
    </transition>
</template>

<script>
  import alert from '../_partials/alert'
  import axios from 'axios'
  import btn from '../_partials/button'
  import kInput from '../_partials/input'
  import pageTitle from '../_partials/page-title'
  import { head } from 'lodash'

  export default {
    beforeMount () {
      this.fetchData()
    },

    components: {
      alert,
      btn,
      kInput,
      pageTitle
    },

    computed: {
      endpoint () {
        return this.$route.meta.endpoint.url
      },
      parent () {
        return this.$route.meta.parent
      },
      payload () {
        let payload = { _method: 'POST' }

        for (let i in  this.input) {
          payload[i] = this.input[i].value
        }

        return payload
      },
      postTo () {
        return this.$route.meta.endpoint.url.replace('/create', '')
      }
    },

    data () {
      return {
        changedForm: false,
        input: {},
        resource: '',
        working: false
      }
    },

    methods: {
      alertDone (warning) {
        window.scroll(0, 0)

        this.working = false
        this.$swal({
          title: this.translate('alerts.success'),
          type: warning ? 'warning' : 'success',
          text: this.translate(
            'alerts.created',
            { resource: this.translate('admin') }
            )
        })
      },
      assignErrors (errors) {
        for (let error in errors) {
          this.input[error].state = false
          this.input[error].help = head(errors[error])
        }

        this.working = false
      },
      changeModel (data) {
        this.input[data.event.target.id].value = data.value

        for (let i in this.input) {
          if (!this.input[i].value) {
            return
          }
        }

        this.changedForm = true
      },
      fetchData () {
        this.resetForm()

        axios
          .get(this.endpoint)
          .then((r) => {
            let d = r.data
            this.input = d.input
            this.resource = d.resource
          })
          .catch((e) => {
            this.alertSystemError(e)
          })
      },
      onSubmit () {
        this.working = true
        this.resetErrors()

        axios
          .post(this.postTo, this.payload)
          .then((r) => {
            this.alertDone()
            this.resetForm()
          })
          .catch((e) => {
            if (e.response.status === 422) {
              this.assignErrors(e.response.data.errors)
            } else {
              this.working = false
              this.alertSystemError(e)
            }
          })
      },
      resetErrors () {
        for (let i in  this.input) {
          if (this.input.hasOwnProperty(i)) {
            this.input[i].state = ''
            this.input[i].help = ''
          }
        }
      },
      resetForm () {
        for (let f in this.input) {
          if (this.input[f].tag === 'input') {
            this.input[f].value = ''
          } else {
            this.input[f].value = this.input[f].default
          }
        }
      }
    },

    name: 'Users-create'
  }
</script>
