import styled from 'styled-components'

export default styled.h1`
    font-family: 'Nunito', sans-serif;
    font-size: ${props=>(props.small ? '12px' : '18px')};
    ${props=>(props.small && 'font-weight:900')};
    /* word-break: break-all; */
    padding-left: ${props=> (props.black ? '0' : '10px')};
    color: ${props => (props.black ? 'black' : props.blue ? '#004bc4' : '#fff')};
`