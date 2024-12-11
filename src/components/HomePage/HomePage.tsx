import ContentContainer from "../BaseComponents/ContentContainer";
import HomePageContent from "./HomePageContent";
import HomePageTitle from "./HomePageTitle";


const HomePage = () => {
    return (
        <ContentContainer
            title={<HomePageTitle />}
            content={<HomePageContent />}
        />
    );
}

export default HomePage;