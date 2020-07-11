export function acceptationCGU() {
  /* Fenetre d'information des cookies ET la laisser fermée si validée */
  const acceptationCGU = document.querySelector('.notification-cookie')
  const buttonCookie = document.querySelector('.button-cookie')
  const decodedCookie = decodeURIComponent(document.cookie)
  if (acceptationCGU && buttonCookie) {
    buttonCookie.addEventListener('click', () => {
      acceptationCGU.classList.add('is-hidden')
      document.cookie = 'acceptationCGU=1; SameSite=Strict'
    })
    if (decodedCookie.split('; ')
      .includes('acceptationCGU=1')) {
      acceptationCGU.classList.add('is-hidden')
    }
  }
}
