/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { AuthWrapper, AuthSectionWrapper } from './auth.styles'
import Logo from '../../assets/Logo.png'

const AuthPage = ({ children }) => {
    const [width, setWidth] = useState({width: window.innerWidth});

    useEffect(() => {
        const handleResize = () => {
            setWidth({width: window.innerWidth});
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <AuthWrapper>
            <AuthSectionWrapper $width={50} $mainColour={false} $display={width.width < 600}>
                <img draggable={false} src={Logo} width="100%"/>
            </AuthSectionWrapper>
            <AuthSectionWrapper $width={width.width < 600 ? 100 : 50} $mainColour={true} $display={false}>{children}</AuthSectionWrapper>
        </AuthWrapper>
    )
}

export {
    AuthPage
}