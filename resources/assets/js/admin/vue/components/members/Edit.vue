<template>
    <transition name="fade">
        <div class="container mx-auto" v-if="loaded(input)">
            <page-title :back="parent" :title="this.translate(`${resource}.profile`)"/>

            <div>
                <btn :text="showCancelButtonText"
                     @click="showEdit"/>

                <btn color="red"
                     :text="this.translate('actions.delete')"
                     v-if="canDelete"
                     @click="deleteUser"/>
            </div>

            <profile v-if="showProfile" :markup="profile"/>

            <zoom-y-transition>
                <section v-if="showForm" class="max-w-md pb-4 px-4 mx-auto">
                    <form class="form">
                        <alert type="info" :msg="infoMsg" close/>

                        <div class="form-block">
                            <template v-for="(field, f) in input">
                                <div class="mb-4" v-if="field.tag === 'input'">
                                    <label class="label"
                                           :for="f"
                                           v-show="showPwField(f)"
                                           >{{ field.label }}</label
                                    >
                                    <k-input :id="f"
                                             :ref="f"
                                             :name="f"
                                             :title="field.label"
                                             :type="field.type"
                                             :val="input[f].value"
                                             v-show="showPwField(f)"
                                             @change="changeModel"/>

                                    <p class="text-red text-xs italic" v-html="input[f].help"/>
                                </div>
                            </template>

                            <div v-if="hasPassword">
                                <btn :disabled="working"
                                     :text="this.translate('actions.change_password')"
                                     v-if="!showPw"
                                     @click="showPw = !showPw"/>
                            </div>
                        </div>

                        <div class="clearfix">
                            <btn type="submit"
                                 :disabled="working || !changedForm"
                                 :text="this.translate('actions.update')"
                                 @click="onSubmit"/>
                        </div>
                    </form>
                </section>
            </zoom-y-transition>
        </div>
    </transition>
</template>

<script>
  import alert from '../_partials/alert'
  import axios from 'axios'
  import btn from '../_partials/button'
  import kInput from '../_partials/input'
  import pageTitle from '../_partials/page-title'
  import profile from '../_partials/profile'
  import { head } from 'lodash'
  import { mapActions } from 'vuex'
  import { ZoomYTransition } from 'vue2-transitions'

  export default {
    beforeMount () {
      this.fetchData()
    },

    components: {
      pageTitle,
      alert,
      btn,
      kInput,
      profile,
      ZoomYTransition
    },

    computed: {
      admin () {
        return this.$store.state.admin
      },
      canDelete () {
        return this.admin.super_admin && this.admin.id !== parseInt(this.$route.params.id)
      },
      endpoint () {
        return `${this.$route.meta.endpoint.url}/${this.$route.params.id}/edit`
      },
      hasPassword () {
        return this.input.hasOwnProperty('password')
      },
      infoMsg () {
        return `<span class="px-1 text-grey">${this.translate('alerts.gravatar_info')}</span>
            <a class="text-teal underline hover:text-teal-darker"
               target="_blank"
               href="https://gravatar.com"
               title="gravatar.com">gravatar.com</a>`
      },
      parent () {
        return this.$route.meta.parent
      },
      payload () {
        let payload = { _method: 'PATCH' }

        for (let i in  this.input) {
          if (this.input.hasOwnProperty(i)) {
            if (this.$store.state.currentProfileOriginalData[i] !== this.input[i].value) {
              payload[i] = this.input[i].value
            }
          }
        }

        return payload
      },
      postTo () {
        return `${this.$route.meta.endpoint.url}/${this.$route.params.id}`
      },
      showCancelButtonText () {
        return this.showForm ? this.translate('actions.show') : this.translate('actions.edit')
      }
    },

    data () {
      return {
        changedForm: false,
        input: {},
        resource: '',
        showForm: false,
        showProfile: true,
        showPw: false,
        profile: '',
        working: false
      }
    },

    methods: Object.assign({}, mapActions([
      'setOriginalProfile'
    ]), {
      alertDone (msg = null) {
        window.scroll(0, 0)

        if (!msg) {
          let fields = this.payload
          delete fields._method
          fields = fields.join(', ')
          msg = this.translate('alerts.updated', {fields})
        }
        this.working = false
        this.$swal({
          type: msg ? 'warning' : 'success',
          text: msg
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
        this.changedForm = true
        this.input[data.event.target.id].value = data.value
      },
      deleteUser () {
        this
          .$swal({
            title: this.translate('alerts.confirm'),
            text: this.translate('alerts.confirm_delete', {resource: this.translate('admin'), id: this.$route.params.id }),
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: this.translate('actions.cancel'),
            reverseButtons: true
          })
          .then((willDelete) => {
            if (willDelete.value) {
              let payload = this.payload

              payload._method = 'DELETE'

              axios
                .post(this.postTo, payload)
                .then((r) => {
                  this
                    .$swal(
                      this.translate('alerts.success'),
                      this.translate(
                        'alerts.deleted',
                        { resource: this.translate('admin'), id: this.$route.params.id}),
                      'success'
                    )
                    .then(() => this.$router.push({ path: this.parent }))
                })
                .catch((e) => {
                  this.alertSystemError(e)
                })
            }
          })
      },
      fetchData () {
        axios
          .get(this.endpoint)
          .then((r) => {
            let d = r.data

            this.input = d.input
            this.profile = d.profile
            this.resource = d.resource
            this.setOriginalProfile(d.input)
          })
          .catch((e) => {
            this.alertSystemError(e)
          })
      },
      onSubmit () {
        this.working = true
        this.resetErrors()
        let warning = false

        axios
          .post(this.postTo, this.payload)
          .then((r) => {
            if (r.data.input) {
              this.$set.input = r.data.input
              this.setOriginalProfile(r.data.input)
            } else {
              this.alertDone(this.translate('alerts.nothing_updated'))
            }

            if (r.data.info) {
              this.alertDone(r.data.info)
            }

            this.alertDone(warning)
          })
          .catch((e) => {
            console.log(e)
            if (e.response.status === 422) {
              this.assignErrors(e.response.data.errors)
            } else {
              this.working = false
              this.alertSystemError(e)
            }
          })
      },
      resetForm () {
        for (let i in  this.input) {
          if (this.input.hasOwnProperty(i)) {
            this.input[i].value = this.$store.state.currentProfileOriginalData[i]
            this.input[i].state = ''
            this.input[i].help = ''
          }
        }

        this.showPw = false
        this.changedForm = false
      },
      resetErrors () {
        for (let i in  this.input) {
          if (this.input.hasOwnProperty(i)) {
            this.input[i].state = ''
            this.input[i].help = ''
          }
        }
      },
      showEdit () {
        if (this.showProfile) {
          this.showProfile = false

          setTimeout(() => { this.showForm = true }, 300)

          return false
        }

        if (this.showForm) {
          this.resetForm()
          this.showForm = false

          setTimeout(() => { this.showProfile = true }, 300)

          return false
        }
      },
      showPwField (f) {
        return f === 'password' || f === 'password_confirmation' ? this.showPw : true
      }
    }),

    name: "Users-edit",

    watch: {
      'input.password.value' (val) {
        // prevent auto-complete from changing PW when updating other fields
        if (val !== '********' && !this.showPw) {
          this.input.password.value = '********'
        }
      }
    }
  }
</script>
