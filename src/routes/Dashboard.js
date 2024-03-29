import { useEffect, useState } from "react";

import { BarChart } from "../components/BarChart";
import { ReactComponent as Comment } from "../svg/comment.svg";
import { ReactComponent as People } from "../svg/people.svg";
import { PieChart } from "../components/PieChart";
import { Skeleton } from "@mui/material";
import { ReactComponent as Ticket } from "../svg/ticket.svg";
import axios from "axios";
import styles from "./Dashboard.module.scss";

function GlanceItem({ title, value, icon }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let startValue = animatedValue;
    const finalValue = value;
    const increment = finalValue > startValue ? 1 : 0;
    const intervalTime = Math.abs(finalValue - startValue) > 30 ? 10 : 50;

    const interval = setInterval(() => {
      startValue += increment;
      setAnimatedValue(startValue);

      if (
        (increment > 0 && startValue >= finalValue) ||
        (increment < 0 && startValue <= finalValue)
      ) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={styles.glanceItem}>
      <div className={styles.icon}>
        {icon ? icon : <Skeleton variant="circular" width={40} height={40} />}
      </div>
      <div className={styles.info}>
        <p className={styles.value}>{animatedValue}</p>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [user, setUser] = useState("");
  const [amountOfProducts, setAmountOfProducts] = useState(0);
  const [amountOfReview, setAmountOfReview] = useState(0);
  const [amountOfDetections, setAmountOfDetections] = useState(0);
  const [bots, setBots] = useState(0);

  function filterDetection(detections) {
    return detections.filter((detection) => detection.detectedFlag === true);
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/users/1").then((res) => {
      setUser(res.data);
      console.log(res.data);
    });

    axios.get("http://127.0.0.1:5000/api/products").then((res) => {
      setAmountOfProducts(res.data.length);
      console.log(res.data);
    });

    axios.get("http://127.0.0.1:5000/api/reviews").then((res) => {
      setAmountOfReview(res.data.length);
      console.log(res.data);
      setAmountOfDetections(filterDetection(res.data).length);
      console.log(filterDetection(res.data).length);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Welcome back, {user.firstName}! 👋</h1>
      </div>
      <div className={styles.glance}>
        <GlanceItem
          title="Total Reviews"
          value={amountOfReview}
          icon={<Comment />}
        />
        <GlanceItem
          title="Total Products"
          value={amountOfProducts}
          icon={<Ticket />}
        />
        <GlanceItem
          title="Total Detections"
          value={amountOfDetections}
          icon={<People />}
        />
      </div>
      <div className={styles.container}>
        <ComponentWrapper
          title="Product flagged reviews"
          component={
            <BarChart
              data={[
                ["Product", "Flagged", "Total"],
                ["1", 10, 15],
                ["2", 5, 15],
              ]}
            />
          }
        />
        <ComponentWrapper
          title="Total bots"
          component={
            <PieChart
              data={[
                ["Category", "Number"],
                ["Bots", amountOfDetections],
                [
                  "Humans",
                  amountOfReview - amountOfDetections > 0
                    ? amountOfReview - amountOfDetections
                    : 1,
                ],
              ]}
            />
          }
        />
      </div>
    </div>
  );
}

export function ComponentWrapper(props) {
  return (
    <div className={styles.component_wrapper}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.component}
    </div>
  );
}
