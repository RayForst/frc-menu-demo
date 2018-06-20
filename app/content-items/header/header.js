import './burger'
import './fixed'

$('.header__link')
  .on('mouseenter', (e) => {
    const $that = $(e.currentTarget)

    $that
      .parent()
      .siblings()
      .find('.header__link')
      .removeClass('header__link--hover')
    $that.addClass('header__link--hover')
  })
  .on('mouseleave', () => {
    // const hovered = $('.header__link--hover')
    // console.log('mouseleave link', e.currentTarget)
    // const target = $('.e.currentTarget')
    // if (target.hasClass('header__submenu') || target.parents('.header__submenu').length) {
    //   console.log('zone')
    //   return
    // }
    // if (!hovered.hasClass('.header__link--active')) {
    //   hovered.removeClass('header__link--hover')
    //   $('.header__link--active').addClass('header__link--hover')
    // }
  })

$('.header__link-wrap').on('mouseleave', () => {
  const hovered = $('.header__link--hover')

  hovered.removeClass('header__link--hover')
  $('.header__link--active').addClass('header__link--hover')
})
