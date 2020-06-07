/* Affichage des observations par Domaines */
const domaines = document.querySelectorAll('.domaine')

const filtrageDomaines = document.querySelectorAll('.filtrage-domaine')
filtrageDomaines.forEach(filtrageDomaine => {
  filtrageDomaine.addEventListener('click', () => {
    filtrageDomaines.forEach(filtrageDomaine => filtrageDomaine.parentElement.classList.remove('is-active'))
    filtrageDomaine.parentElement.classList.add('is-active')
    affichageParDomaine(filtrageDomaine.id)
  })
})
const affichageParDomaine = (id) => {
  domaines.forEach((domaine) => {
    const panels = document.querySelectorAll('.panel')
    const accordions = document.querySelectorAll('.accordion')
    panels.forEach(panel => panel.style.display = 'none')
    accordions.forEach(ligne => {
      ligne.classList.remove('has-background-primary')
      ligne.classList.remove('has-text-white')
    })
    domaine.parentElement.previousElementSibling.classList.add('is-hidden')
    if (domaine.id === id || id === '0') {
      domaine.parentElement.previousElementSibling.classList.remove('is-hidden')
    }
  })
}

/* affectation des criteres aux evaluations */
const evaluations = document.querySelectorAll('.evaluation')
const criteres = document.querySelectorAll('.critere')
evaluations.forEach(evaluation => {
  criteres.forEach(critere => {
    if (critere.id === evaluation.id) {
      const couleur = critere.getAttribute('data-value')
      evaluation.classList.add(couleur)
      evaluation.innerHTML = critere.innerHTML
    }
  })
})

/* affichage lisible des dates */
const observationDates = document.querySelectorAll('.observation-date')
observationDates.forEach(observationDate => {
  const dateFormatMoment = moment.utc(observationDate.innerHTML).locale('fr').add(2, 'hours').calendar()
  observationDate.innerHTML = dateFormatMoment
})
