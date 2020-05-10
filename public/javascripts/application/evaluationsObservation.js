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

    /* Envoie des evaluations à une API securisée */
    const criteres = document.querySelectorAll('.critere')
    criteres.forEach(critere => { critere.addEventListener('click', () => envoiAPIenregistrementEvaluations(critere)) })

    const envoiAPIenregistrementEvaluations = async (critere) => {
        try {
            const idCritere = critere.id
            const idEleve = critere.parentNode.parentNode.id
            const idObservation = document.querySelector('.idObservation').id
            const evaluationFaite = { idObservation, idEleve, idCritere }
            const noteModal = critere.parentNode.parentNode.childNodes[13] // pas très propre - les suggestions sont bienvenues
            const noteModalmaj = critere.parentNode.parentNode.childNodes[15]
            const fondEleve = document.getElementById(`box_${idEleve}`)
            const noteFondEleve = fondEleve.childNodes[1]

            await critere.classList.add('is-loading')
            const poster = await fetch('/observation/enregistrementEvaluations', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(evaluationFaite)
            })
            if (poster.ok) {
                const retourServeur = await poster.json()
                await critere.classList.remove('is-loading')

                noteModal.classList.remove('is-invisible')
                fondEleve.classList.remove('has-background-grey-lighter')
                noteFondEleve.classList.remove('is-hidden')
                if (retourServeur.message === 'maj') {
                    noteModalmaj.classList.remove('is-invisible')
                }
            } else {
                critere.classList.add('is-danger')
            }
        } catch (error) {
            console.error(error)
            critere.classList.add('is-danger')
        }
    }
}
