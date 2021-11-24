import styled from 'styled-components';

const CountryBorderStyled = styled.div<{ flag: string }>`
    width: 50px;
    height: 30px;
    ${(props) => `background: url(${props.flag})`};
    border-radius: 2px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    cursor: pointer;
    .name {
        font-size: 16px;
        font-weight: 400;
    }
    .population {
        display: inline-flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 300;
        span {
            margin-left: 5px;
        }
    }
`;

export default CountryBorderStyled;
