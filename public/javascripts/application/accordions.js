const accordions = document.querySelectorAll('.accordion')
const panels = document.querySelectorAll('.panel')
accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    panels.forEach(panel => {
      panel.style.display = 'none'
    })
    accordions.forEach(ligne => {
      ligne.classList.add('has-background-grey-lighter')
      ligne.classList.remove('has-background-primary')
      ligne.classList.remove('has-text-white')
    })

    accordion.classList.remove('has-background-grey-lighter')
    accordion.classList.add('has-background-primary')
    accordion.classList.add('has-text-white')

    const panel = accordion.nextElementSibling
    if (panel.style.display === 'block') {
      panel.style.display = 'none'
    } else {
      panel.style.display = 'block'
    }
  })
})
