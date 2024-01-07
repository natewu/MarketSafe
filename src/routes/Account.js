// import "./Account.css";
import "bulma/css/bulma.css";

import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import axios from "axios";
import styles from "./Account.module.scss";

export default function Account() {
  //🐒
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/users/1").then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className={styles.account}>
      <div className={styles.top}>
        <h1 className={styles.header}>Account Information</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.editUser}> Edit User</h1>

          <div className={styles.userDetails} style={{ textAlign: "left" }}>
            <div className={styles.userBox}>
              <h2 className={styles.user}>
                {user.firstName} {user.lastName}
              </h2>
              <p>{user.email}@kong.inc</p>
              <img
                className={styles.avatar}
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Tongue&skinColor=Light"
                alt="avatar"
              />
            </div>
            <div className={styles.password}>
              <Button className={styles.button} variant="contained" fullWidth>
                Edit
              </Button>
              <Button className={styles.button} variant="contained" fullWidth>
                Change Password
              </Button>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.billing}>
              <div className={styles.billingBox}>
                <h2 className={styles.editBilling}>
                  Billing
                  <Button className={styles.button} variant="contained">
                    Edit
                  </Button>
                </h2>
                <div className={styles.cardDetails}>
                  <p className={styles.detail}>Card Information</p>
                  <p className={styles.value}>MasterCard ending in 1121</p>
                  <p className={styles.detail}>Name on card</p>
                  <p className={styles.value}>Allan Kong</p>
                  <p className={styles.detail}>Billing Address</p>
                  <p className={styles.value}>1234 Kong Street</p>
                </div>
              </div>
            </div>
            <div className={styles.paymentHistory}>
              <div className={styles.paymentBox}>
                <h2 className={styles.editPayment}>Payment History</h2>
                <div className={styles.paymentItems}>
                  <PaymentItem
                    date="10/10/2021"
                    amount="100.00"
                    paymentMethod="1121"
                  />
                  <PaymentItem
                    date="9/10/2021"
                    amount="100.00"
                    paymentMethod="1121"
                  />
                  <PaymentItem
                    date="8/10/2021"
                    amount="100.00"
                    paymentMethod="1121"
                  />
                  <PaymentItem
                    date="7/10/2021"
                    amount="100.00"
                    paymentMethod="1121"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentItem({ date, amount, paymentMethod }) {
  return (
    <div className={styles.historyBox}>
      <div className={styles.history}>
        <p className={styles.detail}>Date</p>
        <p className={styles.value}>{date}</p>
      </div>
      <div className={styles.history}>
        <p className={styles.detail}>Amount</p>
        <p className={styles.value}>${amount}</p>
      </div>
      <div className={styles.history}>
        <p className={styles.detail}>Payment Method</p>
        <p className={styles.value}>MasterCard ending in {paymentMethod}</p>
      </div>
    </div>
  );
}
