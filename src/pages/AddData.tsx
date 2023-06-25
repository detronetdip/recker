/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from "moment";
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
// @ts-ignore
import { UilArrowLeft } from "@iconscout/react-unicons";
import Ask from "../components/Ask";
//@ts-ignore
import { Databases, ID } from "appwrite";
import { client } from "../config/appwrite.config";

function AddData() {
  const totalRef = useRef() as MutableRefObject<HTMLInputElement>;
  const scoreRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [formState, setFormState] = useState(0);
  const addData = async (e: FormEvent) => {
    e.preventDefault();
    let date = null;
    if (formState === 1) {
      date = moment().format("MMMM Do YYYY, h:mm:ss a");
    } else {
      const d = `${dateRef.current.value} ${timeRef.current.value}`;
      date = moment(d, "YYYY-MM-DD, hh:mm").format("MMMM Do YYYY, h:mm:ss a");
    }

    const total = totalRef.current.value;
    const score = scoreRef.current.value;

    if (!total || !score) {
      toast.error("All fields are mandatory!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    totalRef.current.value = "";
    formState === 2 ? (dateRef.current.value = "") : null;
    scoreRef.current.value = "";
    try {
      const db = new Databases(client);
      const userId = localStorage.getItem("userId");
      const result = await db.createDocument(
        "6497d8302ea71dde355c",
        "64980c702c065bcc1b24",
        ID.unique(),
        {
          userId,
          date,
          total,
          score,
        }
      );
      console.log(result);
      toast.success("Added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Data already exist!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div className="add-data-continer">
        {formState === 0 ? (
          <Ask trigger={setFormState} />
        ) : formState === 1 ? (
          <form onSubmit={addData}>
            <h4>Add today's data</h4>
            <input type="number" placeholder="Total marks" ref={totalRef} />
            <input type="number" placeholder="Total score" ref={scoreRef} />
            <button>Add</button>
            <span onClick={() => setFormState(0)}>
              <UilArrowLeft /> Go back
            </span>
          </form>
        ) : (
          <form onSubmit={addData}>
            <h4>Add past data</h4>
            <input type="date" placeholder="Date" ref={dateRef} />
            <input type="time" placeholder="Date" ref={timeRef} />
            <input type="number" placeholder="Total marks" ref={totalRef} />
            <input type="number" placeholder="Total score" ref={scoreRef} />
            <button>Add</button>
            <span onClick={() => setFormState(0)}>
              <UilArrowLeft /> Go back
            </span>
          </form>
        )}
      </div>
    </>
  );
}

export default AddData;
