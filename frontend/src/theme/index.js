import { extendTheme } from '@chakra-ui/react';
import COLORS from './colors';

const theme = extendTheme({
    fonts: {
        body: 'Raleway, sans-serif',
        heading: 'Raleway, sans-serif',
        mono: 'Raleway, sans-serif',
    },
    colors: {
        primary: {
            // define all the color's shades to use it as a component's colorScheme
            100: COLORS.primary,
            200: COLORS.primary,
            300: COLORS.primary,
            400: COLORS.primary,
            500: COLORS.primary,
            600: COLORS.primaryDark,
            700: COLORS.primaryDark,
            800: COLORS.primaryDark,
            900: COLORS.primaryDark,
        },
        secondary: {
            300: COLORS.secondary,
        },
        white: {
            300: COLORS.white,
        },
        black: {
            300: COLORS.black,
        },
    },
});

export default theme;
