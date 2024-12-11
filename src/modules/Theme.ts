import { createTheme } from "@mui/material";
import { MENU_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, WARNING_COLOR } from "./Colors";


const myTheme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR
        },
        secondary: {
            main: SECONDARY_COLOR
        },
        warning:{
            main: WARNING_COLOR
        },
        text: {
            primary: TEXT_COLOR,
            secondary: SECONDARY_COLOR
        },
        background: {
            paper: MENU_COLOR,
        },
    },
    typography: {
        h1: {
            color: SECONDARY_COLOR
        },
        h2: {
            color: SECONDARY_COLOR
        },
        h3: {
            color: SECONDARY_COLOR
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                color: 'secondary',
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: SECONDARY_COLOR,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: SECONDARY_COLOR,
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: SECONDARY_COLOR,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'secondary', // Colore dell'icona
                },
            },
        },
    },
});


export default myTheme;