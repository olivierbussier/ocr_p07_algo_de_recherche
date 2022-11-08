import { Utils } from "./Utils.js"

export class Recherche {
    constructor(data) {
        this._data = data
    }

    match(recette, str, ingredients, appareils, ustensiles) {
        // Recherche de la chaine de caractères si longueur > 3
        // Sinon, recherche sur toutes les recettes
    }
    /**
     * Cette fonction de recherche complexe permet de construire un tableau contenant
     * pour chaque recette son status d'affichage en fonction des filtres en entrée:
     * 1. champ de texte a trouver parmi
     *      - titre
     *      - liste des ingrédients
     *      - description
     * 2. Le reste fourni sous forme de différents tableaus.
     *      - Appareils
     *      - Ustensiles
     *      - Ingrédients
     *
     * Le retour est sous la forme d'un tableau d'objets, chaqie objet contenant deux clés:
     *  - numéro de recette
     *  - flag indiquant si la recette matche avec les critères fournis
     *
     * @param {string} stringSearch Chaine à chercher
     * @param {{category: string, filter: string, element:HTMLElement}[]} filtres Liste des ingrédients
     * @returns {{id: number, toBeDisplayed: boolean}[]} Tableau contenant les numéros de recette match
     */
    getRecettesStatusFromCriteres(stringSearch, filtres) {
        var resultRecettes = []
        for (var i = 1; i <= this._data.length; i++) {
            var o = {}
            o.id = i
            o.toBeDisplayed = true
            resultRecettes[i] = o
        }
        // Recherche des recettes matchant les filtres
        this._data.forEach(recette => {
            filtres.forEach(filtre => {
                switch (filtre.category) {
                    case 'ingredients':
                        // Si cet ingrédient n'est pas dans la liste des ingrédients de cette recette
                        // Alors suppression
                        if (recette.ingredients.filter(ingredient => Utils.normalize(ingredient.ingredient) === Utils.normalize(filtre.filter)).length === 0) {
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                    case 'ustensiles':
                        // Si cet ustensile n'est pas dans la liste des ustensiles de cette recette
                        // Alors suppression
                        if (recette.ustensils.filter(ustensile => Utils.normalize(ustensile) === Utils.normalize(filtre.filter)).length === 0) {
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                    case 'appareils':
                        if (Utils.normalize(recette.appliance) !== Utils.normalize(filtre.filter)) {
                            // On retire la recette si l'appliance n'est pas la même
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                }
            })
        })
        return resultRecettes
    }
    /*
        id: number,
        name: string,
        servings: number,
        ingredients: [
            {
                ingredient: string,
                quantity: number optional,
                unit: string optional
            }[]
        ],
        time: 10,
        description: string,
        appliance: string,
        ustensils: string[]
    */

    /**
     * Retourne la liste de tous les ingrédients distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctIngredients(recettesArray) {
        var ingredientsFiltres = new Set()
        this._data.forEach(recipe => {
            if (!recettesArray || recettesArray[recipe.id-1].toBeDisplayed) {
                recipe.ingredients.forEach(ingredient => ingredientsFiltres.add(Utils.normalize(ingredient.ingredient)))
            }
        })
        return Array.from(ingredientsFiltres).sort()
    }
    /**
     * Retourne la liste de tous les appareils distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctAppareils(recettesArray) {
        var appareilsFiltres = new Set()
        this._data.forEach(recipe => appareilsFiltres.add(Utils.normalize(recipe.appliance)))
        return Array.from(appareilsFiltres).sort()
    }

    /**
     * Retourne la liste de tous les ustensiles distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctUstensiles(recettesArray) {
        var ustensilesFiltre = new Set()
        this._data.forEach(recipe => recipe.ustensils.forEach(ustensile => ustensilesFiltre.add(Utils.normalize(ustensile))))
        return Array.from(ustensilesFiltre).sort()
    }


    getElementsFromRecettes(listeRecettesActualisee, data) {
        var ingredients = new Set()
        var ustensiles = new Set()
        var appareils = new Set()

        listeRecettesActualisee.forEach(r => {
            if (r.toBeDisplayed) {
                const recette = data[r.id-1]

                appareils.add(recette.appliance)
                recette.ingredients.forEach(ingredient => ingredients.add(ingredient.ingredient))
                recette.ustensils.forEach(ustensile => ustensiles.add(ustensile))
            }
        })
        const i = Array.from(ingredients)
        const u = Array.from(ustensiles)
        const a = Array.from(appareils)

        return {ingredients:i, ustensiles:u, appareils:a}
    }

}