export function aideEnPage() {
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
  if (document.querySelector('.aide-close')) {
    document.querySelector('.aide-close').addEventListener('click', () => document.querySelector('.modal-aide').classList.remove('is-active'))
  }
}
