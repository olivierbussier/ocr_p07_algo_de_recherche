import { ActiveFilters } from "../components/ActiveFilters.js"
import { ComboBox } from "../components/ComboBox.js"
import { CardsRecettes } from "../components/CardsRecettes.js"
import { LoadData } from "../lib/LoadData.js"
import { Recherche } from "../lib/Recherche.js"

export class ApplicationRecherche {

    constructor(fichierRecettes) {
        this.run(fichierRecettes)
    }

    updateCombo() {
        // Récupération des choix restants en fonction des recettes affichées
        const {ingredients, ustensiles, appareils} = this._cardsRecettes.getElementsFromRecettes(this._listeRecettesActualisee, this._data)
        this._comboIngredients.updateOptionList(ingredients)
        this._comboUstensiles.updateOptionList(ustensiles)
        this._comboAppareils.updateOptionList(appareils)
    }

    async run(fichierRecettes) {
        // Try to load data
        const response = await fetch(fichierRecettes)
        this._data = await response.json()

        // Recettes
        this._cardsRecettes = new CardsRecettes(this._data)

        // Badges
        const root = document.getElementById("filter-active")
        const activeFilters = new ActiveFilters(root)
        activeFilters.setHook((element) => {
            // On vient de supprimer un filtre
            // Mise à jour de la liste des recettes à afficher
            // Mise à jour des combo-box avec les choix restants
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres('', activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            this.updateCombo()
        })
        // Recherche
        this._search= new Recherche(this._data)
        this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres('', activeFilters.get())

        // Identification de la zone ComboBox
        const zoneCombo = document.querySelector('.filter-select')

        // Création des 3 combos
        this._comboIngredients = new ComboBox("ingredients", this._search.getDistinctIngredients(), "color-combo-ingredients")
        zoneCombo.appendChild(this._comboIngredients.getDOM())
        this._comboIngredients.setHook((newFilter) => {
            // Hook : On arrive ici suite à l'ajout d'un ingrédient
            activeFilters.add("ingredients", newFilter)
            // Mise à jour de la liste des recettes à afficher
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres('', activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            // Mise à jour des combo-box avec les choix restants
            this.updateCombo()
        })

        this._comboUstensiles = new ComboBox("ustensiles", this._search.getDistinctUstensiles(), "color-combo-ustensiles")
        zoneCombo.appendChild(this._comboUstensiles.getDOM())
        this._comboUstensiles.setHook((newFilter) => {
            // Hook : On arrive ici suite à l'ajout d'un ustensile
            activeFilters.add("ustensiles", newFilter)
            // Mise à jour de la liste des recettes à afficher
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres('', activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            // Mise à jour des combo-box avec les choix restants
            this.updateCombo()
        })

        this._comboAppareils = new ComboBox("appareils", this._search.getDistinctAppareils(), "color-combo-appareils")
        zoneCombo.appendChild(this._comboAppareils.getDOM())
        this._comboAppareils.setHook((newFilter) => {
            // Hook : On arrive ici suite à l'ajout d'un appareil
            activeFilters.add("appareils", newFilter)
            // Mise à jour de la liste des recettes à afficher
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres('', activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            // Mise à jour des combo-box avec les choix restants
            this.updateCombo()
        })
    }

}