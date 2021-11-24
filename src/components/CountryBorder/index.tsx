import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Country from 'core/entities/Country';
import CountryBorderStyled from 'components/CountryBorder/style';
import { BsFillPeopleFill } from 'react-icons/bs';
import CountryUseCase from '../../core/use-cases/CountryUseCase';
import RestCountryData from '../../data/RestCountryData';
import ReactTooltip from 'react-tooltip';

const CountryBorder = memo(({ code }: { code: string }) => {
    const [country, setCountry] = useState<Country>();

    useEffect(() => {
        const getCountry = async () => {
            const countryUseCase = new CountryUseCase(new RestCountryData());
            const countryBorder = await countryUseCase.getByCode(code);
            if (!countryBorder.isError()) setCountry(countryBorder.format());
        };
        getCountry();
    }, [code]);

    return country ? (
        <Link href={`/country/${country.code.toLowerCase()}`}>
            <CountryBorderStyled data-tip data-for={country.name} flag={country.flag}>
                <ReactTooltip id={country.name} effect='solid'>
                    <span className='name'>{country.name} </span>
                    <span className='population'>
                        <BsFillPeopleFill />
                        <span>{country.population}</span>
                    </span>
                </ReactTooltip>
            </CountryBorderStyled>
        </Link>
    ) : null;
});

export default CountryBorder;
