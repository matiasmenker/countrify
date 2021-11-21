import React from 'react';
import HeaderImageStyled from 'components/HeaderImage/style';

const HeaderImage = () => (
    <HeaderImageStyled>
        <div className='header-image-container'>
            <h1 className='title'>Countrify.</h1>
            <p className='subtitle'>{`Search 250 countries from the API restcountries.com`}</p>
        </div>
    </HeaderImageStyled>
);

export default HeaderImage;
