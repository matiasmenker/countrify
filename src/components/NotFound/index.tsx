import React from 'react';
import NotFoundStyled from 'components/NotFound/style';
import Image from 'next/image';

const NotFound = () => (
    <NotFoundStyled data-testid='not-found'>
        <Image layout={'responsive'} width={600} height={400} src='/not_found.png' />
    </NotFoundStyled>
);

export default NotFound;
