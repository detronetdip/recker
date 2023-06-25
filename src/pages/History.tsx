/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IndexedDBStorage } from "../utils/storage";
import moment from "moment";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UilTrashAlt } from "@iconscout/react-unicons";

function History() {
  const [history, setHistory] = useState<any>([]);
  useEffect(() => {
    const handler = async () => {
      try {
        const db = new IndexedDBStorage("record", "scores");
        await db.openDatabase();
        const data = await db.getAllData();
        db.closeDatabase();
        setHistory(data);
      } catch (error) {
        console.log(error);
      }
    };
    handler();
  }, []);
  const deleteRecord = async (key: string) => {
    try {
      const db = new IndexedDBStorage("record", "scores");
      await db.openDatabase();
      await db.deleteData(key);
      db.closeDatabase();
      setHistory(history.filter((h: { date: string }) => h.date != key));
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
              <div className="bottom">{moment(h.date,'MMMM Do YYYY, h:mm:ss a').format("l, hh:mm")}</div>
            </div>
            <div className="right">
              <span onClick={() => deleteRecord(h.date)}>
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
