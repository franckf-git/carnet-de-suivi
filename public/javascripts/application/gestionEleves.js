/* Ajout eleve */
const buttonAjouterEleve = document.querySelectorAll('.demanderAjoutEleve')
const formAjoutEleve = document.querySelector('#formAjoutEleve')
buttonAjouterEleve.forEach(button => {
  button.addEventListener('click', () => formAjoutEleve.classList.add('is-active'))
})

/* Edition eleve existant */

// affichage de la modal pour editer un eleve
const ligneEleves = document.querySelectorAll('.box-eleve')
ligneEleves.forEach(ligneEleve => {
  ligneEleve.addEventListener('click', () => {
    const idEleve = ligneEleve.getAttribute('id')
    const modal = document.getElementById(`modal-eleve ${idEleve}`)
    modal.classList.add('is-active')
  })
})

// vérification en temps réel de la longueur du nom
const champsEleves = document.querySelectorAll('#input-eleve')
const alertesNom = document.querySelectorAll('#alertenom')
const buttonsSauver = document.querySelectorAll('#buttonSauver')

champsEleves.forEach(element => {
  element.addEventListener('keyup', () => {
    if (element.value.length < 3 || element.value.length > 32) {
      alertesNom.forEach(item => item.classList.remove('is-hidden'))
      buttonsSauver.forEach(item => item.setAttribute('disabled', true))
    } else {
      alertesNom.forEach(item => item.classList.add('is-hidden'))
      buttonsSauver.forEach(item => item.removeAttribute('disabled', true))
    }
  })
})
