import styled, {css} from 'styled-components'

export default styled.img`
    width: ${props=>(props.small ? '35px' : props.profile ? '120px' : '50px')};
    height: ${props=>(props.small ? '35px' : props.profile ? '120px' : '50px')};
    border-radius: 50%;
    object-fit: cover;

    @media only screen and (max-width: 450px) {
        ${props => (props.chat && css`
            width: 25px;
            height: 25px;
        ` )}
    }
`