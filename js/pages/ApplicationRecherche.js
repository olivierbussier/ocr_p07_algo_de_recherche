import { ActiveFilters } from "../components/ActiveFilters.js"
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
        this.run(fichierRecettes)
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
    log(result) {
        result.forEach(e => {
            console.log("categorie: ",e.category, ", filtre: ", e.filter)
        })
        console.log("----------------------------------------")
    }

    async run(fichierRecettes) {
        // Try to load data
        const loader = new LoadData(fichierRecettes)
        await loader.fetchData()
        this._data = await loader.getData()
        const s = new Search(this._data)

        // Badges

        const root = document.getElementById("filter-active")
        const b1 = new ActiveFilters(root)
        b1.setHook((element) => {
            this.log(b1.get())
        })

        // Combo
        const zoneCombo = document.querySelector('.filter-select')
        this._data.forEach(recipe => recipe.ingredients.forEach(ingredient => this._ingredients.add(this.normalize(ingredient.ingredient))))
        this._comboIngredients = new ComboBox("ingredients", this._ingredients, "color-combo-ingredients")
        zoneCombo.appendChild(this._comboIngredients.getDOM())
        this._comboIngredients.setHook((newFilter) => {
            b1.add("ingredients", newFilter)
            this.log(b1.get())
        })

        this._data.forEach(recipe => recipe.ustensils.forEach(ustensile => this._ustensiles.add(this.normalize(ustensile))))
        this._comboUstensiles = new ComboBox("ustensiles", this._ustensiles, "color-combo-ustensiles")
        zoneCombo.appendChild(this._comboUstensiles.getDOM())
        this._comboUstensiles.setHook((newFilter) => {
            b1.add("ustensiles", newFilter)
            this.log(b1.get())
        })

        this._data.forEach(recipe => this._appareils.add(this.normalize(recipe.appliance)))
        this._comboAppareils = new ComboBox("appareils", this._appareils, "color-combo-appareils")
        zoneCombo.appendChild(this._comboAppareils.getDOM())
        this._comboAppareils.setHook((newFilter) => {
            b1.add("appareils", newFilter)
            this.log(b1.get())
        })

        // Recettes
        this._DOMRecettes = new CardsRecettes(this._data)
        this._DOMRecettes.display()

        // const tt = new ActiveFilters(document.querySelector('.filter-active'))
        // tt.add("essai", "essai")
        this.log(b1.get())

    }

}