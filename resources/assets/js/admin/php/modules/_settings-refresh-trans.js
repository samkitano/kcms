/* global $ */

import axios from 'axios'
import swal from 'sweetalert2'
import { translate } from './_translate'
import { alertSystemError } from '../helpers'

$(document).on('click', '.refresh-translations', function (e) {
  e.preventDefault()

  axios
    .post('/admin/settings/trans', { _method: 'POST' })
    .then((r) => {
      swal({ title: translate('alerts.success'), html: translate(`alerts.translations_${r.data}`), type: 'success' })
    })
    .catch((e) => {
      alertSystemError(e)
    })
})
