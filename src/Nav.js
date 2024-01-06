import { IconButton, Skeleton } from "@mui/material";
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import React, { useEffect } from 'react';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import styles from './Nav.module.scss';

const NavBar = () => {
   return (
      <nav className={styles.wrapper}>
         <div className={styles.main}>
            <div className={styles.mainContainer}>
               <IconButton className={styles.logo}>
                  <Skeleton variant="circular" width={40} height={40} />
               </IconButton>
            </div>

            <div className={styles.navItems}>
               <NavItem title="Home" icon={<Skeleton variant="circular" width={40} height={40} />} />
               <NavItem title="Account" icon={<Skeleton variant="circular" width={40} height={40} />} />
               <NavItem title="Settings" icon={<Skeleton variant="circular" width={40} height={40} />} />
            </div>
         </div>
         <div className={styles.account}>
            <div className={styles.accountContainer}>
               <IconButton className={styles.profilePic}>
                  <PermIdentityIcon />
               </IconButton>
               <p className={styles.username}>Mr. Kong</p>
            </div>
         </div>
      </nav>
   );
};

export function NavItem({title, icon}) {
   
   return (
      <NavLink 
         to={`/${title.toLowerCase()}`} 
         className={styles.navItem} 
      >
         <IconButton className={styles.icon}>
            {icon}
         </IconButton>
         <p className={styles.title}>{title}</p>
      </NavLink>
   );
}


export default NavBar;

