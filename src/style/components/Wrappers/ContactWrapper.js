import styled from 'styled-components'

export default styled.div`
    display: flex;
    padding-left: 3%;
    border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
    cursor: pointer;
    ${props=>props.active && 'background-color:'+props.theme.secondary};
    &:hover {
        background-color: ${props=>props.theme.secondary};
    }
`