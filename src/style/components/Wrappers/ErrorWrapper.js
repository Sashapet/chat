import styled,{css} from 'styled-components'

export default styled.div`
    min-height: 50px;
    padding: 10px;
    overflow-wrap: break-word;
    ${props => props.profile && css`
        padding: 0;
        padding-top: 20px;
    `}
`