'use strict'
const {
    recuperationObjectifsParDomaine,
    recuperationAttendusParObjectif,
    recuperationAttendusPersoParObjectif,
    recuperationDomaines,
    recuperationObservationsParAttendu,
    recuperationObservationsParAttenduPerso
} = require('./../model')

exports.creationArborescenceCarnetParStructure = async () => {
    const domaines = await recuperationDomaines()
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
