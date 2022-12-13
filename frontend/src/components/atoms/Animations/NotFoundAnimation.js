import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../assets/animations/search_empty.json';

export default function NotFoundAnimation({ style = {} }) {
    return <Lottie animationData={animationData} loop autoplay style={style} />;
}
