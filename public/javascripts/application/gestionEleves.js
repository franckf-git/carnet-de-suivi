/* Ajout eleve */
const buttonAddEleve = document.querySelectorAll('.button-add-eleve')
const modalAddEleve = document.querySelector('.modal-add-eleve')
buttonAddEleve.forEach(button => {
  button.addEventListener('click', () => modalAddEleve.classList.add('is-active'))
})

/* Edition eleve existant */

// affichage de la modal pour editer un eleve
const ligneEleves = document.querySelectorAll('.box-eleve')
ligneEleves.forEach(ligneEleve => {
  ligneEleve.addEventListener('click', () => {
    const idEleve = ligneEleve.getAttribute('id')
    const modal = document.getElementById(`modal-eleve_${idEleve}`)
    modal.classList.add('is-active')
  })
})

// vérification en temps réel de la longueur du nom
const champsEleves = document.querySelectorAll('.input-eleve')
const alertsNom = document.querySelectorAll('.alert-nom')
const buttonSaveEleve = document.querySelectorAll('.button-save-eleve')

champsEleves.forEach(element => {
  element.addEventListener('keyup', () => {
    if (element.value.length < 3 || element.value.length > 32) {
      alertsNom.forEach(item => item.classList.remove('is-hidden'))
      buttonSaveEleve.forEach(item => item.setAttribute('disabled', true))
    } else {
      alertsNom.forEach(item => item.classList.add('is-hidden'))
      buttonSaveEleve.forEach(item => item.removeAttribute('disabled', true))
    }
  })
})
