export class Search {
    constructor(data) {
        this._data = data
    }
    /**
     * Cette fonction permet de chercher une liste de recettes contenant
     * la chaine de caratcteres dans les champs
     * - titre
     * - liste des ingrédients
     * - description de la recette
     *
     * @param {string} string Chaine à chercher
     * @returns {[number]} Tableau contenant les numéros de recette match
     */
    getRecettesContaining(string) {
        return [1,2]
    }

    getRecettesWithIngredient() {
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