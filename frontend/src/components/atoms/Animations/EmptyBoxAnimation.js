import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../assets/animations/empty-box.json';

export default function EmptyBoxAnimation({ style = {} }) {
    return <Lottie animationData={animationData} loop autoplay style={style} />;
}
