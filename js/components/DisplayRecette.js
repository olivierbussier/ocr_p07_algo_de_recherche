import { Utils } from "../lib/Utils.js"

export class DisplayRecette {
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
        if (0) {
            var debugStr ='', virg=''
            debugStr += 'id recette:' + recette.id + '<br>'
            debugStr +='ustensiles: '
            recette.ustensils.forEach((u) => {
                debugStr += (virg+u)
                virg=', '
            })
            debugStr += '<br>appareils: ' + recette.appliance
            debugStr = `<div class="card-body debug">${debugStr}</div>`
        } else {
            debugStr = ''
        }
        const stfl = 'abcdefghijklmnopqrstuvwxyz0123456789'
        // const img = "assets/images/new/" + String.fromCharCode(stfl.charCodeAt(Math.floor(Math.random()*stfl.length))) + ".jpg"
        const img = "https://picsum.photos/380/178?a=" + Math.random(100000)

        section.innerHTML =
           `<article class="card">
                <img class="img-card-head card-img-top" src="${img}" alt="Recette">
                <div class="card-body">
                    <h5 class="card-title mt-3">${recette.name}
                        <span class="float-right fw-bold">
                            <img src="assets/icones/clock.svg">
                            <span>${recette.time}mn</span>
                        </span>
                    </h5>
                </div>
                <div class="model-grid">
                    <div class="card-body ingredients">
                    </div>

                    <div class="card-body">
                        <p class="card-text p12px multiline-ellipsis">${Utils.truncateText(recette.description,200)}</p>
                    </div>${debugStr}
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

        switch (unit.toLocaleLowerCase()) {
            case "barquettes":        newUnit = ' barquette(s)'; break;
            case "boites":            newUnit = ' boite(s)' ;    break;
            case "cuillères à café":  newUnit = ' c. à café';    break
            case "cuillères à soupe": newUnit = ' c. à soupe';   break
            case "feuilles":          newUnit = ' feuille(s)';   break;
            case "gousses":           newUnit = ' gousse(s)';    break;
            case "grammes":           newUnit = 'g'         ;    break
            case "litre":             newUnit = ' litre(s)';     break
            case "litres":            newUnit = ' litre(s)';     break
            case "pincées":           newUnit = ' pincée(s)';    break
            case "sachets":           newUnit = ' sachet(s)';    break;
            case "tasses":            newUnit = ' tasse(s)';     break;
            case "tiges":             newUnit = ' tige(s)';      break;
            case "tranches":          newUnit = ' tranche(s)';   break;
            case "verres":            newUnit = ' verre(s)';     break;
            default: newUnit = unit; break
        }
        return newUnit
    }
}
