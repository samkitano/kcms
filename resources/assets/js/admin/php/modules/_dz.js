/* global $ */
'use strict'

let Dropzone = require('dropzone')

Dropzone.autoDiscover = false
Dropzone.options.mediaUpload = {
  paramName: 'file',
  parallelUploads: 1,
  maxFilesize: 2
}

let hasDz = document.getElementById('mediaUpload')

if (hasDz) {
  let dz = new Dropzone('#mediaUpload')

  dz.on('success', function (e, res) {
    if (this.getQueuedFiles().length === 0 && res.hasOwnProperty('redirect')) {
      setTimeout(() => {
        window.location = res.redirect
      }, 1000)
    }
  })
}

$('#dz_album').on('select2:selecting', function (e) {
  $('#album').val(e.params.args.data.id)
})
