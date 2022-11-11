import { DisplayRecette} from "./DisplayRecette.js"

export class CardsRecettes {
    /**
     * Crée le DOM de l'ensemble des recettes
     *
     * @param {{}[]} recettes
     */
    constructor (recettes) {
        this._data = recettes
        this._recettes = []

        // Construction du DOM

        const section = document.getElementById("recettes")
        recettes.forEach(recette => {
            const elem = new DisplayRecette(recette).getDOM()
            this._recettes[recette.id] = elem
            section.appendChild(elem)
        })
        section.appendChild(this.emptyCard())
        section.appendChild(this.emptyCard())
    }

    emptyCard() {
        const div = document.createElement('div')
        div.setAttribute('class', "col-sm")
        return div
    }
    /**
     * Permet d'afficher ou masquer les recettes en fonction d'un tableau
     * avec le status de tous les elements passé en parametre
     *
     * @param {{id: number, toBeDisplayed: boolean}[]} recettesArray
     */
    display(recettesArray) {
        var nbRecettes = 0

        recettesArray.forEach(recette => {
            if (recette.toBeDisplayed) {
                nbRecettes++
                this._recettes[recette.id].classList.remove('hide-block')
            } else {
                this._recettes[recette.id].classList.add('hide-block')
            }
        })
        const msg = document.querySelector("#msg-info")
        if (nbRecettes > 0) {
            msg.innerText = ""
            msg.classList.add("hide-block")
        } else {
            msg.innerText = "Aucune image ne correspond à vos critères"
            msg.classList.remove("hide-block")
        }
    }
}