import BaseBox from "../BaseComponents/BaseBox";
import SigninForm from "./SigninForm";


const SigninBox = () => {
    return (
        <BaseBox content={
            <SigninForm />
        } />
    );
}


export default SigninBox;