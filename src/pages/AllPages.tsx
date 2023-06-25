/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Outlet, useLocation, useNavigate } from "react-router";
// @ts-ignore
import { Account } from "appwrite";
// @ts-ignore
import { UilEstate, UilPlusCircle, UilHistory } from "@iconscout/react-unicons";
import { useState } from "react";
import { client } from "../config/appwrite.config";

function AllPages() {
  const location = useLocation();
  const route = useNavigate();
  useState(() => {
    const handler = async () => {
      try {
        const account = new Account(client);
        const res = await account.get();
        console.log(res.$id);
        localStorage.setItem("userId", res.$id);
      } catch (error) {
        route("/auth");
      }
    };
    handler();
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
