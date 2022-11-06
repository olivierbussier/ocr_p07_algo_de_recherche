export class ComboBox {
    /**
     *
     * @param {string[]} optionList Tableau de chaines de caracteres avec toutes les options a afficher dans le combo
     */
    constructor(name, optionList, classOverride = null) {

        // Creation de la template
        // <div class="combo-box" data-component="combo-box"></div>

        this._hookFunction = null
        this._div = document.createElement('div')
        this._div.classList.add("combo-container")

        this._combo = document.createElement('div')
        this._combo.classList.add("combo-box", classOverride)
        this._combo.dataset.component = "combo-box"
        this._div.appendChild(this._combo)

        this._input = document.createElement('input')
        // this._input.setAttribute("type", "text")
        // this._input.setAttribute("list", "")
        this._input.setAttribute("name", name)
        this._combo.appendChild(this._input)

        // const essai = document.createElement('div')
        // essai.classList.add("rel")
        // this._div.appendChild(essai)
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
            optItem.classList.add("active")
            this._divOptions.appendChild(optItem)
            this._options.push(optItem)
        })
        this._input.addEventListener('focusin', e => this.onFocus(e))
        this._input.addEventListener('blur', e => this.onFocus(e))

        for (var option of this._options) {
            option.addEventListener('click', e => this.onclick(e))
        };

        this._input.addEventListener('input', e => this.onKeyboardInput(e))
        this._input.addEventListener('keydown', e => this.onKeydown(e))
    }

    setHook(hookFunction) {
        this._hookFunction = hookFunction
    }
    _currentFocus = -1

    onKeydown(event) {
        // console.log("keydown:",event.type, event.target)
        // this._currentFocus = -1;
        if (event.keyCode == 40) {
            this._currentFocus++
            this.addActive(this._options);
        } else if(event.keyCode == 38) {
            this._currentFocus--
            this.addActive(this._options);
        } else if(event.keyCode == 13) {
            e.preventDefault();
            if (this._currentFocus > -1) {
                if (this._options) {
                    this._options[this._currentFocus].click();
                }
            }
        }
    }

    addActive(options) {
        if (!options) {
            return false
        }
        this.removeActive(options)
        if (this._currentFocus >= options.length) {
            this._currentFocus = 0
        }
        if (this._currentFocus < 0) {
            this._currentFocus = (options.length - 1)
        }
        options[this._currentFocus].classList.add("active")
    }

    removeActive(options) {
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove("active")
        }
    }

    onKeyboardInput(event) {
        // console.log("key:",event.type, event.target)
        var text = event.target.value.toUpperCase()
        for (var option of this._options) {
            if (option.value.toUpperCase().indexOf(text) > -1) {
                option.classList.add("active")
            } else {
                option.classList.remove("active")
            }
        }
    }

    onFocus(event) {
        // console.log("focus:",event, event.target)
        if (event.type === 'focusin') {
            this._divOptions.classList.add('active')
        } else if (event.type === 'blur') {
            setTimeout(() => this._divOptions.classList.remove('active'), 200)
        }
    }

    onclick(event) {
        // console.log("click:",event.type, event.target)
        this._input.value = event.target.innerText
        this._divOptions.classList.add('active')
        if (this._hookFunction) {
            this._hookFunction(event.target.innerText)
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
    fillOption(optionList) {
        optionList.forEach(element => {

        });
    }
}