/* global $ */

import axios from 'axios'
import swal from 'sweetalert2'
import { alertSystemError, translate } from '../helpers'

$(document).on('click', '.clear-cache', function (e) {
  e.preventDefault()

  axios
    .post('/admin/settings/clearcache', { _method: 'POST' })
    .then((r) => {
      swal({ title: translate('alerts.success'), html: translate('alerts.cache_cleared'), type: 'success' })
    })
    .catch((e) => {
      alertSystemError(e)
    })
})
