import React, { useCallback, useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import Country from 'core/entities/Country';
import CountryUseCase from 'core/use-cases/CountryUseCase';
import RestCountryData from 'data/RestCountryData';

import Search from 'components/Search';
import CountryItem from 'components/CountryItem';
import HeaderImage from 'components/HeaderImage';
import Page404 from 'components/Page404';
import NotFound from 'components/NotFound';

const HeaderStyled = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        padding: 0;
    }
`;

const MainStyled = styled.div`
    @media (max-width: 440px) {
        grid-template-columns: 100%;
        padding: 20px;
    }
    width: auto;
    max-width: none;
    float: none;
    padding-top: 50px;
    padding-right: 72px;
    padding-left: 72px;
    @media (min-width: 1600px) {
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    }
    position: relative;
    display: grid;
    grid-gap: 36px;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    list-style: none;
`;

const useCountries = (initialCountries: Country[]) => {
    const [searchValue, setSearchValue] = useState('');
    const [countries, setCountries] = useState(initialCountries);

    useEffect(() => {
        setCountries(initialCountries.filter((country: Country) => country.name.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue]);

    const handleChange = useCallback((query: string) => setSearchValue(query.toLowerCase()), []);

    return {
        countries,
        search: handleChange,
    };
};

const Countries = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { countries, search } = useCountries(props.countries);
    const hasCountries = countries && countries.length > 0;
    const hasError = props.error && !hasCountries;
    return (
        <>
            <HeaderStyled>
                <HeaderImage />
                <Search onSearch={search} />
            </HeaderStyled>
            {hasError && <Page404 />}
            {hasCountries ? (
                <MainStyled role='list'>
                    {countries.map((country: Country) => (
                        <CountryItem key={country.code} country={country} />
                    ))}
                </MainStyled>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export const getStaticProps = async () => {
    const countryUseCase = new CountryUseCase(new RestCountryData());
    const countries = await countryUseCase.getAll();
    return {
        props: {
            countries: !countries.isError() ? JSON.parse(JSON.stringify(countries)).data : [],
            error: countries.isError(),
        },
    };
};

export default Countries;
