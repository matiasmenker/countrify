import Image from 'core/entities/Image';
import ImageRepository from 'core/repositories/ImageRepository';
import { ErrorResponseType, HttpResponse } from 'core/entities/Response';
import axios, { AxiosError } from 'axios';

type ImageJson = {
    total: number;
    total_pages: number;
    results: {
        id: string;
        created_at: string;
        updated_at: string;
        promoted_at: any;
        width: number;
        height: number;
        color: string;
        blur_hash: string;
        description: any;
        alt_description: string;
        urls: {
            full: string;
            regular: string;
        };
        links: {
            self: string;
            html: string;
            download: string;
            download_location: string;
        };
        categories: [];
        likes: number;
        liked_by_user: boolean;
        current_user_collections: [];
        sponsorship: boolean;
        topic_submissions: {};
        user: [];
        tags: [];
    }[];
};

const UNSPLASH_URL = 'https://api.unsplash.com';

class UnsplashData implements ImageRepository {
    public async search(name: string) {
        try {
            const { data, status, statusText } = await axios.get<ImageJson>(`${UNSPLASH_URL}/search/photos`, {
                params: {
                    query: name,
                    client_id: process.env.UNSPLASH_TOKEN,
                },
            });
            return new HttpResponse<Image>(
                status,
                statusText,
                new Image(data.results[0].urls.full, data.results[0].urls.regular, data.results[0].alt_description)
            );
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                return new HttpResponse<ErrorResponseType>(err.response.status, err.response.statusText);
            } else {
                return new HttpResponse<ErrorResponseType>(400, 'Bad Request');
            }
        }
    }
}

export default UnsplashData;
