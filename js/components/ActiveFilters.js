export class ActiveFilters {

    _activeToasts = []
    _hookFunction = null

    constructor(rootElement) {
        this._rootElement = rootElement
    }
    add(category, filter) {
        var cat
        if (category === 'ingredients') cat="color-combo-ingredients"
        else if (category === 'ustensiles') cat="color-combo-ustensiles"
        else if (category === 'appareils') cat="color-combo-appareils"

        this._div = document.createElement('div')
        this._div.classList.add("postit",cat)

        this._div.innerHTML =
       `<img src="/assets/icones/cross.svg" alt="Clore le badge">
        <p>${filter}</p>`

        if (this._activeToasts.filter(element => element.category === category && element.filter === filter).length === 0) {
            this._activeToasts.push({category: category, filter: filter, element: this._div})
            this._rootElement.appendChild(this._div)

            this._div.querySelector('img').addEventListener('click', (e) => {
                const currentFilter = e.target.parentElement
                const result = this._activeToasts.filter((element) => element.element === currentFilter)[0]
                this.removeFilter(currentFilter)
                currentFilter.remove()
                if (this._hookFunction) {
                    this._hookFunction(result.category, result.filter)
                }
            })
            }
    }
    removeFilter(elementToDelete) {
        this._activeToasts.filter((element, index) => {
            if (element.element === elementToDelete) {
                delete this._activeToasts[index]
            }
        })
    }
    getDOM() {
        return this._div
    }
    setHook(hookFunction) {
        this._hookFunction = hookFunction
    }
    get() {
        return this._activeToasts
    }
}