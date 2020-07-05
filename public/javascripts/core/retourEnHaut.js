export function retourEnHaut() {
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
}
