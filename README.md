# carnet-de-suivi

Ce dépôt abrite le code pour l'application d'évaluation en ligne des élèves de Cycle 1 [carnet-de-suivi.net](carnet-de-suivi.net).

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