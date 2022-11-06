export class Search {
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
                        if (recette.ingredients.filter(ingredient => {
                            return this.normalize(ingredient.ingredient) === filtre.filter
                        }).length === 0) {
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                    case 'ustensiles':
                        // Si cet ustensile n'est pas dans la liste des ustensiles de cette recette
                        // Alors suppression
                        if (recette.ustensils.filter(ustensile => {
                            return this.normalize(ustensile) === filtre.filter
                        }).length === 0) {
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                    case 'appareils':
                        if (this.normalize(recette.appliance) !== filtre.filter) {
                            // On retire la recette si l'appliance n'est pas la même
                            resultRecettes[recette.id].toBeDisplayed = false
                        }
                        break;
                }
            })
        })
        return resultRecettes
    }
    /**
     *
     * @param {string} str
     * @returns {string}
     */
     normalize(str) {
        if (typeof str !== 'string')
            return ''
        return str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1)
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
        this._data.forEach(recipe => recipe.ingredients.forEach(ingredient => ingredientsFiltres.add(this.normalize(ingredient.ingredient))))
        return Array.from(ingredientsFiltres).sort()
    }
    /**
     * Retourne la liste de tous les appareils distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctAppareils(recettesArray) {
        var appareilsFiltres = new Set()
        this._data.forEach(recipe => appareilsFiltres.add(this.normalize(recipe.appliance)))
        return Array.from(appareilsFiltres).sort()
    }

    /**
     * Retourne la liste de tous les ustensiles distincts
     * contenus dans le tableau de recettes passé en parametre
     */
    getDistinctUstensiles(recettesArray) {
        var ustensilesFiltre = new Set()
        this._data.forEach(recipe => recipe.ustensils.forEach(ustensile => ustensilesFiltre.add(this.normalize(ustensile))))
        return Array.from(ustensilesFiltre).sort()
    }
}