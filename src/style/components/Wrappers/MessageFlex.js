import styled from 'styled-components'

export default styled.div`
    max-width: 70%;
    ${props=>props.left && 'display: flex'};
    ${props=>props.left && 'align-items: flex-end'};
`