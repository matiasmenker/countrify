import React from 'react';
import Page404Styled from 'components/Page404/style';
import Image from 'next/image';

const Page404 = () => (
    <Page404Styled data-testid='page-404'>
        <Image layout={'responsive'} width={600} height={400} src='/404.png' />
    </Page404Styled>
);

export default Page404;
