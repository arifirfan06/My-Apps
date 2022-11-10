import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import style from "./content.module.css";
import game1 from "../../asset/comp-game.png"
import game2 from "../../asset/board-game.png"
import game3 from "../../asset/podium.png"
import game4 from "../../asset/game-over.png"
import { Link } from "react-router-dom";

export default function OutlinedButtons() {

 const [onMouseBtn,showHide] = useState(false)
 const [onMouseBtn2,showHide2] = useState(false)
 const [onMouseBtn3,showHide3] = useState(false)
 const [onMouseBtn4,showHide4] = useState(false)

  function showImg() {
    showHide(current => !current)
  }

  function showImg2() {
    showHide2(current => !current)
  }

  function showImg3() {
    showHide3(current => !current)
  }

  function showImg4() {
    showHide4(current => !current)
  }

  useEffect(() => {
    document.body.classList.add(style.content);

    return function cleanup() {
      document.body.classList.remove(style.content);
    };
  }, []);

  return (
    <div>
    <div
      className={style.buttons}
    > <Link to='/apps/game' style={{textDecoration: "none"}}>
      <Button onMouseOver={showImg} onMouseOut={showImg} sx={{color:"black", border: "1px solid rgba(5, 5, 5, 0.5)", margin:"10px"}} className="button1" variant="outlined">
        Play Games
      </Button>
      </Link>
      <Link to='/apps/score' style={{textDecoration: "none"}}>
      <Button onMouseOver={showImg2} onMouseOut={showImg2} sx={{color:"black", border: "1px solid rgba(5, 5, 5, 0.5)", margin:"10px"}} className="button2" variant="outlined">
        Scores
      </Button></Link>
      <Button onMouseOver={showImg3} onMouseOut={showImg3} sx={{color:"black", border: "1px solid rgba(5, 5, 5, 0.5)", margin:"10px"}} className="button3" variant="outlined">
        How to play
      </Button>
      <Button onMouseOver={showImg4} onMouseOut={showImg4} sx={{color:"black", border: "1px solid rgba(5, 5, 5, 0.5)", margin:"10px"}} className="button4" variant="outlined">
        Log out
      </Button>
    </div>
    <img className={style['content-img']} style={{ visibility: onMouseBtn ? "visible" : "hidden" }} src={game1}></img>
    <img className={style['content-img']} style={{ visibility: onMouseBtn2 ? "visible" : "hidden" }} src={game3}></img>
    <img className={style['content-img']} style={{ visibility: onMouseBtn3 ? "visible" : "hidden" }} src={game2}></img>
    <img className={style['content-img']} style={{ visibility: onMouseBtn4 ? "visible" : "hidden" }} src={game4}></img>
  </div>
  );
}
