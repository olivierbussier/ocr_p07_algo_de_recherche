import { ComboBox } from "../components/ComboBox.js"
import { CardsRecettes } from "../factories/CardsRecettes.js"
import { LoadData } from "../lib/LoadData.js"
import { Search } from "../lib/Search.js"

export class ApplicationRecherche {

    _ingredients = new Set()
    _ustensiles  = new Set()
    _appareils   = new Set()

    constructor(fichierRecettes) {
        this._fichierRecettes = fichierRecettes
        this.load(fichierRecettes)
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
    async load(fichierRecettes) {
        // Try to load data
        const loader = new LoadData(fichierRecettes)
        await loader.fetchData()
        this._data = await loader.getData()
        const s = new Search(this._data)

        // Combo
        const zoneCombo = document.querySelector('.filter-select')
        this._data.forEach(recipe => recipe.ingredients.forEach(ingredient => this._ingredients.add(this.normalize(ingredient.ingredient))))
        this._comboIngredients = new ComboBox("ingredients", this._ingredients, "color-combo-ingredients")
        zoneCombo.appendChild(this._comboIngredients.getDOM())

        this._data.forEach(recipe => recipe.ustensils.forEach(ustensile => this._ustensiles.add(this.normalize(ustensile))))
        this._comboUstensiles = new ComboBox("ustensiles", this._ustensiles, "color-combo-ustensiles")
        zoneCombo.appendChild(this._comboUstensiles.getDOM())

        this._data.forEach(recipe => this._appareils.add(this.normalize(recipe.appliance)))
        this._comboAppareils = new ComboBox("appareils", this._appareils, "color-combo-appareils")
        zoneCombo.appendChild(this._comboAppareils.getDOM())

        // Recettes
        this._DOMRecettes = new CardsRecettes(this._data)
        this._DOMRecettes.display()

    }

}