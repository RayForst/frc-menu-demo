import ScrollMagic from 'scrollmagic'

const $header = $('.header')
const controller = new ScrollMagic.Controller()
const getSizing = () => {
  const windowWidth = window.innerWidth || window.clientWidth || window.clientWidth
  let result

  if (windowWidth >= 1920) {
    result = {
      open: ['49px', '73px', '176px'],
      compact: ['6px', '12px', '88px']
    }
  } else if (windowWidth > 1280 && windowWidth < 1920) {
    result = {
      open: ['49px', '57px', '176px'],
      compact: ['6px', '12px', '88px']
    }
  } else if (windowWidth > 1024 && windowWidth < 1280) {
    result = {
      open: ['41px', '33px', '176px'],
      compact: ['6px', '12px', '88px']
    }
  } else if (windowWidth > 768 && windowWidth < 1024) {
    result = {
      open: ['29px', '27px', '132px'],
      compact: ['17px', '15px', '88px']
    }
  } else {
    result = {
      open: ['25px', '23px', '132px'],
      compact: ['17px', '15px', '88px']
    }
  }
  return result
}
const updateBreakpoints = () => {
  const size = getSizing()

  const header = $('.header')
  const logo = $('.logo svg')
  const isClosed = $('.header').hasClass('header--compact')

  if (isClosed) {
    header.css('padding-top', size.compact[0])
    header.css('padding-bottom', size.compact[1])
    logo.css('width', size.compact[2])
  }
}

new ScrollMagic.Scene({
  offset: 1 // start this scene after scrolling for 50px
})
  .addTo(controller) // assign the scene to the controller
  .on('enter', () => {
    const size = getSizing()

    $header.addClass('header--compact')

    $header.find('.logo svg').animate(
      {
        width: size.compact[2]
      },
      400
    )

    $header.animate(
      {
        'padding-top': size.compact[0],
        'padding-bottom': size.compact[1]
      },
      400
    )
  })
  .on('leave', () => {
    $header.removeClass('header--compact')

    const size = getSizing()

    $header.find('.logo svg').animate(
      {
        width: size.open[2]
      },
      400
    )

    $header.animate(
      {
        'padding-top': size.open[0],
        'padding-bottom': size.open[1]
      },
      400
    )
  })

window.addEventListener('resize', updateBreakpoints)
