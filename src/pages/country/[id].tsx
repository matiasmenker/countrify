import React from 'react';
import styled from 'styled-components';
import UnsplashData from 'data/UnsplashData';
import ImageUseCase from 'core/use-cases/ImageUseCase';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import CountryUseCase from 'core/use-cases/CountryUseCase';
import RestCountryData from 'data/RestCountryData';
import Country from 'core/entities/Country';
import Language from 'core/entities/Language';
import Image from 'core/entities/Image';
import { BsFillGeoAltFill, BsFillPeopleFill, BsFillMegaphoneFill, BsArrowLeftCircle, BsCurrencyExchange } from 'react-icons/bs';
import Page404 from 'components/Page404';
import CountryBorder from 'components/CountryBorder';

const noImageFound = '/default_bg.jpg';

const CountryDetailStyled = styled.div<{ error: boolean }>`
    width: auto;
    height: 100vh;
    background-position: center;
    background-size: cover;

    ${(props) =>
        props.error &&
        `
        background-color: #7380a2;
    `}

    > span {
        filter: brightness(0.5) !important;
    }

    .detail-container {
        width: 100%;
        height: 100%;
        position: absolute;

        .back {
            color: white;
            font-size: 25px;
            height: 10%;
            cursor: pointer;
            display: flex;
            padding: 0 30px;
            align-items: center;
        }

        .detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 70%;

            span {
                color: white;
                width: 100%;
            }
            .name {
                margin-bottom: 10px;
                font-size: 80px;
                font-weight: bolder;
                text-align: center;
                line-height: 80px;
            }
            .sub-detail {
                font-family: 'Lato', serif;
                font-weight: 500;
                color: white;
                align-items: center;
                display: inline-flex;
            }
            .flag {
                width: 25px;
                border-radius: 3px;
                margin-top: 2px;
            }
            span {
                padding: 0 5px;
            }
        }

        .borders {
            height: 20%;
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            flex-direction: column;
            .title {
                width: 100%;
                color: white;
                text-align: center;
                font-size: 13px;
                font-weight: 100;
                margin-bottom: 10px;
            }
            .container {
                width: 100%;
                display: inline-flex;
                align-items: center;
                align-content: center;
                justify-content: center;
            }
        }
    }
`;

const CountryDetail = ({ country, image, error }: { country: Country; image: Image; error: boolean }) => {
    const router = useRouter();

    if (country) {
        return (
            <CountryDetailStyled error={error}>
                {!error && (
                    <NextImage
                        data-testid='image-country'
                        className='image-country'
                        placeholder='blur'
                        blurDataURL={image && image.preloadUrl ? image.preloadUrl : noImageFound}
                        layout={'fill'}
                        objectFit={'cover'}
                        src={image && image.url ? image.url : noImageFound}
                        alt={country.name}
                    />
                )}
                <div className='detail-container'>
                    <span onClick={() => router.back()} className='back'>
                        <BsArrowLeftCircle />
                    </span>
                    <div className='detail'>
                        {error ? (
                            <Page404 />
                        ) : (
                            <>
                                <div className='name'>
                                    <span>{country.name}</span>
                                </div>
                                <div className='sub-detail'>
                                    <BsFillGeoAltFill />
                                    {country.capital ? (
                                        <span className='capital'>
                                            {country.capital}, {country.name}
                                        </span>
                                    ) : (
                                        <span className='capital'>{country.name}</span>
                                    )}
                                    <img className='flag' src={country.flag} alt={country.name} />
                                </div>
                                <div className='sub-detail'>
                                    <BsFillPeopleFill />
                                    <span className='population'>{country.population}</span>
                                </div>
                                {country.currencies && (
                                    <div className='sub-detail'>
                                        <BsCurrencyExchange />
                                        <span className='currencies'>{country.currencies.join()}</span>
                                    </div>
                                )}
                                {country.language && (
                                    <div className='sub-detail'>
                                        <BsFillMegaphoneFill />
                                        <span className='language'>
                                            {country.language.map((language: Language) => language.name).join()}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {country.borders && (
                        <div className='borders'>
                            <h3 className='title'>Bordering countries:</h3>
                            <div className='container'>
                                {country.borders.map((codeCountry: string) => (
                                    <CountryBorder key={codeCountry} code={codeCountry} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CountryDetailStyled>
        );
    }
    return null;
};

const getSearchParamCountry = (country: Country) => (country.capital ? country.capital : country.name);

export const getStaticProps = async (props: { params: { id: string } }) => {
    const countryId = props.params.id;
    const countryUseCase = new CountryUseCase(new RestCountryData());
    const country = await countryUseCase.getByCode(countryId);
    const imageUseCase = new ImageUseCase(new UnsplashData());
    const searchParamCountry = country.isSuccess() ? getSearchParamCountry(country.format()) : 'not found';
    const image = await imageUseCase.search(searchParamCountry);
    return {
        props: {
            image: image.isSuccess() ? image.format() : null,
            country: country.isSuccess() ? country.format() : null,
            error: country.isError(),
        },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default CountryDetail;
