'use strict'

// Edit profile
$(document).on('click', '.edit-profile', function () {
  let $this = $(this)
  let $profile = $('.user-profile')
  let $form = $('.profile-form')

  if ($profile.css('display') === 'none') {
    $profile.show(300)
    $this.text($this.data('edit'))
    setTimeout(() => {
      $form.hide(300)
    }, 300)
  } else {
    $profile.hide(300)
    $this.text($this.data('cancel'))
    setTimeout(() => {
      $form.show(300)
    }, 300)
  }
})
