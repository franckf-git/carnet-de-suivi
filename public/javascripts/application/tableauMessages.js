/* affichage lisible des dates */
const observationDates = document.querySelectorAll('.message-date')
observationDates.forEach(observationDate => {
  const dateFormatMoment = moment.utc(observationDate.innerHTML).locale('fr').add(2, 'hours').calendar()
  observationDate.innerHTML = dateFormatMoment
})
