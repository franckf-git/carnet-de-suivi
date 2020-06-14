const impression = document.querySelector('.print')
impression.addEventListener('click', () => {
  document.querySelector('.footer').classList.add('is-hidden')
  document.querySelector('.navbar').classList.add('is-hidden')
  document.querySelector('.tabs').classList.add('is-hidden')
  document.querySelector('.buttons-export').classList.add('is-hidden')
  document.querySelector('.button-backtotop').classList.add('is-hidden')

  const panels = document.querySelectorAll('.panel')
  panels.forEach(panel => panel.style.display = 'block')
  const accordions = document.querySelectorAll('.accordion')
  accordions.forEach(accordion => accordion.classList.remove('is-hidden'))
  accordions.forEach(accordion => {
    accordion.classList.remove('is-hidden')
    accordion.classList.add('has-background-grey-lighter')
    accordion.classList.remove('has-background-primary')
    accordion.classList.remove('has-text-white')
  })
  window.print()
})

window.onafterprint = (event) => {
  location.reload()
}
