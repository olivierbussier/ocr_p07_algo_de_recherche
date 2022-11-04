import { CardsRecettes } from "../factories/CardsRecettes.js"
import { LoadData } from "../lib/LoadData.js"

export class ApplicationRecherche {

    constructor(fichierRecettes) {
        this._fichierRecettes = fichierRecettes
        this.load(fichierRecettes)
    }
    async load(fichierRecettes) {
        // Try to load data
        const loader = new LoadData(fichierRecettes)
        await loader.fetchData()
        this._data = await loader.getData()
        this._DOMRecettes = new CardsRecettes(this._data)
        this._DOMRecettes.display()
    }

}