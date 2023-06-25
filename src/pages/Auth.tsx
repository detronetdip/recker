/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Account } from "appwrite";
import { client } from "../config/appwrite.config";
import { useNavigate } from "react-router";
function Auth() {
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    try {
      const account = new Account(client);
      const res = await account.createOAuth2Session(
        "google",
        "https://recker.vercel.app/"
      );
      console.log(res.$id);
    } catch (error) {
      navigate("/auth");
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="logo">
          <img src="/android-chrome-512x512.png" alt="" />
          <h4>Welcome to Recker!</h4>
          <span>Your personal <b>REC</b>ord tra<b>CKER</b></span>
        </div>
        <div className="form">
          <div className="google-btn" onClick={loginWithGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
