import { IconButton } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React from 'react';
import styles from './Nav.module.scss';

const NavBar = () => {
   return (
      <nav className={styles.wrapper}>
         <h1>Content Mod</h1>
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

export default NavBar;
