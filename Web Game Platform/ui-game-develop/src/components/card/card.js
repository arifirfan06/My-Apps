import React from "react";
import style from "./card.module.css";

function Card(props) {
  return (
    <div className={style.card}>
      <div className={style.top}>
        <h2 className={style.name}>{props.name}</h2>
        <img className={style["circle-img"]} src={props.img} alt="avatar_img" />
      </div>
      <div className={style.bottom}>
        <p>{props.id}</p>
        <p className={style.info}>Hobby: {props.opt1}</p>
        <p className={style.info}>Personality: {props.opt2}</p>
        <p className={style.info}>Saying: {props.opt3}</p>
      </div>
    </div>
  );
}

export default Card;
