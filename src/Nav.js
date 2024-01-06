import { IconButton, Skeleton } from "@mui/material";
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import React, { useEffect } from 'react';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import styles from './Nav.module.scss';

const NavBar = () => {
   // const [active, setActive] = React.useState();
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
   const history = useNavigate();
   const location = useLocation();
   const [active, setActive] = React.useState(false);

   const handleClick = () => {
      history(`/${title.toLowerCase()}`);
   }

   // useEffect(() => {
   //    // check if current page is the same as the nav item
   //    if(location.pathname === `/${title.toLowerCase()}`) {
   //       setActive(true);
   //    } else {
   //       setActive(false);
   //    }
   //    return() => {
   //       setActive(false);
   //    }
   // }, [location, title]);

   // console.log(active, location.pathname, title);

   return (
      <NavLink 
         to={`/${title.toLowerCase()}`} 
         // activeClassName={styles.active}
         // activeStyle={
         // }
         //    backgroundColor: "rgba(0,0,0,0.05)"
         className={styles.navItem} 
         // onClick={handleClick} 
      
         // style={{backgroundColor: active ? "rgba(0,0,0,0.05)": "rgba(0,0,0,0) !important"}}
      >
         <IconButton className={styles.icon}>
            {icon}
         </IconButton>
         <p className={styles.title}>{title}</p>
      </NavLink>
   );
}


export default NavBar;

