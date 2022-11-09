export class Utils {
    /**
     * Normalise une chaine de caracteres:
     * - conversion en minuscules
     * - 1ere lettre en majuscules
     *
     * @param {string} str Chaine à normaliser
     * @returns {string} Chaine normalisée
     */
     static normalize(str) {
        if (typeof str !== 'string')
            return ''
        return str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1)
    }

    /**
     * Permet de réaliser la fonction css "text-overflow: ellipsis" sur des textes
     * multi-lignes
     *
     * @param {string} text
     * @param {number} len
     */
    static truncateText(text, len) {
        var pointeur = 0
        var posBreak = 0

        while (pointeur < len && pointeur < text.length) {
            // recherche du prochain espace
            if (text[pointeur] == ' ') {
                posBreak=pointeur
            }
            pointeur++
        }
        var partialText = text.substring(0, posBreak)
        if (pointeur < text.length)
            partialText += ' ...'
        return partialText
    }
}