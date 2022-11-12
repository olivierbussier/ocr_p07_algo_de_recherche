export class ComboBox {
    /**
     *
     * @param {string[]} optionList Tableau de chaines de caracteres avec toutes les options a afficher dans le combo
     */
    constructor(name, optionList, classOverride = null) {

        /**
         * Creation de la template
         *  <div class="combo-box" data-component="combo-box">
         *      <input name="${name}" placeholder="${name}">
         *      <datalist id="id_${name}">
         *          <option></option>
         *          ...
         *      </datalist>
         *  </div>
         */

        this._hookFunction = null

        this._combo = document.createElement('div')
        this._combo.classList.add("combo-box", classOverride)
        this._combo.dataset.component = "combo-box"

        this._input = document.createElement('input')
        this._input.setAttribute("name", name)
        this._input.setAttribute("placeholder", name)
        this._combo.appendChild(this._input)

        this._divOptions = document.createElement("datalist")
        this._input.setAttribute("id", "id_" + name)
        this._combo.appendChild(this._divOptions)

        this._options = []
        // Les options du combo-box seront sous la forme :
        // <div data-option="" data-value="" data-hide="false">Option name</div>
        optionList.forEach(option => {
            var optItem = document.createElement('option')
            optItem.dataset.value = option
            optItem.innerHTML = option
            // optItem.classList.add("active")
            this._divOptions.appendChild(optItem)
            this._options.push(optItem)
        })
        this._input.addEventListener('focusin', e => this.onFocus(e))
        this._input.addEventListener('blur', e => this.onFocus(e))

        for (var option of this._options) {
            option.addEventListener('mousedown', e => this.onclick(e))
        }

        this._input.addEventListener('input', e => this.onKeyboardInput(e))
        this._input.addEventListener('keydown', e => this.onKeydown(e))
    }

    setHook(hookFunction) {
        this._hookFunction = hookFunction
    }
    _currentFocus = -1

    onKeydown(event) {
        if (event.keyCode == 40) {
            this._currentFocus++
            this.addMatch(this._options);
        } else if(event.keyCode == 38) {
            this._currentFocus--
            this.addMatch(this._options);
        } else if(event.keyCode == 13) {
            e.preventDefault();
            if (this._currentFocus > -1) {
                if (this._options) {
                    this._options[this._currentFocus].click();
                }
            }
        }
    }

    addMatch(options) {
        if (!options) {
            return false
        }
        this.removeMatch(options)
        if (this._currentFocus >= options.length) {
            this._currentFocus = 0
        }
        if (this._currentFocus < 0) {
            this._currentFocus = (options.length - 1)
        }
        options[this._currentFocus].classList.remove("unmatch")
    }

    removeMatch(options) {
        for (var i = 0; i < options.length; i++) {
            options[i].classList.add("unmatch")
        }
    }

    onKeyboardInput(event) {
        var text = event.target.value.toUpperCase()
        for (var option of this._options) {
            if (option.value.toUpperCase().indexOf(text) > -1) {
                option.classList.remove("unmatch")
            } else {
                option.classList.add("unmatch")
            }
        }
    }

    onFocus(event) {
        if (event.type === 'focusin') {
            this._divOptions.classList.add('active')
        } else if (event.type === 'blur') {
            this._divOptions.classList.remove('active')
        }
    }

    onclick(event) {
        this._input.value = ''
        this._divOptions.classList.add('active')
        if (this._hookFunction) {
            this._hookFunction(event.target.value)
        }
    }

    getDOM() {
        return this._combo
    }

    /**
     *
     * @param {string[]} optionList Liste des options que l'on veut afficher
     *  (toutes doivent etre dans les options passer au constructeur)
     */
    updateOptionList(optionList) {
        this._options.forEach(((option, index) => {
            // if (option.value === "Pois Cassé")
            if (optionList.indexOf(option.value) !== -1) {
                option.classList.remove("inactive")
            } else {
                option.classList.add("inactive")
            }
        }))
    }
}