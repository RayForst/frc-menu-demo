$('.accordeon__title').on('click', (e) => {
  const title = $(e.target)
  const content = title.next('.accordeon__content')
  const siblings = $('.accordeon__content')
  $('.accordeon__open').removeClass('accordeon__open')

  siblings.filter(':visible').slideUp()

  if (!content.is(':visible')) {
    content.slideDown()
    title.addClass('accordeon__open')
  }
})
