export function burgerMobile() {
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
}
