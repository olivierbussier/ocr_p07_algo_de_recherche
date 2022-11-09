export class ActiveFilters {

    constructor(rootElement) {
        this._rootElement = rootElement
        this._activeFilters = []
        this._hookFunction = null
    }

    /**
     * Créée un nouveau filtre dans la catégorie spécifiée
     *
     * @param {string} category Categorie du nouveau filtre
     * @param {string} filter texte du filtre à ajouter
     */
    add(category, filter) {
        var cat
        if (category === 'ingredients') cat="color-combo-ingredients"
        else if (category === 'ustensiles') cat="color-combo-ustensiles"
        else if (category === 'appareils') cat="color-combo-appareils"

        this._div = document.createElement('div')
        this._div.classList.add("postit",cat)

        this._div.innerHTML =
       `<img src="assets/icones/cross.svg" alt="Clore le badge">
        <p>${filter}</p>`

        if (this._activeFilters.filter(element => element.category === category && element.filter === filter).length === 0) {
            this._activeFilters.push({category: category, filter: filter, element: this._div})
            this._rootElement.appendChild(this._div)

            this._div.querySelector('img').addEventListener('click', (e) => {
                const currentFilter = e.target.parentElement
                const result = this._activeFilters.filter((element) => element.element === currentFilter)[0]
                this.removeFilter(currentFilter)
                currentFilter.remove()
                if (this._hookFunction) {
                    this._hookFunction(result.category, result.filter)
                }
            })
        }
    }

    /**
     * Supprime un filtre poqitionné
     *
     * @param {HTMLElement} elementToDelete
     */
    removeFilter(elementToDelete) {
        this._activeFilters.filter((element, index) => {
            if (element.element === elementToDelete) {
                delete this._activeFilters[index]
            }
        })
    }

    /**
     * Rend la partie du DOM correspondant aux filtres
     *
     * @returns {NodeList}
     */
    getDOM() {
        return this._div
    }

    /**
     * Positionne la fonction qui sera appelée lorsqu'on supprime un filtre
     *
     * @param {*} hookFunction
     */
    setHook(hookFunction) {
        this._hookFunction = hookFunction
    }

    /**
     * Rend la liste des filtres actifs
     *
     * @returns {NodeList}
     */
    get() {
        return this._activeFilters
    }
}