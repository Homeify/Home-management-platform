import { useEffect, useState } from 'react';
import { windowWidthMobile } from '../utils/constants';

const useWindowWidth = () => {
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= windowWidthMobile
    );

    const handleResize = () => {
        setWinWidth(window.innerWidth);
        setIsMobile(window.innerWidth <= windowWidthMobile);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize, false);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        winWidth,
        isMobile,
    };
};

export default useWindowWidth;
