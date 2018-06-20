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
    const hovered = $('.header__link--hover')

    if (!hovered.hasClass('.header__link--active')) {
      hovered.removeClass('header__link--hover')

      $('.header__link--active').addClass('header__link--hover')
    }
  })

