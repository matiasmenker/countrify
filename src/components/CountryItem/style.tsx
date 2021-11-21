import styled from 'styled-components';

const CountryItemStyled = styled.div`
    transform: translate3d(0, 0, 0);
    cursor: pointer;
    .thumbnail-container-image {
        position: relative;
        height: 0;
        padding-bottom: 60%;
        overflow: hidden;
        border-radius: 8px;
        filter: brightness(0.9);
    }
    &:hover {
        .thumbnail-container-image {
            filter: brightness(1);
        }
    }

    .thumbnail-container-text {
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 8px;
        .name {
            display: flex;
            align-items: center;
            min-width: 0;
            font-weight: 700;
        }
    }
    .stats {
        font-weight: 400;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: #9e9ea7;
        font-size: 14px;
        line-height: 16px;
        svg {
            width: 20px;
            padding-right: 5px;
            fill: #9e9ea7;
        }
    }
`;

export default CountryItemStyled;
