const fermetureNotifs = () => {
    /* Fermeture des notifications */
    const allDeleteNotif = document.querySelectorAll('.delete-notif')
    allDeleteNotif.forEach(element => {
        element.parentNode.addEventListener('click', () => element.parentNode.style.display = 'none')
    })
}

export default fermetureNotifs
