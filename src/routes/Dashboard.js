import { useEffect, useState } from "react";

import { BarChart } from "../components/BarChart";
import { ReactComponent as Comment } from "../svg/comment.svg";
import { ReactComponent as People } from "../svg/people.svg";
import { PieChart } from "../components/PieChart";
import { Skeleton } from "@mui/material";
import { ReactComponent as Ticket } from "../svg/ticket.svg";
import axios from "axios";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  const [user, setUser] = useState("");
  const [amountOfProducts, setAmountOfProducts] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/users/1").then((res) => {
      setUser(res.data);
      console.log(res.data);
    });

    axios.get("http://localhost:5000/api/products").then((res) => {
      setAmountOfProducts(res.data.length);
      console.log(res.data);
    });

  }, []);
  //   const user = "Mr. Kong";
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Welcome back, {user.firstName}! 👋</h1>
      </div>
      <div className={styles.glance}>
        <GlanceItem title="Total Reviews" value="5k" icon={<Comment />} />
        <GlanceItem title="Total Products" value={amountOfProducts} icon={<Ticket />} />
        <GlanceItem title="Total Detections" value="20" icon={<People />} />
      </div>
      <div className={styles.container}>
        <ComponentWrapper
          title="Product flagged reviews"
          component={
            <BarChart
              data={[
                ["Product", "Flagged", "Total"],
                ["p1", 1000, 1500],
                ["p2", 10, 1500],
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
                ["Bots", 11],
                ["Humans", 2],
              ]}
            />
          }
        />
      </div>
    </div>
  );
}

function GlanceItem({ title, value, icon }) {
  return (
    <div className={styles.glanceItem}>
      <div className={styles.icon}>
        {icon ? icon : <Skeleton variant="circular" width={40} height={40} />}
      </div>
      <div className={styles.info}>
        <p className={styles.value}>{value}</p>
        <p className={styles.title}>{title}</p>
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
