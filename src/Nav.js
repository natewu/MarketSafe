import { IconButton, Skeleton } from "@mui/material";
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import axios from "axios";
import styles from "./Nav.module.scss";

const NavBar = () => {
   const [user, setUser] = useState('');

   useEffect(()=>{
      axios.get('http://localhost:5000/api/users/1').then((res)=>{
        setUser(res.data)
        console.log(res.data)
      })
   }, [])
  
  return (
    <nav className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <IconButton className={styles.logo}>
            <Skeleton variant="circular" width={40} height={40} />
          </IconButton>
        </div>

        <div className={styles.navItems}>
          <NavItem
            title="Dashboard"
            icon={<Skeleton variant="circular" width={40} height={40} />}
          />
          <NavItem
            title="Products"
            icon={<Skeleton variant="circular" width={40} height={40} />}
          />
          <NavItem
            title="Account"
            icon={<Skeleton variant="circular" width={40} height={40} />}
          />
          <NavItem
            title="Collections"
            icon={<Skeleton variant="circular" width={40} height={40} />}
          />
          <NavItem
            title="Settings"
            icon={<Skeleton variant="circular" width={40} height={40} />}
          />
        </div>
      </div>
      <div className={styles.account}>
        <div className={styles.accountContainer}>
          <IconButton className={styles.profilePic}>
            <PermIdentityIcon />
          </IconButton>
          <p className={styles.username}>{user.firstName ?? ''} {user.lastName ?? ''}</p>
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
