class DisplayRecette {
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
        const img = String.fromCharCode('abcdefghijk'.charCodeAt(Math.floor(Math.random()*11))) + ".jpg"

        section.innerHTML =
           `<article class="card">
                <img class="img-card-head card-img-top" src="assets/images/new/${img}" alt="Recette">
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
    getDOM() {
        return this._section
    }
    convertUnit(unit) {
        var newUnit

        switch (unit) {
            case "grammes": newUnit = 'g'; break
            case "cuillères à soupe": newUnit = ' cuillères'; break
            default: newUnit = unit; break
        }
        return newUnit
    }
    /**
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
    constructor (recettes) {
        this._data = recettes
        this._recettes = []

        // Construction du DOM

        const section = document.getElementById("recettes")
        recettes.forEach(recette => {
            const elem = new DisplayRecette(recette).getDOM()
            this._recettes.push(elem)
            section.appendChild(elem)
        });
    }

    display(recettesArray) {

    }
}