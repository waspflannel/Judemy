import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { logout } from '../../utils/auth'
import { AuthPage } from '../templates/auth'
import { BigHeader, HyperLinkButton } from '../templates/custom-components.styles'

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`


function Logout() {

    useEffect(()=>{
        logout()
    },[])

    return (
        <AuthPage>
            <div>
                <BigHeader>You are now<br></br>logged out</BigHeader>
                <ButtonsWrapper>
                    <HyperLinkButton to={'/login'}>Return to login</HyperLinkButton>
                    <HyperLinkButton to={'/'}>View more courses</HyperLinkButton>
                </ButtonsWrapper>
            </div>
        </AuthPage>
    )
}

export default Logout