const accordions = document.querySelectorAll('.accordion')
const panels = document.querySelectorAll('.panel')
accordions.forEach(ligneObjectif => {
  ligneObjectif.addEventListener('click', () => {
    panels.forEach(panel => {
      panel.style.display = 'none'
    })
    accordions.forEach(ligne => {
      ligne.classList.add('has-background-grey-lighter')
      ligne.classList.remove('has-background-primary')
      ligne.classList.remove('has-text-white')
    })

    ligneObjectif.classList.remove('has-background-grey-lighter')
    ligneObjectif.classList.add('has-background-primary')
    ligneObjectif.classList.add('has-text-white')

    const panel = ligneObjectif.nextElementSibling
    if (panel.style.display === 'block') {
      panel.style.display = 'none'
    } else {
      panel.style.display = 'block'
    }
  })
})

/* Envoi de l id de l attendu avec un formulaire caché */
const attenduRecommande = document.querySelectorAll('#attenduReferentiel')
attenduRecommande.forEach(element => {
  element.addEventListener('click', () => {
    document.querySelector('#choixAttendu').value = element.getAttribute('data-value')
    document.forms.choixAttendus.submit()
  })
})