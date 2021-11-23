import Language from 'core/entities/Language';

class Country {
    readonly name: string;
    readonly code: string;
    readonly region: string;
    readonly subregion: string;
    readonly flag: string;
    readonly googleMaps: string;
    readonly population: string;
    readonly currencies: string[] | null;
    readonly language: Language[] | null;
    readonly capital: string | null;

    constructor(
        name: string,
        code: string,
        region: string,
        subregion: string,
        flag: string,
        googleMaps: string,
        population: string,
        currencies: string[] | null,
        language: Language[] | null,
        capital: string | null
    ) {
        this.name = name;
        this.code = code;
        this.region = region;
        this.subregion = subregion;
        this.flag = flag;
        this.googleMaps = googleMaps;
        this.population = population;
        this.currencies = currencies;
        this.language = language;
        this.capital = capital;
    }
}

export default Country;
