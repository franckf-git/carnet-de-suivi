const formulaireTitreObservable = () => {
    /* Envoi du titre de l activité et du choix du domaine */
    const bouttonsDomaine = document.querySelectorAll('#domaine')
    const champsTitre = document.querySelector('#champsTitre')
    const alerteLongeur = document.querySelector('#alerteLongeur')

    if (bouttonsDomaine && champsTitre && alerteLongeur) {
        bouttonsDomaine.forEach(bouttonDomaine => {
            bouttonDomaine.addEventListener('click', () => {
                const idDomaine = bouttonDomaine.getAttribute('data-value')
                document.querySelector('#valeurDomaine').value = idDomaine
                if (champsTitre.value.length > 2) {
                    document.forms.titreActivite.submit()
                }
            })
        })

        champsTitre.addEventListener('keyup', () => {
            if (champsTitre.value.length < 3 || champsTitre.value.length > 40) {
                alerteLongeur.classList.remove('is-hidden')
            } else {
                alerteLongeur.classList.add('is-hidden')
            }
        })
    }
}

export default formulaireTitreObservable