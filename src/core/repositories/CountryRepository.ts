import Country from 'core/entities/Country';
import { ErrorResponseType, HttpResponse } from 'core/entities/Response';

interface CountryRepository {
    all(): Promise<HttpResponse<Country[] | ErrorResponseType>>;
    getByCode(code: string): Promise<HttpResponse<Country | ErrorResponseType>>;
}

export default CountryRepository;
