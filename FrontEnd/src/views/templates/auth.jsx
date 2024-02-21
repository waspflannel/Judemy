/* eslint-disable react/prop-types */
import React from 'react'
import { AuthWrapper, AuthSectionWrapper } from './auth.styles'
import Logo from '../../assets/Logo.png'

const AuthPage = ({ children }) => {


    return (
        <AuthWrapper>
            <AuthSectionWrapper $width={50} $mainColour={false}>
                <img src={Logo} width="100%"/>
            </AuthSectionWrapper>
            <AuthSectionWrapper $width={50} $mainColour={true}>{children}</AuthSectionWrapper>
        </AuthWrapper>
    )
}

export {
    AuthPage
}