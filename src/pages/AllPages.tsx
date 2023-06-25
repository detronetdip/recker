/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Outlet, useLocation, useNavigate } from "react-router";
// @ts-ignore
import { Account } from "appwrite";
// @ts-ignore
import { UilEstate, UilPlusCircle, UilHistory } from "@iconscout/react-unicons";
import { useState } from "react";
import { client } from "../config/appwrite.config";
import { getDocuments, getFile } from "../utils/storage";
import { useSetRecoilState } from "recoil";
import { userDetails } from "../context";

function AllPages() {
  const location = useLocation();
  const route = useNavigate();
  const user = useSetRecoilState(userDetails);

  const fetchUserDetails = async () => {
    try {
      const id = localStorage.getItem("userId");
      const file = await getFile(id || "");
      const res = await getDocuments(
        import.meta.env.VITE_APPWRITE_USER_COLLECTION,
        id || ""
      );
      console.log(res, file);
      user((old) => {
        return {
          ...old,
          img: file.href,
          name: res.name,
        };
      });
    } catch (error) {
      console.log("1111111111")
      route('/welcome')
    }
  };
  useState(() => {
    const handler = async () => {
      try {
        const account = new Account(client);
        const res = await account.get();
        console.log(res.$id);
        localStorage.setItem("userId", res.$id);
      } catch (error) {
        console.log("22222222222")
        route("/auth");
        throw new Error("er");
      }
    };
    handler().then(() => fetchUserDetails())
  });
  return (
    <>
      <div className="main-container">
        <div className="playground">
          <Outlet />
        </div>
        <div className="menu">
          <div
            className={location.pathname === "/" ? "home active" : "home"}
            onClick={() => route("/")}
          >
            <span>
              <UilEstate />
            </span>
            <span>Home</span>
          </div>
          <div
            className={location.pathname === "/add" ? "add active" : "add"}
            onClick={() => route("/add")}
          >
            <span>
              <UilPlusCircle />
            </span>
            <span>Add Data</span>
          </div>
          <div
            className={
              location.pathname === "/history" ? "profile active" : "profile"
            }
            onClick={() => route("/history")}
          >
            <span>
              <UilHistory />
            </span>
            <span>history</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPages;
