/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import moment from "moment";
// @ts-ignore
import { Query } from "appwrite";
// @ts-ignore
import { UilTrashAlt } from "@iconscout/react-unicons";
import { deleteDocument, listDocuments } from "../utils/storage";

function History() {
  const [history, setHistory] = useState<any>([]);
  useEffect(() => {
    const handler = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await listDocuments(
          import.meta.env.VITE_APPWRITE_DATA_COLLECTION,
          [Query.equal("userId", [userId])]
        );
        console.log(data);
        setHistory(data.documents);
      } catch (error) {
        console.log(error);
      }
    };
    handler();
  }, []);
  const deleteRecord = async (key: string) => {
    try {
      await deleteDocument(key);
      setHistory(history.filter((h: { $id: string }) => h.$id != key));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="history-container">
        {history.map((h: any) => (
          <div className="history">
            <div className="left">
              <div className="top">
                <span>
                  Total: <b>{h.total}</b>
                </span>
                <span>
                  Score: <b>{h.score}</b>
                </span>
              </div>
              <div className="bottom">{moment(h.date).format("l, hh:mm")}</div>
            </div>
            <div className="right">
              <span onClick={() => deleteRecord(h.$id)}>
                <UilTrashAlt />
              </span>
            </div>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default History;
