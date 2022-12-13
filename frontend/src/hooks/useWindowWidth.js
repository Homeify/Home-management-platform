import { useEffect, useState } from 'react';
import {
    WINDOW_WIDTH_MOBILE,
    WINDOW_WIDTH_SMALL,
    WINDOW_WIDTH_MEDIUM,
} from '../utils/constants';

const useWindowWidth = () => {
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= WINDOW_WIDTH_MOBILE
    );
    const [isSmall, setIsSmall] = useState(
        window.innerWidth <= WINDOW_WIDTH_SMALL
    );
    const [isMedium, setIsMedium] = useState(
        WINDOW_WIDTH_SMALL < window.innerWidth &&
            window.innerWidth <= WINDOW_WIDTH_MEDIUM
    );

    const handleResize = () => {
        setWinWidth(window.innerWidth);
        setIsMobile(window.innerWidth <= WINDOW_WIDTH_MOBILE);
        setIsSmall(window.innerWidth <= WINDOW_WIDTH_SMALL);
        setIsMedium(WINDOW_WIDTH_SMALL < window.innerWidth && window.innerWidth <= WINDOW_WIDTH_MEDIUM);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        winWidth,
        isMobile,
        isSmall,
        isMedium,
    };
};

export default useWindowWidth;
