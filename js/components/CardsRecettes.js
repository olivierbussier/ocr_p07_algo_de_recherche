import { Utils } from "../lib/Utils.js"

class DisplayRecette {
    /**
     * Permet la création d'un element HTMLElement d'une recette
     *
     * @param {*} recette
     */
    constructor(recette) {
        const section = document.createElement('div')
        section.setAttribute('class', "col-sm")
        // Liste d'ingrédients
        const ul = document.createElement('ul')
        recette.ingredients.forEach((ingredient) => {
            var li = document.createElement('li')
            const textUnit = !ingredient.unit ? '' : this.convertUnit(ingredient.unit)
            const textQuantity = !ingredient.quantity ? '' : ingredient.quantity
            li.innerHTML = '<span class="strong">' + ingredient.ingredient + ': ' + '</span>' + textQuantity + textUnit
            ul.appendChild(li)
        })
        const stfl = 'abcdefghijklmnopqrstuvwxyz0123456789'
        // const img = "assets/images/new/" + String.fromCharCode(stfl.charCodeAt(Math.floor(Math.random()*stfl.length))) + ".jpg"
        const img = "https://picsum.photos/380/178?a=" + Math.random(100000)

        section.innerHTML =
           `<article class="card">
                <img class="img-card-head card-img-top" src="${img}" alt="Recette">
                <div class="card-body">
                    <h5 class="card-title">${recette.name}
                        <span class="float-right">
                            <img src="assets/icones/clock.svg"> ${recette.time}mn
                        </span>
                    </h5>
                </div>
                <div class="model-grid">
                    <div class="card-body ingredients">
                    </div>

                    <div class="card-body">
                        <p class="card-text p12px multiline-ellipsis">${this.truncateText(recette.description,200)}</p>
                    </div>
                </div>
            </article>`
        section.querySelector('.card-body.ingredients').appendChild(ul)
        this._section = section
    }
    /**
     * Recuperation du DOM construit
     *
     * @returns {HTMLElement}
     */
    getDOM() {
        return this._section
    }

    /**
     * Permet de normaliser les unités afin d'éviter les débordements
     * de zone
     *
     * @param {string} unit
     * @returns {string}
     */
    convertUnit(unit) {
        var newUnit

        switch (unit) {
            case "grammes": newUnit = 'g'; break
            case "cuillères à soupe": newUnit = ' cuillères'; break
            case "gousses": newUnit = ' gousse(s)'; break;
            case "boites": newUnit = ' boite(s)'; break;
            default: newUnit = unit; break
        }
        return newUnit
    }

    /**
     * Permet de réaliser la fonction css "text-overflow: ellipsis" sur des textes
     * multi-lignes
     *
     * @param {string} text
     * @param {number} len
     */
    truncateText(text, len) {
        var p = 0
        var posBreak = 0

        while (p < len && p < text.length) {
            // recherche du prochain espace
            if (text[p] == ' ') {
                posBreak=p
            }
            p++
        }
        var t = text.substring(0, posBreak)
        if (p < text.length)
            t = t + ' ...'
        return t
    }
}

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
    }

    /**
     * Permet d'afficher ou masquer les recettes en fonction d'un tableau
     * avec le status de tous les elements passé en parametre
     *
     * @param {{id: number, toBeDisplayed: boolean}[]} recettesArray
     */
    display(recettesArray) {
        recettesArray.forEach(recette => {
            if (recette.toBeDisplayed) {
                this._recettes[recette.id].classList.remove('hide-recette')
            } else {
                this._recettes[recette.id].classList.add('hide-recette')
            }
        })
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