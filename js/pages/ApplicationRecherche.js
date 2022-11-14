import { ActiveFilters } from "../components/ActiveFilters.js"
import { ComboBox } from "../components/ComboBox.js"
import { CardsRecettes } from "../components/CardsRecettes.js"
import { Recherche } from "../lib/Recherche.js"
import { CustomInput } from "../components/CustomInput.js"

export class ApplicationRecherche {

    constructor(fichierRecettes) {
        this.run(fichierRecettes)
    }

    /**
     * Mise à jour des combo avec la liste des recettes encore affichées
     */
    updateCombo() {
        // Récupération des choix restants en fonction des recettes affichées
        const {ingredients, ustensiles, appareils} = this._search.getElementsFromRecettes(this._listeRecettesActualisee, this._data)
        this._comboIngredients.updateOptionList(ingredients)
        this._comboUstensiles.updateOptionList(ustensiles)
        this._comboAppareils.updateOptionList(appareils)
    }

    /**
     * Fonction utilisée pour créer un combo. Elle contient le code nécessaire a la création
     * de l'élément HTML et aussi du gestionnaire d'evt sur un click dans le combo
     *
     * @param {string} type Le type de combo à créer (ingredients, ustensiles ou appareils)
     * @param {array} distinctChoices   La liste des choix possibles (distinct list)
     * @param {string} classOverride    La surcharge de classe du combo pour styliser en fonction d type
     * @param {HTMLElement} parentElement   L'élément parent ou sera fait le "appendChild"
     * @returns {HTMLElement}   L'élément crée
     */
    createCombo(type, distinctChoices, classOverride, parentElement) {
        const combo = new ComboBox(type, distinctChoices, classOverride)
        parentElement.appendChild(combo.getDOM())
        combo.setHook((newFilter) => {
            // Hook : On arrive ici suite à l'ajout d'un filtre
            this._activeFilters.add(type, newFilter)
            // Mise à jour de la liste des recettes à afficher
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres(this._searchString, this._activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            // Mise à jour de la combo-box avec les choix restants
            this.updateCombo()
        })
        return combo
    }

    /**
     *
     * @param {{}[]} fichierRecettes
     */
    async run(fichierRecettes) {
        // Chargement des données avec un fetch synchrone
        const response = await fetch(fichierRecettes)
        this._data = await response.json()
        this._searchString = ''

        // Création des fiches recettes
        this._cardsRecettes = new CardsRecettes(this._data)

        // Classe contenant les utilitaires de recherche
        this._search= new Recherche(this._data)

        // Création de l'input pour la recherche textuelle
        const customInput = document.querySelector(".custom-input")
        this._input = new CustomInput(customInput)
        this._input.setHook(event => {
            // Hook appelé lorsque le contenu de l'input change
            this._searchString = event.target.value
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres(event.target.value, this._activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            this.updateCombo()
        })

        // Filtres
        const root = document.getElementById("filter-active")
        this._activeFilters = new ActiveFilters(root)
        this._activeFilters.setHook(() => {
            // Hook appelé lorsqu'on supprime un filtre
            this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres(this._searchString, this._activeFilters.get())
            this._cardsRecettes.display(this._listeRecettesActualisee)
            this.updateCombo()
        })

        // Appelée une 1ere fois à l'init
        this._listeRecettesActualisee = this._search.getRecettesStatusFromCriteres(this._searchString, this._activeFilters.get())

        // Identification de la zone ComboBox
        const zoneCombo = document.getElementById('filter-select')

        // Création des 3 combos
        this._comboIngredients = this.createCombo("ingredients", this._search.getDistinctIngredients(), "color-combo-ingredients", zoneCombo)
        this._comboUstensiles  = this.createCombo("ustensiles",  this._search.getDistinctUstensiles(),  "color-combo-ustensiles",  zoneCombo)
        this._comboAppareils   = this.createCombo("appareils",   this._search.getDistinctAppareils(),   "color-combo-appareils",   zoneCombo)

        // Activation du focus sur l'input
        this._input.focus()
    }
}