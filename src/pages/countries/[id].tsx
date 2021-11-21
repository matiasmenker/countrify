import React from 'react';
import styled from 'styled-components';
import UnsplashData from 'data/UnsplashData';
import ImageUseCase from "core/use-cases/ImageUseCase";
import NextImage from 'next/image';
import { useRouter } from 'next/router'
import CountryUseCase from "core/use-cases/CountryUseCase";
import RestCountryData from "data/RestCountryData";
import Country from "core/entities/Country";
import Language from "core/entities/Language";
import Image from "core/entities/Image";
import { BsFillGeoAltFill, BsFillPeopleFill, BsFillMegaphoneFill, BsArrowLeftCircle } from "react-icons/bs";

const noImageFound = '/default_bg.jpg';

const CountryDetailStyled = styled.div`
    width: auto;
    height: 100vh;
    background-position: center;
    background-size: cover;
    
    > span {
        filter: brightness(0.5)!important;
    }
    
    .back{
      color: white;
      left: 30px;
    top: 30px;
      font-size: 25px;
      position: absolute;
      cursor: pointer;
    }
    
    .detail-container{
        width: 100%;
        height: 100%;
        position: absolute;
      .detail{
               display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
        height: 100%;
    
        span{
        color: white;
        width: 100%;
        }
        .name{
            margin-bottom: 10px;
    font-size: 80px;
    font-weight: bolder;
    text-align: center;
    line-height: 80px;
        }
        .sub-detail{
          font-family: 'Lato', serif;
          font-weight: 500;
          color: white;
              align-items: center;
        display: inline-flex;
        }
        .flag{
                 width: 25px;
    border-radius: 3px;
        margin-top: 2px;
        }
        span{
            padding: 0 5px;
        }
        .population{
            font-size: 13px;
        }
    }
    }
`;

const CountryDetail = ({ country, image }: { country: Country, image: Image }) => {
    const router = useRouter();
    if(country){
        return <CountryDetailStyled>
            <NextImage
                className="image-country"
                placeholder="blur"
                blurDataURL={image && image.preloadUrl ? image.preloadUrl : noImageFound}
                layout={'fill'}
                objectFit={"cover"}
                src={image && image.url ? image.url : noImageFound}
                alt={country.name}/>
            <div className="detail-container">

                    <span onClick={() => router.back()} className="back"><BsArrowLeftCircle/></span>
                <div className="detail">
                    <div className="name">
                        <span>{country.name}</span>
                    </div>
                    <div className="sub-detail">
                        <BsFillGeoAltFill/>
                        { country.capital ?                         <span className="capital">{country.capital}, {country.name}</span>
                            :                         <span className="capital">{country.name}</span>
                        }
                        <img className="flag" src={country.flag} alt={country.name}/>
                    </div>
                    {country.language && <div className="sub-detail">
                        <BsFillMegaphoneFill/>
                        <span className="language">{country.language.map((language: Language) => language.name).join()}</span>
                    </div>}
                    <div className="sub-detail">
                        <BsFillPeopleFill/>
                        <span className="population">{country.population}</span>
                    </div>
                </div>
            </div>
        </CountryDetailStyled>
    }
    return null;
};

const getSearchParamCountry = (country: Country) => country.capital ? country.capital : country.name;

export const getStaticProps = async (props: any) => {
    const countryId = props.params.id;
    const countryUseCase = new CountryUseCase(new RestCountryData());
    const country = await countryUseCase.getByCode(countryId);
    const imageUseCase = new ImageUseCase(new UnsplashData());
    const searchParamCountry = country.isSuccess() ? getSearchParamCountry(country.format()) : 'not found';
    const image = await imageUseCase.search(searchParamCountry);
    return {
        props: {
            image: image.isSuccess() ? image.format() : null,
            country: country.isSuccess() ? country.format() : []
        }
    }
};

export const getStaticPaths = async () => {
    return {
        paths: [
            '/countries/[id]',
        ],
        fallback: true,
    }
}

export default CountryDetail;