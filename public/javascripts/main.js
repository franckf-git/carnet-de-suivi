import envoiInfosAnomyniseesSurUtilisation from './statistiques.js'
import controllerModals from './modals.js'

controllerModals()

/* Fenetre d'information des cookies ET la laisser fermée si validée */
const acceptationCGU = document.querySelector('.notification-cookie')
const buttonCookie = document.querySelector('.button-cookie')
const decodedCookie = decodeURIComponent(document.cookie)
buttonCookie.addEventListener('click', () => {
  acceptationCGU.classList.add('is-hidden')
  document.cookie = 'acceptationCGU=1'
})
if (decodedCookie.split('; ')
  .includes('acceptationCGU=1')) {
  acceptationCGU.classList.add('is-hidden')
}

/* Menu en mobile */
const burger = document.querySelector('.burger')
const menuDeroulant = () => {
  document.querySelector('.burger')
    .classList.toggle('is-active')
  document.querySelector('.burger-dropdown')
    .classList.toggle('is-active')
  document.querySelector('.navbar-start')
    .classList.toggle('is-hidden')
  document.querySelector('.navbar-end')
    .classList.toggle('is-hidden')
}
burger.addEventListener('click', menuDeroulant)

/* Boutton retour en haut apparait au scroll */
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.button-backtotop')
      .style.display = 'block'
  } else {
    document.querySelector('.button-backtotop')
      .style.display = 'none'
  }
}

/* Fermeture des notifications */
const allDeleteNotif = document.querySelectorAll('.delete-notif')
allDeleteNotif.forEach(element => {
  element.parentNode.addEventListener('click', () => element.parentNode.style.display = 'none')
})

/* affichage des aides dans la page */
const aideButtons = document.querySelectorAll('#aide')
aideButtons.forEach(element => {
  element.addEventListener('click', async () => {
    const intitule = element.getAttribute('data-value')
    const texteAide = await recuperationAPIaide(intitule)
    const insertPage = document.querySelector('#texteAide')
    const modalAide = document.querySelector('.modal-aide')
    modalAide.classList.add('is-active')
    insertPage.innerHTML = texteAide
  })
})

const recuperationAPIaide = async (intitule) => {
  try {
    const recuperation = await fetch(`/aide/${intitule}`)
    if (recuperation.ok) {
      const data = await recuperation.json()
      return data
    }
  } catch (error) {
    console.error(error)
    return 'Il semble y avoir eu une erreur ou cette aide n\'est pas encore disponible.'
  }
}

/* statistiques sur l'utilisation du site */
/*
const listCookies = document.cookie.split('; ')
const cookiesSansValeurs = []
listCookies.forEach(element => {
  const search = element.split('=')[0]
  cookiesSansValeurs.push(search)
})
if (!cookiesSansValeurs.includes('uuidStatsAnonym')) {
  const uuid = Math.random()
    .toString(16)
    .slice(2)
  document.cookie = `uuidStatsAnonym=${uuid}`
}
envoiInfosAnomyniseesSurUtilisation()
*/

/* Gestion des eleves */

/* Ajout eleve */

const buttonAjouterEleve = document.querySelectorAll('.demanderAjoutEleve')

buttonAjouterEleve.forEach(button => {
  button.addEventListener('click', () => ajouterChampsNouvelEleve())
})

const ajouterChampsNouvelEleve = () => {
  const emplacementPourFormulaire = document.querySelector('#formAjoutEleve')
  const formulaireNouvelEleve = document.createElement('div')
  emplacementPourFormulaire.after(formulaireNouvelEleve)
  formulaireNouvelEleve.setAttribute('class', 'box has-background-info')
  formulaireNouvelEleve.innerHTML = `
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" type="text" placeholder="Prénom de l'élève">
      </p>
      <p class="control">
        <a class="button is-light">
          Ajouter
        </a>
      </p>
    </div>
`
}

/* Edition eleve existant */

const champsEleves = document.querySelectorAll('.input')

champsEleves.forEach(champsEleve => {
  champsEleve.addEventListener('focus', () => {
    const boxEleve = champsEleve.parentElement.parentElement.parentElement
    const ligneEleve = champsEleve.parentElement.parentElement
    boxEleve.classList.remove('has-background-grey-lighter')
    boxEleve.classList.add('has-background-info')
    ajouterBoutonsEditionEleve(ligneEleve)
  })
  champsEleve.addEventListener('focusout', () => {
    const boxEleve = champsEleve.parentElement.parentElement.parentElement
    boxEleve.classList.add('has-background-grey-lighter')
    boxEleve.classList.remove('has-background-info')
    retirerBoutonsEditionEleve()
  })
})

const ajouterBoutonsEditionEleve = (champs) => {
  const boutons = document.createElement('p')
  champs.appendChild(boutons)
  boutons.setAttribute('class', 'control')
  boutons.setAttribute('id', 'boutonsEditionEleve')
  boutons.innerHTML = `
  <a class="button is-warning is-hidden-mobile">
  Sauver
  </a>
  <a class="button is-danger is-hidden-mobile">
  Désactiver
  </a>
  <a class="button is-warning is-hidden-tablet">
  S
  </a>
  <a class="button is-danger is-hidden-tablet">
  D
  </a>
`
}

const retirerBoutonsEditionEleve = () => {
  const boutonsEditionEleve = document.querySelector('#boutonsEditionEleve')
  boutonsEditionEleve.remove()
}
