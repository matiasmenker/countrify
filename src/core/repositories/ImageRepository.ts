import Image from 'core/entities/Image';
import { ErrorResponseType, HttpResponse } from 'core/entities/Response';

interface ImageRepository {
    search(name: string): Promise<HttpResponse<Image | ErrorResponseType>>;
}

export default ImageRepository;
