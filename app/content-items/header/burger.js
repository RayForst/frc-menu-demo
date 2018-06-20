const burger = $('.header__menu')
const $trigger = $('.header__burger-trigger')

const open = (e) => {
  e.stopPropagation()
  console.log('open', e.currentTarget)

  if (burger.hasClass('header__menu--open')) {
    closeOutside()
    return
  }

  $trigger.find('.hamburger-icon').addClass('hamburger-icon--open')
  burger.addClass('header__menu--open')
  $('body').addClass('fixed')
  $('body').on('click', closeOutside)
}

function close() {
  console.log('closing')
  $trigger.find('.hamburger-icon').removeClass('hamburger-icon--open')
  burger.removeClass('header__menu--open')
  $('body').removeClass('fixed')
  $('body').off('click', closeOutside)
}

function closeOutside(e = null) {
  const target = e ? $(e.target) : null

  if (
    !target ||
    (!target.hasClass('.header__menu') &&
      !target.closest('.header__menu, .header__burger-trigger').length)
  ) {
    close()
  }
}

$('.header__burger-trigger').on('click', open)
