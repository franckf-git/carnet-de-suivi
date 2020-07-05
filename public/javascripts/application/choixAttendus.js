/* Envoi de l id de l attendu avec un formulaire caché */
const attendusReferentiel = document.querySelectorAll('.attenduReferentiel')
attendusReferentiel.forEach(attendu => {
  attendu.addEventListener('click', () => {
    document.querySelector('.choixAttendu').value = attendu.id
    document.forms.choixAttendus.submit()
  })
})
