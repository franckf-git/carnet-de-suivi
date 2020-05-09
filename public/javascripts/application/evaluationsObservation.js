export function evaluationsObservation() {
    const boxEleves = document.querySelectorAll('.box-eleveEval')
    const modals = document.querySelectorAll('.modal')
    const precedents = document.querySelectorAll('.precedent')
    const suivants = document.querySelectorAll('.suivant')
    const termines = document.querySelectorAll('.terminee')

    boxEleves.forEach((boxEleve, index) => {
        boxEleve.addEventListener('click', () => {
            ouvrirModalPour(index)
        })
    })

    const ouvrirModalPour = (index) => {
        modals.forEach((modal) => {
            modal.classList.remove('is-active')
        })
        affichageDesBouttonsSelonPosition(index)
        modals[index].classList.add('is-active')
    }

    suivants.forEach((suivant, index) => suivant.addEventListener('click', () => {
        const modalSuivante = index + 1
        ouvrirModalPour(modalSuivante)
    }))

    precedents.forEach((precedent, index) => precedent.addEventListener('click', () => {
        const modalPrecedente = index - 1
        ouvrirModalPour(modalPrecedente)
    }))

    const affichageDesBouttonsSelonPosition = (index) => {
        if (index === 0) {
            precedents.forEach((precedent) => precedent.classList.add('is-invisible'))
        } else {
            precedents.forEach((precedent) => precedent.classList.remove('is-invisible'))
        }
        if (index === boxEleves.length - 1) {
            suivants.forEach((suivant) => suivant.classList.add('is-hidden'))
            termines.forEach((terminee) => terminee.classList.remove('is-hidden'))
        } else {
            suivants.forEach((suivant) => suivant.classList.remove('is-hidden'))
            termines.forEach((terminee) => terminee.classList.add('is-hidden'))
        }
    }
}
