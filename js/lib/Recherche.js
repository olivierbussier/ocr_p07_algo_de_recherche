import { Utils } from "./Utils.js"

export class Recherche {

    /**
     *
     * @param {{}[]} data Tableau des recettes
     */
    constructor(data) {
        this._data = data
    }

    /**
     * Recherche type array method
     *
     */
     arrayMethodSearch(recettes, stringSearch, resultRecettes) {
        const str = stringSearch.toLocaleLowerCase()

        recettes.map((recette) => {
            if (recette.description.toLocaleLowerCase().indexOf(str) !== -1 ||
                recette.name.toLocaleLowerCase().indexOf(str) !== -1 ||
                recette.ingredients.reduce((accu, ingredient) => {
                    return accu + (ingredient.ingredient.toLocaleLowerCase().indexOf(str) !== -1) ? 1 : 0;
                    }, 0) > 0) {
                resultRecettes[recette.id].toBeDisplayed = true;
            } else {
                resultRecettes[recette.id].toBeDisplayed = false;
            }
        });
        return resultRecettes;
    }

    /**
     * Effectue une recherche textuelle sur les recettes, sur les champs :
     * - titre
     * - description
     * - ingrédients
     *
     * @param {{}[]} recettes liste des recettes dans lesquelles chercher
     * @param {string} stringSearch la chaine de caracteres à chercher
     * @returns {{}[]}  retourne un tableau de booleens key = id de la recette, value = true si la recette doit etre affichée, false sinon
     */
    textualSearch(recettes, stringSearch) {
        // Fonction de recherche textuelle
        var resultRecettes = []
        const iterations = 10

        for (var i = 1; i <= this._data.length; i++) {
            var o = {}
            o.id = i
            o.toBeDisplayed = true
            resultRecettes[i] = o
        }

        if (stringSearch.length >= 3) {
            resultRecettes = this.arrayMethodSearch(recettes, stringSearch, resultRecettes)
        }
        return resultRecettes
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

        // On commence par la recherche textuelle
        var resultRecettes = this.textualSearch(this._data, stringSearch)

        // Recherche des recettes matchant les filtres
        this._data.forEach(recette => {
            if (resultRecettes[recette.id].toBeDisplayed == true) {
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
            }
        })
        return resultRecettes
    }

    /**
     * Retourne la liste de tous les ingrédients distincts
     *
     * @returns {array}
     */
    getDistinctIngredients() {
        var ingredientsFiltres = new Set()
        this._data.forEach(recipe => recipe.ingredients.forEach(ingredient => ingredientsFiltres.add(Utils.normalize(ingredient.ingredient))))
        return Array.from(ingredientsFiltres).sort()
    }

    /**
     * Retourne la liste de tous les appareils distincts
     *
     * @returns {array}
     */
    getDistinctAppareils() {
        var appareilsFiltres = new Set()
        this._data.forEach(recipe => appareilsFiltres.add(Utils.normalize(recipe.appliance)))
        return Array.from(appareilsFiltres).sort()
    }

    /**
     * Retourne la liste de tous les ustensiles distincts
     *
     * @returns {array}
     */
    getDistinctUstensiles() {
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

                appareils.add(Utils.normalize(recette.appliance))
                recette.ingredients.forEach(ingredient => ingredients.add(Utils.normalize(ingredient.ingredient)))
                recette.ustensils.forEach(ustensile => ustensiles.add(Utils.normalize(ustensile)))
            }
        })
        const i = Array.from(ingredients)
        const u = Array.from(ustensiles)
        const a = Array.from(appareils)
        return {ingredients:i, ustensiles:u, appareils:a}
    }



}