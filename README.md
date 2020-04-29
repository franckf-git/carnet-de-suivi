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

## Fonctionnalitées PMV

- [] ajouter des élèves
- [] créer une observation (référentiel)
- [] créer une observation (champs libre)
- [] exporter le carnet de suivi par élève (pdf)

## Fonctionnalitées à venir

- [] permettre de proposer des fonctionnalités par "karma"
- [] partie communautaire (forum ou message board interne)
- [] gestion des parents (invitation à créer un compte spécial ou envoi de mails ?)
- [] recherche de profs de la même école (par UAI ou code décidé en avance)
- [] partager mes élèves à un prof
- [] voir et évaluer les élèves partagés avec moi (module séparé)
- [] supprimer des élèves
- [] import onde
- [] exporter le carnet de suivi des élèves supprimés
- [] exporter le carnet de suivi en mode économe (noir et blanc, sans photo)
- [] ajout des points de suivi
- [] les parents voient le dernier point de suivi par défaut
- [] intégration des points de suivis au carnet de suivi (option ou imposé ?)
- [] ajout de multimédia aux observations (photo, audio, video)
- [] tableau de bord classe
- [] compte demo/test

## Todo technique

- [] mise en place de pm2 (multitreads)
- [] intégration avec nginx en reverse proxy
- [] pages statiques gérés par le serveur web
- [] gestion des logs
- [] passage à mariadb
- [] tests unitaires
- [] api de maintenance/administration (dump, stats, changement de niveau de logs)
- [] application mobile