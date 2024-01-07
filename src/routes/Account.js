// import "./Account.css";
import 'bulma/css/bulma.css'

import React, { useEffect, useState } from "react";

import axios from "axios";
import styles from "./Account.module.scss";

export default function Account(){
    //🐒
    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5000/api/users/1').then((res)=>{
            setUser(res.data)
            console.log(res.data)
        })
    }, [])
    return(
        <div className={styles.account}>
            <div className={styles.top}>
                <h1 className={styles.header}>Account Information</h1>
            </div>

            <div className={styles.content}>
                <div className={styles.card}>
                    <div class="card-content" style={{textAlign: "left"}}>
                        <h2 className={styles.user}>{user.firstName} {user.lastName}</h2>
                        <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Tongue&skinColor=Light" alt="avatar" className={styles.avatar}/>
                        <div class="content">
                            <p>Email : {user.email}</p>
                            <p>Password : {user.password}</p>
                            <p>{user.description}</p>

                        </div>
                    </div>
            </div>
          </div>
        </div>
    )
}