import styled, {css} from 'styled-components'

export default styled.input `
padding-left: 30px;
padding-right: 10px;
width: ${props=>props.login ? '65%' : '100%'};
height: 45px;
border-radius: 30px;
outline: none;
border: none;
background-color: #fff;
box-shadow: 0 0px 0.5px rgba(0, 0, 0, 0.065),
            0 0px 1.2px rgba(0, 0, 0, 0.093),
            0 0px 2.5px rgba(0, 0, 0, 0.117),
            0 0px 5.1px rgba(0, 0, 0, 0.145),
            0 0px 14px rgba(0, 0, 0, 0.21);
color: #000;
font-family: 'Montserrat', sans-serif;
    
    ${props => props.search && css `
        height: 25px;
        border-radius: 20px;
        padding-left: 10px;
        color:#fff;
        font-family: 'Nunito', sans-serif;
        background-color: #00B4DB;
        ::placeholder{
            color:#fff;
        }
    `}

    ${props => props.message && css `
        height: 30px;
        border-radius: 20px;
        padding-left: 10px;
        padding-right: 35px;
    `}

`





