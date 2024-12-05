import { Container } from "@mui/material";

interface IContentContainerProps {
    title: JSX.Element
    content: JSX.Element
}

const ContentContainer = (props: IContentContainerProps) => {
    return (

        <Container
            disableGutters
            maxWidth={false}
            sx={{
                height: '100vh',
                paddingTop: '5em',
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
            }}
        >
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    height: '15%'
                }}
            >
                {props.title}
            </Container>

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:"center",
                    flexGrow:1,
                    width: '100vw',
                    zIndex:1
                }}
            >
                {props.content}
            </Container>
        </Container>

    );
}

export default ContentContainer;