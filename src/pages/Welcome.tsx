/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { UilCameraPlus, UilSpinnerAlt } from "@iconscout/react-unicons";
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { createUserName, uploadFile } from "../utils/storage";
import { warningMessage } from "../utils/toast";

function Welcome() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [img, setImage] = useState<string>("");
  const [file, setFile] = useState<Blob>();
  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = URL.createObjectURL(
      (e.target as HTMLInputElement).files?.[0] as Blob
    );
    setImage(f);
    setFile((e.target as HTMLInputElement).files?.[0] as Blob);
  };
  const saveChanges = async (e: FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const name = nameRef.current.value;
      await uploadFile(file as Blob);
      await createUserName(name);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      warningMessage("Something went wrong!");
    }
  };
  return (
    <>
      <div className="welcome-container">
        <h3>Hey! Welcome</h3>
        <h6>Let's talk a bit about you!</h6>
        <form onSubmit={saveChanges}>
          <div className="profile-pic">
            <div className="img">
              <img src={img ? img : "/user.png"} alt="profilepic" />
              <input
                type="file"
                name="pic"
                id="pic"
                hidden
                ref={imgRef}
                onChange={changeImageHandler}
              />
              <label htmlFor="pic">
                <UilCameraPlus />
              </label>
            </div>
          </div>
          <input type="text" placeholder="Your name" ref={nameRef} />
          <div className="btnrow">
            {isLoading ? (
              <button disabled>
                <span>
                  <UilSpinnerAlt />
                </span>
              </button>
            ) : (
              <button>Save</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Welcome;
