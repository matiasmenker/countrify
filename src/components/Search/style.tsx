import styled from 'styled-components';

const SearchStyled = styled.div`
    z-index: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    text-align: center;

    .search-input-container {
        z-index: 1;
        width: 100%;
        max-width: 628px;
        margin: 0 auto;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .search-input-with-dropdown {
        display: flex;
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -ms-flex-align: center;
        align-items: center;
        height: 64px;
        border-radius: 8px;
        background: #fff;
        -webkit-box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
        box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
    }
    .left-side-wrapper {
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -ms-flex: 1;
        flex: 1;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        padding-left: 28px;
    }
    .search-icon {
        width: 16px;
        height: 16px;
        color: #9e9ea7;
        fill: currentColor;
        position: absolute;
        left: 30px;
        top: 25px;
    }
    .search-input-form {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .search-input {
        height: 100%;
        padding-right: 24px;
        padding-left: 60px;
        background: #fff;
        font-size: 16px;
        border: 1px solid transparent;
    }
`;

export default SearchStyled;
