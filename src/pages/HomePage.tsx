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
import { listDocuments } from "../utils/storage";
import { useRecoilValue } from "recoil";
import { userDetails } from "../context";

function HomePage() {
  const user = useRecoilValue(userDetails);
  const navigate = useNavigate();
  const [data, setData] = useState<
    { date: string; Total: number; Score: number }[]
  >([]);
  const [percentageData, setPercentageData] = useState<
    { date: string; Percentage: number }[]
  >([]);

  const getDataForGraph = async () => {
    try {
      const userId = localStorage.getItem("userId");
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
      console.log("not found");
    }
  };

  useEffect(() => {
    const handler = async () => {
      await getDataForGraph();
    };
    handler();
  }, []);

  return (
    <>
      <div className="home">
        <div className="profile-bar">
          <div className="profile-icon">
            <img src={user.img ? user.img : "/user.png"} alt="profile" />
          </div>
        </div>
        <div className="welcome-message">
          <h6>Hello, {user.name && user.name.split(" ")[0]} !</h6>
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
