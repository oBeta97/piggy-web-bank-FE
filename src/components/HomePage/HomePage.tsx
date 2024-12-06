import ContentContainer from "../BaseComponents/ContentContainer";
import HomePageTitle from "./HomePageTitle";


const HomePage = () => {
    return (
        <ContentContainer
            title={<HomePageTitle />}
            content={<h1>cccccciao</h1>}
        />
    );
}

export default HomePage;