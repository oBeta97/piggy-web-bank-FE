import { Box } from "@mui/material";
import { PRIMARY_COLOR } from "../../modules/Colors";

interface IContentBoxProps {
    content: JSX.Element
}

const BaseBox = (props: IContentBoxProps) => {
    return (
    
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid ' + PRIMARY_COLOR,
                borderRadius: '25px',
                width:{
                    xs: '90%',
                    sm: '80%',
                    md: '60%',
                    lg: '50%'                    
                },
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
            }}
        >
            {props.content}
        </Box>
    
    );
}

export default BaseBox;