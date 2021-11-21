import CountryRepository from 'core/repositories/CountryRepository';

class CountryUseCase {
    private countryRepository: CountryRepository;

    constructor(countryRepository: CountryRepository) {
        this.countryRepository = countryRepository;
    }

    getAll = async () => await this.countryRepository.all();

    getByCode = async (code: string) => await this.countryRepository.getByCode(code);
}

export default CountryUseCase;
