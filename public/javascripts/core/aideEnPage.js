export function aideEnPage() {
  /* affichage des aides dans la page */
  const buttonHelp = document.querySelectorAll('.button-help')
  buttonHelp.forEach(element => {
    element.addEventListener('click', async () => {
      const intitule = element.getAttribute('data-value')
      const textHelp = await recuperationAPIaide(intitule)
      const insertPage = document.querySelector('.content-help')
      const modalHelp = document.querySelector('.modal-help')
      modalHelp.classList.add('is-active')
      insertPage.innerHTML = textHelp
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
  if (document.querySelector('.help-close')) {
    document.querySelector('.help-close').addEventListener('click', () => document.querySelector('.modal-help').classList.remove('is-active'))
  }
}
