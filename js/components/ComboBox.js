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
        this._currentFocus = -1

        this._div = document.createElement('div')
        this._div.classList.add("combo-container")

        this._combo = document.createElement('div')
        this._combo.classList.add("combo-box", classOverride)
        this._combo.dataset.component = "combo-box"
        this._div.appendChild(this._combo)

        this._input = document.createElement('input')
        this._input.setAttribute("name", name)
        this._input.setAttribute("placeholder", name)
        this._combo.appendChild(this._input)

        // Création de la zone de click au dessus du caret
        this._caretClick = document.createElement('a')
        this._caretClick.setAttribute('href', "#")
        this._caretClick.classList.add('click-combo')
        this._combo.appendChild(this._caretClick)

        this._caretClick.addEventListener("mousedown", e => this.onClickCaret(e))

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
            this._divOptions.appendChild(optItem)
            this._options.push(optItem)
            optItem.addEventListener('mousedown', e => this.onclick(e))
        })

        this._input.addEventListener('focusin', e => this.onFocus(e))
        this._input.addEventListener('blur', e => this.onFocus(e))

        this._input.addEventListener('input', e => this.onKeyboardInput(e))
        this._input.addEventListener('keydown', e => this.onKeydown(e))
    }

    log(e, msg='') {
        console.log('event:' + msg, e.type, e.target)
    }

    onClickCaret(e) {
        e.preventDefault()
        e.stopPropagation()
        this.log(e, 'caret')
        this._divOptions.classList.forEach(ev => console.log(ev, 'bizarre'))
        if (this._divOptions.classList.contains('active')) {
            this._caretClick.classList.remove("active")
            this._divOptions.classList.remove("active")
            this._input.blur()
        } else {
            this._caretClick.classList.add("active")
            this._divOptions.classList.add("active")
            this._input.focus()
        }
    }

    onFocus(event) {
        this.log(event)
        if (event.type === 'focusin') {
            this._divOptions.classList.add('active')
            this._caretClick.classList.add("active")
        } else if (event.type === 'blur') {
            this._divOptions.classList.remove('active')
            this._caretClick.classList.remove("active")
        }
    }

    onclick(event) {
        this.log(event)
        this._input.value = ''
        this._divOptions.classList.remove('active')
        this._caretClick.classList.remove('active')
        if (this._hookFunction) {
            this._hookFunction(event.target.value)
        }
    }

    onKeyboardInput(event) {
        this.log(event)
        var text = event.target.value.toUpperCase()
        for (var option of this._options) {
            if (option.value.toUpperCase().indexOf(text) > -1) {
                option.classList.remove("unmatch")
            } else {
                option.classList.add("unmatch")
            }
        }
    }

    onKeydown(event) {
        this.log(event)
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

    setHook(hookFunction) {
        this._hookFunction = hookFunction
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

    getDOM() {
        return this._div
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