/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from "moment";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";
//@ts-ignore
import { Query } from "appwrite";
import { getDocuments, getFile, listDocuments } from "../utils/storage";

function HomePage() {
  const navigate = useNavigate();
  const [pic, setPic] = useState("");
  const [name, setName] = useState("user");
  const [data, setData] = useState<
    { date: string; Total: number; Score: number }[]
  >([]);
  const [percentageData, setPercentageData] = useState<
    { date: string; Percentage: number }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        await getDocuments(
          import.meta.env.VITE_APPWRITE_USER_COLLECTION,
          userId || ""
        );
        const file = await getFile(userId || "");
        setPic(file.href);
      } catch (error) {
        if(localStorage.getItem('userId')){
          navigate("/welcome");
        }else{
          navigate("/auth");
        }
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await getDocuments(
          import.meta.env.VITE_APPWRITE_USER_COLLECTION,
          userId || ""
        );
        setName(res.name);
        const data = await listDocuments(
          import.meta.env.VITE_APPWRITE_DATA_COLLECTION,
          [Query.equal("userId", [userId])]
        );

        const ref = [],
          refPercen = [];
        for (const e of data.documents) {
          ref.push({
            date: `${moment(e.date).format("l, h:mm")}`,
            Total: +e.total,
            Score: +e.score,
          });
          refPercen.push({
            date: `${moment(e.date).format("l, h:mm")}`,
            Percentage: Math.round((+e.score * 100) / +e.total),
          });
        }
        setData(ref);
        setPercentageData(refPercen);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="home">
        <div className="profile-bar">
          <div className="profile-icon">
            <img src={pic ? pic : "/user.png"} alt="profile" />
          </div>
        </div>
        <div className="welcome-message">
          <h6>Hello, {name.split(" ")[0]} !</h6>
          <h4>{moment().format("dddd, Do")}</h4>
        </div>
        <div className="progress">
          <h4>Score graph</h4>
          <div className="chart">
            {data[0] != undefined ? (
              <ResponsiveContainer width="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 50,
                    right: 0,
                    left: -30,
                    bottom: -30,
                  }}
                >
                  <CartesianGrid strokeDasharray="0.3 0.3" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis fontSize={14} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Score" stroke="#03fc6b" />
                  <Line type="monotone" dataKey="Total" stroke="#03a5fc" />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </div>
          <br />
          <br />
          <br />
          <br />
          <h4>Percentile graph</h4>
          <div className="chart">
            {percentageData[0] != undefined ? (
              <ResponsiveContainer width="100%">
                <LineChart
                  height={300}
                  data={percentageData}
                  margin={{
                    top: 50,
                    right: 30,
                    left: -30,
                    bottom: -30,
                  }}
                >
                  <CartesianGrid strokeDasharray="0.3 0.3" />
                  <XAxis dataKey="date" fontSize={10} />
                  <YAxis fontSize={14} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Percentage" stroke="#03fc6b" />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </div>
          <br />
          <br />
          <p className="watermark">
            <span
              className="v"
              onClick={() => navigate("/updates")}
            >{`V 1.1.0`}</span>
          </p>
          <p className="watermark">
            #Developed By <span>Ayondip Jana</span>
          </p>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default HomePage;
