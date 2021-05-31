import styled from 'styled-components'

export default styled.div `
    display: flex;
    justify-content: ${props=>(props.friend ? 'flex-start' : 'flex-end')};
    margin-bottom: 10px;
    margin: 0 3%;
    margin-bottom: 10px;
`