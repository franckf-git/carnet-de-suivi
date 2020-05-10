# carnet-de-suivi

Ce dépôt abrite le code pour l'application d'évaluation en ligne des élèves de Cycle 1 [carnet-de-suivi.net](carnet-de-suivi.net).

[Document de référence](https://eduscol.education.fr/cid97131/suivi-et-evaluation-a-l-ecole-maternelle.html)

```
git clone https://gitlab.com/franckf/carnet-de-suivi.git
cd carnet-de-suivi
cp config/index.js.example config/index.js
vim config/index.js
```

Lancer en utilisant le Dockerfile :

```
podman build --tag=carnet-de-suivi .
podman run --detach --interactive --tty --publish=5500:5500/tcp carnet-de-suivi
```

---

## Bugs (aka feature)
- [] les retours à la ligne ne sont pas pris en compte dans la description de l'activité
- [] titre activité : sanitize "<"

## Fonctionnalitées PMV

- [x] ajouter des élèves
- [x] créer une observation (référentiel)
- [x] créer une observation (champs libre)
- [] exporter le carnet de suivi par élève (pdf)

## Fonctionnalitées à venir

- [] message premiere fois avec tuto rapide
- [] sur l'évaluation des eleves, passez directement à la modal suivante une fois le critère choisi ?
- [] permettre de proposer des fonctionnalités par "karma"
- [] partie communautaire (forum ou message board interne)
- [] gestion des parents (invitation à créer un compte spécial ou envoi de mails ? lien pour PDF ?)
- [] interface parent simplifiée
- [] recherche de profs de la même école (par UAI ou code generé alétoirement)
- [] partager mes élèves à un prof
- [] voir et évaluer les élèves partagés avec moi (module séparé)
- [] transmettre des élèves désactivés à un collègue (changement de classe)
- [x] supprimer des élèves (préciser qu'il s'agit d'une desactivation le carnet est toujours disponible)
- [] supprimer des observations (ou les editer ?)
- [] import onde
- [] exporter le carnet de suivi des élèves supprimés
- [] exporter le carnet de suivi en mode parent / administration / tableau de bord
- [] exporter le carnet de suivi en mode économe (noir et blanc, sans photo)
- [] ajout des points de suivi
- [] les parents voient le dernier point de suivi par défaut
- [] intégration des points de suivis au carnet de suivi (option ou imposé ?)
- [] ajout de multimédia aux observations (photo, audio, video)
- [] ajout de photos aux domaines / sousdomaines
- [] tableau de bord classe (avec filtres domaines / sousdomaines)
- [] tableau de bord eleve (avec filtres domaines / sousdomaines)
- [] compte demo/test

## Todo technique

- [] mise en place de pm2 (multitreads)
- [] intégration avec nginx en reverse proxy
- [] pages statiques gérés par le serveur web
- [x] gestion des logs
- [] passage à mariadb
- [] tests unitaires
- [] api de maintenance/administration (dump, stats, changement de niveau de logs)
- [] application mobile
- [] refactorisation et normalisation du JS côté client
- [] repasser sur les ENV pour mettre l'application - production ready -