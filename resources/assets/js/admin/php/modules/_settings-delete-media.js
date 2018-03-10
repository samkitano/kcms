/* global $ */

import axios from 'axios'
import swal from 'sweetalert2'
import { translate } from './_translate'
import { alertSystemError } from '../helpers'

$(document).on('click', '.clear-media', function (e) {
  e.preventDefault()

  axios
    .post('/admin/settings/delstorage', { _method: 'POST' })
    .then((r) => {
      swal({ title: translate('alerts.success'), html: translate('alerts.media_cleared'), type: 'success' })
    })
    .catch((e) => {
      alertSystemError(e)
    })
})
