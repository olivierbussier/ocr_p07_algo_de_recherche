export class CustomInput {
    /**
     * Créée un input cusomisable
     *
     * @param {HTMLElement} element
     */
    constructor(element) {
        this._element = element
        this._hook = null
    }

    /**
     * Met en place un gestionnaire d'evt appelé lorsque le contenu de l'input
     * change
     *
     * @param {CallableFunction} hookFunction
     */
    setHook(hookFunction) {
        this._hook = hookFunction
        this._element.addEventListener('input', event => {
            if (hookFunction) {
                hookFunction(event)
            }
        })
    }

    focus() {
        // activate focus on input
        this._element.querySelector('input').focus()
    }
}