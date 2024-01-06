import { Skeleton } from "@mui/material";
import styles from './Dashboard.module.scss';

export function Dashboard(){
   const user = "Mr. Kong";
   return(
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <h1>Welcome back, {user}! 👋</h1>
         </div>
         <div className={styles.glance}>
            <GlanceItem title="Total Products" value="5" />
            <GlanceItem title="Total Orders" value="5" />
            <GlanceItem title="Total Revenue" value="5" />
         </div>
         <div className={styles.container}>
            <DummyComponent/>
         </div>
   </div>
   )
}

function GlanceItem({title, value}){
   return(
      <div className={styles.glanceItem}>
         <Skeleton 
            variant="circular" 
            width={40} 
            height={40} 
            className={styles.icon}
         />
         <div className={styles.info}>
               <p className={styles.value}>{value}</p>
               <p className={styles.title}>{title}</p>
         </div>
      </div>
   )
}

function DummyComponent(){
   return(
      <div className={styles.dummy}>
         <h1>Dummy Component</h1>
      </div>
   )
}