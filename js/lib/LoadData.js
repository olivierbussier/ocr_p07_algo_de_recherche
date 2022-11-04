export class LoadData {
    constructor (url) {
        this._url = url
        this._data = null
    }

    /**
     * Fonction synchrone de chargement des données photographes et médias
     * @returns
     */
    async fetchData () {
        return await fetch(this._url)
        .then((response) => response.json())
        .then((data) => {
            this._data = data
        })
    }
    getData() {
        return this._data
    }
}
