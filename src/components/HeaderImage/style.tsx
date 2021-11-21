import styled from 'styled-components';

const HeaderImageStyled = styled.div`
    position: relative;
    width: 100%;
    min-height: 400px;
    max-height: 500px;
    background-color: #cb899a;
    background-image: url(https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2103&q=80);
    background-size: cover;
    background-position: bottom;

    .header-image-container {
        @media (min-width: 500px) {
            top: 50%;
            transform: translateY(-70%);
        }

        position: absolute;
        top: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        padding: 0 16px;
        color: #fff;
        text-align: center;
    }

    .title {
        font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 48px;
        font-weight: 700;
        line-height: 56px;
    }
`;

export default HeaderImageStyled;
