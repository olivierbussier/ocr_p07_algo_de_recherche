---
marp: true
theme: olivier
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---
<!-- <style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
pre {
    background-color: black;
    border-radius:10px;
    padding:10px;
    color:white;
}
h1 {

}
</style> -->

![bg left:40% 80%](../assets/icones/logo.svg)

# Les petits plats

Documentation

[https://olivierbussier.github.io/](https://olivierbussier.github.io/ocr_p7_algo_de_recherche/)

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
- bootstrap V5.2.2 pour l'interface (sous forme scss, généré avec webpack).
- webpack avec Sass / PostCSS / Autoprefixer et Minifier

Pour installer webpack, il suffit de lancer la commande suivante depuis le répertoire de base du projet (les pré-requis sont Node.JS et npm/yarn):

        /home/user/projet/>yarn install

Pour transpiler les fichiers scss:

Développement : ```/home/user/projet/>yarn run build:dev```
Production    : ```/home/user/projet/>yarn run build```
watch /Dev    : ```/home/user/projet/>yarn run watch```

---
# Implementation de la fonction recherche

La fonctionalité de recherche est implémentée dans un composant nommé "Recherche" et situé dans le fichier "Recherche.js"

## Interface du composant "Recherche"

    Recherche.constructor({any}[]: data)
Le paramètre du constructeur est un tableau d'objets dans lesquels les recherches sont à faire

    Normalize(string: chaine)

Pemet de normaliser les chaines de caractères à convenance. Dans cette implémentation, la chaine est transformée en minuscules et sa 1ere lettre est mise en Majuscule, ainsi, "Casserole De Grande Taille" sera normalisé en "Casserolle de grande taille"

    Recherche('chaine')

Lance l'algorithme de recherche

---
# Implémentation par "boucles natives"
Dans cette implémentation, seules sont utilisées les boucles for/while et les conditions élémentaires pour faire l'ensemble des traitements.

![h:24cm center](../doc/Recherche-implémentation-native.svg)

---
# Implémentation "méthodes JS tableaux"
![w:19cm h:19cm center](../doc/Recherche-implémentation-arraymethodes.svg)

Dans cette implémentation, l'opération de recherche des corespondances s'effectue de manière très compacte utilisant une méthode map et une méthode reduce

        Recettes.map((recette) => {
            if (match(recette.description) ||
                match(recette.titre)) ||
                recette.ingredients.reduce((ingredient) => match(ingredient.ingredient)}) > 0) {
                return {id: recette.id, display: true}
            } else {
                return {id: recette.id, display: false}
            }
        })

<pre>
dsqdsqdsqdsq
</pre>