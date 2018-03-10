/* global $ */
import swal from 'sweetalert2'

$('.manips_btn').on('click', function (e) {
  e.preventDefault()

  let $this = $(this)
  let data = $this.data('content')
  let title = $this.attr('title')
  let html = '<table class="table table-striped table-hover">'

  for (let i in data) {
    let d = data[i]
    html += `<tr><td class="font-bold">${d.name}</td><td>${d.args}</td></tr>`
  }

  html += '</table>'

  swal({
    title,
    html,
    type: 'info'
  })
})
