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
        await fetch(this._url)
        return await response.json()

        // .then((response) => response.json())
        // .then((data) => {
        //     this._data = data
        // })
    }
    getData() {
        return this._data
    }
}
