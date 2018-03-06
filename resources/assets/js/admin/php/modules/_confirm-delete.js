/* global $ */
'use strict'

import axios from 'axios'
import swal from 'sweetalert2'
import { translate } from './_translate'
import { alertSystemError } from '../helpers'

// Confirm Delete profile
$(document).on('click', '.delete-resource', function () {
  let $this = $(this)
  let id = $this.data('id')
  let endpoint = $this.data('action')
  let redir = $this.data('redirect')
  let resource = $this.data('resource')

  swal({
    title: translate('alerts.confirm'),
    html: translate('alerts.confirm_delete', { resource, id }),
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: translate('buttons.cancel'),
    reverseButtons: true
  })
    .then((willDelete) => {
      if (willDelete.value) {
        let payload = {}

        payload._method = 'DELETE'

        axios
          .post(endpoint, payload)
          .then((r) => {
            swal(
              translate('alerts.success'),
              translate('alerts.deleted', { resource, id }),
              'success'
            )
              .then(() => window.location.replace(redir))
          })
          .catch((e) => {
            alertSystemError(e)
          })
      }
    })
})
