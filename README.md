# carnet-de-suivi

Ce dépôt abrite le code pour l'application d'évaluation en ligne des élèves de Cycle 1 [carnet-de-suivi.net](https://carnet-de-suivi.net).

[Document de référence](https://eduscol.education.fr/cid97131/suivi-et-evaluation-a-l-ecole-maternelle.html)

## Bugs (aka feature)
- [ ] les retours à la ligne ne sont pas pris en compte dans la description de l'activité
- [x] titre activité : sanitize "<"

## Fonctionnalitées PMV

- [x] ajouter des élèves
- [x] créer une observation (référentiel)
- [x] créer une observation (champs libre)
- [x] exporter le carnet de suivi par élève (pdf)

## Fonctionnalitées à venir

- [ ] message premiere fois avec tuto rapide
- [ ] sur l'évaluation des eleves, passez directement à la modal suivante une fois le critère choisi ?
- [x] permettre de proposer des fonctionnalités par "karma"
- [x] partie communautaire (forum ou message board interne)
- [ ] gestion des parents (invitation à créer un compte spécial ou envoi de mails ? lien pour PDF ?)
- [ ] interface parent simplifiée
- [ ] recherche de profs de la même école (par UAI ou code generé alétoirement)
- [ ] partager mes élèves à un prof
- [ ] voir et évaluer les élèves partagés avec moi (module séparé)
- [ ] transmettre des élèves désactivés à un collègue (changement de classe)
- [ ] désactiver tous mes élèves (changement de classe)
- [x] supprimer des élèves (préciser qu'il s'agit d'une desactivation le carnet est toujours disponible)
- [ ] supprimer des observations (ou les editer ?)
- [ ] import onde
- [x] exporter le carnet de suivi des élèves supprimés
- [ ] exporter le carnet de suivi en mode parent / administration / tableau de bord
- [ ] exporter le carnet de suivi en mode économe (noir et blanc, sans photo)
- [ ] ajout des points de suivi
- [ ] les parents voient le dernier point de suivi par défaut
- [ ] intégration des points de suivis au carnet de suivi (option ou imposé ?)
- [ ] ajout de multimédia aux observations (photo, audio, video)
- [ ] sur modal critère : trois grosses icones photo/micro/commentaires(optionnel avec alerte modifiable dans le carnet)
- [ ] carnet de suivi ajout de commentaires possible
- [ ] ajout de photos aux domaines / sousdomaines
- [ ] tableau de bord classe (avec filtres domaines / sousdomaines)
- [ ] tableau de bord eleve (avec filtres domaines / sousdomaines)
- [ ] compte demo/test

## Todo technique

- [ ] mise en place de pm2 (multitreads)
- [ ] intégration avec nginx en reverse proxy
- [ ] pages statiques gérés par le serveur web
- [x] gestion des logs
- [ ] passage à mariadb
- [ ] tests unitaires
- [ ] api de maintenance/administration (dump, stats, changement de niveau de logs)
- [ ] application mobile
- [x] refactorisation et normalisation du JS côté client
- [ ] repasser sur les ENV pour mettre l'application - production ready -
- [ ] Dans observationDomaine.ejs et carnetEleve.ejs, les domaines sont codés en dur - A refaire (texte court et image en base ?)

---

# Installation

1 - Prendre une instance Public Cloud chez OVH (nous conseillons fedora)

2 - Se connecter en ssh (après avoir fourni une clé ssh à OVH)

```bash
ssh fedora@XXX.XXX.XXX.XXX
```

3 - Installer un pare-feu et bloquer les entrées sauf pour ssh

```bash
sudo ufw enable
sudo ufw status verbose
# De base la configuration de OVH est correcte
# Mais on peut supprimer ces règles et les remplacer par les notres
sudo ufw default deny incoming
sudo ufw allow proto tcp from VOTRE_IP to any port 22
sudo ufw reload
```

4 - Installer les paquets nécessaires

```bash
sudo dnf install nodejs sqlite redis nginx git
sudo systemctl enable nginx
```

5 - Fortement recommandé : Certificat https avec LetsEncrypt

```bash
# installer le client certbot
sudo dnf install certbot-nginx
sudo vi /etc/nginx/nginx.conf
# changer server_name _ par votre domaine. ex : server_name  carnet-de-suivi.net www.carnet-de-suivi.net;
# tester la configuration
sudo nginx -t
# relancer le serveur et ouvrir les ports web
sudo systemctl reload nginx
sudo ufw allow proto tcp to any port 80
sudo ufw allow proto tcp to any port 443

# obtenir un certificat
# renseigner une adresse mail si demandé (la première fois)
sudo certbot --nginx -d carnet-de-suivi.net -d www.carnet-de-suivi.net
# vous pouvez tester le certificat sur https://www.ssllabs.com/ssltest/analyze.html?d=carnet%2dde%2dsuivi.net&latest
```

Le certificat dure 90 jours, il peut être renouvelé simplement avec :
```
sudo crontab -e
15 3 * * * /usr/bin/certbot renew --quiet
```

6 - Récupérer le code

```bash
git clone https://gitlab.com/franckf/carnet-de-suivi.git
cd carnet-de-suivi
npm install --production --save
npm audit fix
cp config/index.js.example config/index.js
vi config/index.js
# pour mettre une clé de session secrète et ajouter les informations du compte mail
```

7 - Mise en production

```bash
sudo npm install pm2 --global
redis-server & pm2 start ~/carnet-de-suivi/bin/www
```

On désactive selinux pour permettre le proxy node/nginx (manque de sécurité - à optimiser)
```bash
sudo sed -i 's/SELINUX=.*/SELINUX=permissive/' /etc/selinux/config
sudo systemctl restart selinux-basics.service
```

```bash
sudo nginx -t
sudo vi /etc/nginx/nginx.conf
```

```config
server {
...
    location / {
        proxy_pass http://localhost:5500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
```

```bash
sudo systemctl restart nginx
```

X - Mettre à jour le code

```bash
cd carnet-de-suivi
git pull
npm update
```
---
