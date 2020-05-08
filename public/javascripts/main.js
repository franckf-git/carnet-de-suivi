import { acceptationCGU } from './core/acceptationCGU.js'
import { aideEnPage } from './core/aideEnPage.js'
import { burgerMobile } from './core/burgerMobile.js'
import { modals } from './core/modals.js'
import { envoiInfosAnomyniseesSurUtilisation } from './core/statistiques.js'
import { fermetureNotifs } from './core/fermetureNotifs.js'
import { formulaireTitreObservable } from './application/formulaireTitreObservable.js'
import { gestionEleves } from './application/gestionEleves.js'
import { ouvertureAccordions } from './application/ouvertureAccordions.js'
import { retourEnHaut } from './core/retourEnHaut.js'

acceptationCGU()
aideEnPage()
burgerMobile()
modals()
// envoiInfosAnomyniseesSurUtilisation()
fermetureNotifs()
formulaireTitreObservable()
gestionEleves()
ouvertureAccordions()
retourEnHaut()
