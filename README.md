# carnet-de-suivi

**Le développement de carnet-de-suivi est actuellement à l'arrêt. En effet produire une application vraiment utile pour les enseignants prend plus de temps que prévu, et il n'est pas possible de continuer dans l'immédiat.**

---

Ce dépôt abrite le code pour l'application d'évaluation en ligne des élèves de Cycle 1 [carnet-de-suivi.net](https://carnet-de-suivi.net).

[Document de référence](https://eduscol.education.fr/cid97131/suivi-et-evaluation-a-l-ecole-maternelle.html)


> Pour le suivi des fonctionnalités voir : https://gitlab.com/franckf/carnet-de-suivi/-/boards/1888042

---

# Installation

1 - Prendre une instance Public Cloud chez OVH (nous conseillons fedora)

2 - Se connecter en ssh (après avoir fourni une clé ssh à OVH)

```bash
ssh fedora@XXX.XXX.XXX.XXX
sudo dnf upgrade
reboot
```

3 - Installer un pare-feu et bloquer les entrées sauf pour ssh

```bash
sudo dnf install ufw
sudo ufw enable
sudo ufw status verbose
# De base la configuration de OVH est correcte
# Mais on peut supprimer ces règles et les remplacer par les notres
sudo ufw default deny incoming
sudo ufw allow proto tcp from XXX.VOTRE_IP.XXX to any port 22
sudo ufw reload
```

4 - Installer les paquets nécessaires

```bash
sudo dnf install nodejs sqlite redis nginx git
sudo systemctl enable nginx
sudo systemctl start nginx
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
sudo mv /home/fedora/carnet-de-suivi/nodeserver.service /etc/systemd/system/nodeserver.service
sudo systemctl daemon-reload
sudo systemctl enable nodeserver.service
sudo systemctl start nodeserver.service
```

On intègre nginx à la politique selinux
```bash
sudo dnf install policycoreutils-python-utils
# permettre le proxy node/nginx
sudo semanage port -a -t http_port_t -p tcp 5500
# vérification
sudo semanage port -l | grep http
# étendre les permissions de nginx
sudo grep nginx /var/log/audit/audit.log | audit2allow -m nginx > nginx.te
cat nginx.te
# compilation du module
sudo grep nginx /var/log/audit/audit.log | audit2allow -M nginx
# chargement du module
sudo semodule -i nginx.pp
sudo semodule -l | grep nginx
sudo reboot
```

```bash
sudo vi /etc/nginx/nginx.conf
```

```config
server {
...
#        root         /usr/share/nginx/html;
    location / {
        proxy_pass http://localhost:5500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme; 
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_read_timeout 5m;
        proxy_connect_timeout 5m;
        proxy_redirect off;
    }
    client_max_body_size 1m;
...
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

X - Mettre à jour le code

```bash
cd carnet-de-suivi
git pull
npm update
sudo systemctl restart nodeserver.service
```
---
