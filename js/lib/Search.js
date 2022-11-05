export class Search {
    constructor(data) {
        this._data = data
    }

    match(recette, str, ingredients, appareils, ustensiles) {

        // var result = []
        // // Recherche des ingrédients dans la recette
        // // Boucle sur les ingrédients a chercher
        // ingredients.forEach(filterIngredient => {
        //     if (recette.ingredients.indexOf(filterIngredient)) {
        //         if (filterIngredient.name === recetteIngredient.ingredient) {
        //             // Cette recette matche un ingrédient, maintenant
        //             // boucle sur les appareils
        //             appareils.forEach(filterAppareil => {
        //                 recette.appliance.forEach(recetteAppareil => {
        //                     if (filterAppareil.name === recetteAppareil.appliance) {
        //                         // Cette recette matche un appareil, maintenant
        //                         // Boucle sur les ustensiles
        //                         ustensiles.forEach(filterUstensil => {
        //                             recette.ustensils.forEach(recetteUstensil => {
        //                                 if (filterUstensil.name === recetteUstensil) {
        //                                     // Cette recette matche un ustensile, maintenant
        //                                     // On cherche une chaine dans le titre, la description
        //                                     // et la liste des ingrédients
        //                                     if (str.length >= 3) {
        //                                         // recherche dans le titre et la description
        //                                         if (recette.description.includes(str) || recette.name.includes(str)) {
        //                                             result.push({id:recette.id, status: true})
        //                                         } else if (recette.ingredients.indexOf()  ) {

        //                                         } else {
        //                                             result.push({id:recette.id, status: false})
        //                                         }
        //                                     } else {
        //                                         result.push({id:recette.id, status: false})
        //                                     }
        //                                 } else {
        //                                     result.push({id:recette.id, status: false})
        //                                 }
        //                             })
        //                         })
        //                     } else {
        //                         result.push({id:recette.id, status: false})
        //                     }
        //                 })
        //             })
        //         } else {
        //             result.push({id:recette.id, status: false})
        //         }
        //     })
        // })

        // Recherche de la chaine de caractères si longueur > 3
        // Sinon, recherche sur toutes les recettes


    }

    /**
     * Cette fonction permet de récuperer un tableau de status d'affichage
     * de l'ensemble des recettes.
     * La valeur de retour est sous la forme d'un tableau d'object avec deux clés:
     * - numéro de recette
     * - flag indiquant si la recette doit être affichée (true) ou non (false)
     *
     * stringSearch effectue une recherche dans les champs
     * - titre
     * - liste des ingrédients
     * - description
     * de toutes les recettes
     *
     * @param {string} stringSearch Chaine à chercher
     * @param {{string}[]} ingredientss Liste des ingrédients
     * @param {{string}[]} appareils Liste des appareils
     * @param {{string}[]} ustensiles Liste des ustensiles
     * @returns {{num: number, toBeDisplayed: boolean}[]} Tableau contenant les numéros de recette match
     */
    getRecettesStatus(stringSearch, ingredients, appareils, ustensiles) {
        var result = []
        // On commence par filtrer les recettes sur StringSearch
        this._data.forEach((recette, index) => {
            
            if (this.match(recette, stringSearch, ingredients, appareils, ustensiles)) {
                result.push({num: index, toBeDisplayed: true})
            } else {
                result.push({num: index, toBeDisplayed: false})
            }
        })
        return result
    }

    /**
     * Retourne la liste de tous les ingrédients distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctIngredients(recettesArray) {
    }

    /**
     * Retourne la liste de tous les appareils distincts
     * contenus dans le tableau de recettes passé en parametre
     */
     getDistinctAppareils(recettesArray) {
     }

    /**
     * Retourne la liste de tous les ustensiles distincts
     * contenus dans le tableau de recettes passé en parametre
     */
     getDistinctUstensiles(recettesArray) {
     }


}