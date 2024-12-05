import { createTheme } from "@mui/material";
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from "./Colors";


const myTheme = createTheme({
    palette:{
        primary:{
            main: PRIMARY_COLOR
        },
        secondary:{
            main: SECONDARY_COLOR
        },
        text:{
            primary: TEXT_COLOR,
            secondary: SECONDARY_COLOR
        }
    },
    typography:{
        h1:{
            color: SECONDARY_COLOR
        },
        h2:{
            color: SECONDARY_COLOR
        },
        h3:{
            color: SECONDARY_COLOR
        },
    }
});


export default myTheme;