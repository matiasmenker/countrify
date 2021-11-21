import ImageRepository from 'core/repositories/ImageRepository';

class ImageUseCase {
    private imageRepository: ImageRepository;

    constructor(imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
    }

    search = async (name: string) => await this.imageRepository.search(name);
}

export default ImageUseCase;
