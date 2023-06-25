import { atom } from "recoil";

const userDetails = atom({
  key: "user",
  default: {
    name: "",
    img: "",
  },
});

export {userDetails}