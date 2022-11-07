---
marp: true
theme: olivier
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

![bg left:40% 80%](https://marp.app/assets/marp.svg)

# **Marp**

Markdown Presentation Ecosystem

https://marp.app/

---

# Rappel du contexte

L'objectif de ce projet est de créer une maquette de séléction multi-critères de recettes de cuisine. Le cahier des charges insiste sur l'importance de la fluidité et de la réactivité de l'interface lors des saisies utilisateur.

Afin de s'en assurer, il est demandé de créer une fiche d'investigation de fonctionalité pour la fonction de recherche sur le champ principal.

Il est également demandé de créer deux implémentations distinctes de cette fonctionalité
- La première utilisant les fonctions natives de javascript de manipulations de tableaux
- La seconde en utilisant des boucles for/while

Les deux implémentations seront sur deux branches distinctes de git
- La version utilisant les fonctions natives de manipulation de tableaux sera sur la branche "main"
- La version utilisant des boucles for/while sera sur la branche "alernative-search"

Les performances de ces deux implémentations devront être mesurées avec un outil tel que [JSBen.ch](http://jsben.ch).

Il est également demandé de réaliser un logigramme pour chacune de ces deux implémentations.

L'ensemble des recettes est chargé via un fetch au démarrage de l'application et pourra facilement être converti en appel API rest

# Environnement de développement

Le projet utilise :
- bootstrap V5.2.2 pour l'interface.
- webpack avec Sass / PostCSS / Autoprefixer et Minifier

Pour installer webpack, il suffit de lancer la commande suivante depuis le répertoire de base du projet (les pré-requis sont Node.JS et npm/yarn):

        /home/user/projet/>yarn install

Pour transpiler les fichiers scss:

Développement : ```/home/user/projet/>yarn run build:dev```
Production    : ```/home/user/projet/>yarn run build```

---
# Investigation fonctionalité "boucles natives"

![height:25cm](../doc/Recherche-implémentation%201.svg)