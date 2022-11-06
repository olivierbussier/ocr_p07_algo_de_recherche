import { ActiveFilters } from "../components/ActiveFilters.js"
import { ComboBox } from "../components/ComboBox.js"
import { CardsRecettes } from "../factories/CardsRecettes.js"
import { LoadData } from "../lib/LoadData.js"
import { Search } from "../lib/Search.js"

export class ApplicationRecherche {

    constructor(fichierRecettes) {
        this.run(fichierRecettes)
    }

    async run(fichierRecettes) {
        // Try to load data
        const loader = new LoadData(fichierRecettes)
        await loader.fetchData()
        this._data = await loader.getData()

        // Search
        const s = new Search(this._data)

        // Recettes
        const cardsRecettes = new CardsRecettes(this._data)

        // Badges
        const root = document.getElementById("filter-active")
        const activeFilters = new ActiveFilters(root)
        activeFilters.setHook((element) => {
            // On vient de supprimer un filtre
            // Mise à jour de la liste des recettes à afficher
            // Mise à jour des combo-box avec les choix restants
            const listeRecettesActualisee = s.getRecettesStatusFromCriteres('', activeFilters.get())
            cardsRecettes.display(listeRecettesActualisee)

        })

        // Identification de la zone ComboBox
        const zoneCombo = document.querySelector('.filter-select')

        // Création des 3 combos
        this._comboIngredients = new ComboBox("ingredients", s.getDistinctIngredients(), "color-combo-ingredients")
        zoneCombo.appendChild(this._comboIngredients.getDOM())
        this._comboIngredients.setHook((newFilter) => {
            activeFilters.add("ingredients", newFilter)
            // On vient d'ajouter un ingrédient
            // Mise à jour de la liste des recettes à afficher
            // Mise à jour des combo-box avec les choix restants
            const listeRecettesActualisee = s.getRecettesStatusFromCriteres('', activeFilters.get())
            cardsRecettes.display(listeRecettesActualisee)
        })

        this._comboUstensiles = new ComboBox("ustensiles", s.getDistinctUstensiles(), "color-combo-ustensiles")
        zoneCombo.appendChild(this._comboUstensiles.getDOM())
        this._comboUstensiles.setHook((newFilter) => {
            activeFilters.add("ustensiles", newFilter)
            // On vient d'ajouter un ingrédient
            // Mise à jour de la liste des recettes à afficher
            // Mise à jour des combo-box avec les choix restants
            const listeRecettesActualisee = s.getRecettesStatusFromCriteres('', activeFilters.get())
            cardsRecettes.display(listeRecettesActualisee)
        })

        this._comboAppareils = new ComboBox("appareils", s.getDistinctAppareils(), "color-combo-appareils")
        zoneCombo.appendChild(this._comboAppareils.getDOM())
        this._comboAppareils.setHook((newFilter) => {
            activeFilters.add("appareils", newFilter)
            // On vient d'ajouter un ingrédient
            // Mise à jour de la liste des recettes à afficher
            // Mise à jour des combo-box avec les choix restants
            const listeRecettesActualisee = s.getRecettesStatusFromCriteres('', activeFilters.get())
            cardsRecettes.display(listeRecettesActualisee)
        })
    }

}