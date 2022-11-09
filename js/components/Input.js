export class Input {
    /**
     *
     * @param {HTMLElement} element
     */
    constructor(element) {
        this._element = element
        this._hook = null
    }
    setHook(hookFunction) {
        this._hook = hookFunction
        this._element.addEventListener('input', event => {
            if (hookFunction) {
                hookFunction(event)
            }
        })
    }
}