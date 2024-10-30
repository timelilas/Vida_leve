import React from 'react';
import { Image } from 'react-native';
import styles from './style/Logo.style';

const Logo = () => {
    return(
        <Image source={require('../assets/logo_V2.png')} style={styles.logo} />
    )
}

export default Logo