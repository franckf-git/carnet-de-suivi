'use strict'
const {
    recuperationObjectifsParDomaine,
    recuperationObservationParId,
    recuperationAttenduParObservation,
    recuperationAttendusParObjectif
} = require('./../model')
const {
    recuperationAttendusPersoParObjectif,
    recuperationObservationsParAttendu,
    recuperationObservationsParAttenduPerso,
    recuperationObjectifParId,
    recuperationDomaineParId,
} = require('./model')

/* on descent la structure du référentiel vers les attendus */
exports.creationArborescenceCarnetParStructure = async () => {
    const domaines = await recuperationDomaineParId()
    const domaineArborescenceVersObservations = await Promise.all(descendreDansReferentielDomaine(domaines))
    return domaineArborescenceVersObservations
}

const descendreDansReferentielDomaine = (domaines) => domaines.map(async (domaine) => {
    const objectifsDuDomaine = await recuperationObjectifsParDomaine(domaine.id)

    const objectifs = await Promise.all(descendreDansReferentielObjectif(objectifsDuDomaine))
    const domaineETobjectifsETattendusETobservations = { ...domaine, objectifs }
    return domaineETobjectifsETattendusETobservations
})

const descendreDansReferentielObjectif = (objectifsDuDomaine) => objectifsDuDomaine.map(async (objectif) => {
    const attendusDelObjectif = await recuperationAttendusParObjectif(objectif.id)
    const attendus = await Promise.all(descendreDansReferentielAttendus(attendusDelObjectif))

    const attendusPersoDelObjectif = await recuperationAttendusPersoParObjectif(objectif.id)
    const attendusPerso = await Promise.all(descendreDansReferentielAttendusPerso(attendusPersoDelObjectif))

    const objectifsETattendusETattendusPersoETobservations = { ...objectif, attendus, attendusPerso }
    return objectifsETattendusETattendusPersoETobservations
})

const descendreDansReferentielAttendus = (attendusDelObjectif) => attendusDelObjectif.map(async (attendu) => {
    const observations = await recuperationObservationsParAttendu(attendu.id)
    const attendusETobservations = { ...attendu, observations }
    return attendusETobservations
})

const descendreDansReferentielAttendusPerso = (attendusPersoDelObjectif) => attendusPersoDelObjectif.map(async (attenduPerso) => {
    const observations = await recuperationObservationsParAttenduPerso(attenduPerso.id)
    const attendusPersoETobservations = { ...attenduPerso, observations }
    return attendusPersoETobservations
})

/* de l'évalution on remonte l'arborescence */
exports.creationArborescenceCarnetParEvaluation = async (evaluationsDelEleve) => {
    const elementArborescenceCarnet = await evaluationsDelEleve.map(async (evaluation) => {
        const idObservation = evaluation.idObservation
        const infosObservation = await recuperationObservationParId(idObservation)

        const infosAttendu = await recuperationAttenduParObservation(idObservation)

        const objectif = infosAttendu[0].idObjectif
        const infosObjectif = await recuperationObjectifParId(objectif)

        const domaine = infosObjectif[0].idDomaine
        const infosDomaine = await recuperationDomaineParId(domaine)

        const object = { domaine: infosDomaine[0], objectif: infosObjectif[0], attendu: infosAttendu[0], observation: infosObservation[0], evaluation: evaluation.idCritere }
        return object
    })
    const arborescenceCarnet = await Promise.all(elementArborescenceCarnet)
    return arborescenceCarnet
}
