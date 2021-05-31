import styled, {css} from 'styled-components'

export default styled.button`
    height: 45px;
    width: 65%;
    border-radius: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color:#003a96;
    box-shadow: 0 0px 0.5px rgba(0, 0, 0, 0.065),
                0 0px 1.2px rgba(0, 0, 0, 0.093),
                0 0px 2.5px rgba(0, 0, 0, 0.117),
                0 0px 5.1px rgba(0, 0, 0, 0.145),
                0 0px 14px rgba(0, 0, 0, 0.21);
    color:#fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    ${(props) => props.profile && 'margin-left: 10px'};
    ${(props) => props.disabled && css`
        color: #000;
        background-color:${props.theme.secondaryDash};
        pointer-events:none;
    `}

    ${(props) => props.login && css`
        margin-bottom: 30px;
        margin-top: 30px;
    `}

    ${(props) => props.logout && css`
       max-width:100px;
       display: none;
    `}

    @media only screen and (max-width: 780px) {
        ${(props) => props.logout && css`
        display: block;
    `}
    }
`
