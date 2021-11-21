import React, { memo } from 'react';
import Image from 'next/image';
import Country from 'core/entities/Country';
import CountryItemStyled from 'components/CountryItem/style';
import Link from 'next/link';
import { BsFillPeopleFill } from 'react-icons/bs';

const CountryItem = memo((country: Country) => {
    const flag = `https://flagpedia.net/data/flags/w1160/${country.code.toLowerCase()}.png`;
    return (
        <Link href={`/countries/${country.code}`}>
            <CountryItemStyled>
                <div className='thumbnail-container-image'>
                    <Image layout={'fill'} placeholder={'blur'} blurDataURL={flag} src={flag} alt={country.name} />
                </div>
                <div className='thumbnail-container-text'>
                    <span className='name'>{country.name}</span>
                    <span className='stats'>
                        <BsFillPeopleFill /> {country.population}
                    </span>
                </div>
            </CountryItemStyled>
        </Link>
    );
});

export default CountryItem;
