/* Envoi du titre de l activité et du choix du domaine */
const cardsDomaine = document.querySelectorAll('.domaine')
const inputActivity = document.querySelector('.input-activity')
const alertLength = document.querySelector('.alert-length')

if (cardsDomaine && inputActivity && alertLength) {
  cardsDomaine.forEach(cardDomaine => {
    cardDomaine.addEventListener('click', () => {
      const idDomaine = cardDomaine.id
      document.querySelector('#idDomaine').value = idDomaine
      if (inputActivity.value.length > 2 && inputActivity.value.length <= 40) {
        document.forms.titreActivite.submit()
      }
    })
  })

  inputActivity.addEventListener('keyup', () => {
    if (inputActivity.value.length < 3 || inputActivity.value.length > 40) {
      alertLength.classList.remove('is-hidden')
    } else {
      alertLength.classList.add('is-hidden')
    }
  })
}
