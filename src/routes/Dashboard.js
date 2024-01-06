import InventoryIcon from '@mui/icons-material/Inventory';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Skeleton } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import styles from './Dashboard.module.scss';

export function Dashboard(){
   const user = "Mr. Kong";
   return(
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <h1>Welcome back, {user}! 👋</h1>
         </div>
         <div className={styles.glance}>
            <GlanceItem title="Total Reviews" value="5k" icon={<RateReviewIcon/>} />
            <GlanceItem title="Total Products" value="500" icon={<InventoryIcon/>} />
            <GlanceItem title="Total Detections" value="20" icon={<SmartToyIcon/>} />
         </div>
         <div className={styles.container}>
            <DummyComponent/>
         </div>
   </div>
   )
}

function GlanceItem({title, value, icon}){
   return(
      <div className={styles.glanceItem}>
         <div className={styles.icon}>
            {icon ? icon : <Skeleton variant="circular" width={40} height={40} />}
         </div>
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