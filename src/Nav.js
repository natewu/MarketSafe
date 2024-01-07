import { IconButton, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as Collections } from "./svg/collections.svg";
import { ReactComponent as Dash } from "./svg/dashboard.svg";
import { ReactComponent as Logo } from "./svg/logo.svg";
import { NavLink } from "react-router-dom";
import { ReactComponent as Profile } from "./svg/Profile.svg";
import { ReactComponent as Settings } from "./svg/settings.svg";
import { ReactComponent as Ticket } from "./svg/ticket.svg";
import axios from "axios";
import styles from "./Nav.module.scss";

const NavBar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/users/1").then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <IconButton className={styles.logo}>
            {/* <Skeleton variant="circular" width={40} height={40} /> */}
            <Logo style={{width:64, height:64, borderRadius:"50%"}}/>
          </IconButton>
        </div>

        <div className={styles.navItems}>
          <NavItem
            title="Dashboard"
            icon={<Dash width={40} height={40} style={{padding: "3px"}}/>}
          />
          <NavItem
            title="Products"
            icon={<Ticket width={40} height={40} style={{padding: "3px"}}/>}
          />
          <NavItem
            title="Account"
            icon={<Profile width={40} height={40} style={{padding: "6px"}}/>}
          />
          <NavItem
            title="Collections"
            icon={<Collections width={40} height={40} style={{padding: "3px"}}/>}
          />
          <NavItem
            title="Settings"
            icon={<Settings width={40} height={40} style={{padding: "3px"}}/>}
          />
        </div>
      </div>
      <div className={styles.account}>
        <div className={styles.accountContainer}>
          <IconButton className={styles.profilePic}>
            <img
              className={styles.avatar}
              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Tongue&skinColor=Light"
              alt="avatar"
            />
          </IconButton>
          <p className={styles.username}>
            {user.firstName ?? ""} {user.lastName ?? ""}
          </p>
        </div>
      </div>
    </nav>
  );
};

export function NavItem({ title, icon }) {
  return (
    <NavLink to={`/${title.toLowerCase()}`} className={styles.navItem}>
      <IconButton className={styles.icon}>{icon}</IconButton>
      <p className={styles.title}>{title}</p>
    </NavLink>
  );
}

export default NavBar;
