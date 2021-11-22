import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Country from 'core/entities/Country';
import CountryItemStyled from 'components/CountryItem/style';
import { BsFillPeopleFill } from 'react-icons/bs';

const CountryItem = memo(({ country }: { country: Country }) => {
    const flag = `https://flagpedia.net/data/flags/w1160/${country.code.toLowerCase()}.png`;
    return (
        <Link href={`/country/${country.code.toLowerCase()}`}>
            <CountryItemStyled role="listitem" data-testid={`country-${country.name.toLocaleLowerCase()}`}>
                <div className='thumbnail-container-image'>
                    <Image layout={'fill'} placeholder={'blur'} blurDataURL={flag} src={flag} alt={country.name} />
                </div>
                <div className='thumbnail-container-text'>
                    <span className='name' data-testid="name">{country.name}</span>
                    <span className='stats' data-testid="population">
                        <BsFillPeopleFill /> {country.population}
                    </span>
                </div>
            </CountryItemStyled>
        </Link>
    );
});

export default CountryItem;
