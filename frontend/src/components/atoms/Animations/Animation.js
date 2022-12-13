import React, { useRef } from 'react';
import Lottie from 'lottie-react';

const Animation = ({ style = {}, animationData }) => {
    const lottieRef = useRef();

    return (
        <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay
            style={style}
            onEnterFrame={(frame) => {
                const totalTime = frame.totalTime;
                const currentTime = frame.currentTime;
                if (currentTime >= totalTime - 30) {
                    lottieRef.current.pause();
                }
            }}
            onMouseEnter={() => {
                lottieRef.current.goToAndPlay(0);
            }}
        />
    );
};

export default Animation;
