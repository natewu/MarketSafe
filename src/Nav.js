import React from 'react';
import styles from './Nav.module.scss';

const NavBar = () => {
   return (
      <nav className={styles.wrapper}>
         <h1>Content Mod</h1>
         <h1>Account</h1>
      </nav>
   );
};

export default NavBar;
