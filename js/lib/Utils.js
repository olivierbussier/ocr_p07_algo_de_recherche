export class Utils {
    /**
     *
     * @param {string} str
     * @returns {string}
     */
     static normalize(str) {
        if (typeof str !== 'string')
            return ''
        return str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1)
    }
}