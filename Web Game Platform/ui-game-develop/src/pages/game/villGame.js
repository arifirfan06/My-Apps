import React, { useState, useMemo } from "react";
import Card from "../../components/card/card";
import allvill from "./allVill";
import style from "./villager.module.css";

export default function Villagers(props) {
  const [allVillagers, updateVill] = useState(allvill);
  const [result, updateResult] = useState([
    "Player 1 Menang",
    "Player 2 Menang",
    "Hasil seimbang"
  ]);

  // console.log(allVillagers);

  let random = allVillagers[Math.floor(Math.random() * allVillagers.length)];
  let random2 = allVillagers[Math.floor(Math.random() * allVillagers.length)];

  const [player1, showResult] = useState(false);
  const [player2, showResult2] = useState(false);
  const [visibility, showWinner] = useState(false);
  const [battle, view] = useState();

  const Card1 = React.useMemo(() => {
    return (
      <div>
        <Card
          name={random.name["name-EUen"]}
          img={random.image_uri}
          opt1={random.hobby}
          opt2={random.personality}
          opt3={random.saying}
        />
        <h2>
          {random.name["name-EUen"]} power is {random.id * 10}
        </h2>
      </div>
    );
  }, []);

  const Card2 = React.useMemo(() => {
    return (
      <div>
        <Card
          name={random2.name["name-EUen"]}
          img={random2.image_uri}
          opt1={random2.hobby}
          opt2={random2.personality}
          opt3={random2.saying}
        />
        <h2>
          {random2.name["name-EUen"]} power is {random2.id * 10}
        </h2>
      </div>
    );
  }, []);

  function theWinner() {
    if (player1 === true && player2 === true) {
      showWinner((current) => !current);
    }
  }

  const showCard = () => {
    showResult(true);
    theWinner();
  };

  const showCard2 = () => {
    showResult2(true);
    theWinner();
  };

  const power1 = React.useMemo(() => {
    return random.id;
  }, []);
  const power2 = React.useMemo(() => {
    return random2.id;
  }, []);

  const BattleResult = () => {
    // const power1 = random.id;
    // const power2 = random2.id;
    const Power1 = React.useMemo(() => {
      return random.id;
    }, []);
    const Power2 = React.useMemo(() => {
      return random2.id;
    }, []);
    if (player1 === true && player2 === true) {
      if (Power1 > Power2) {
        return "Player 1 Win!";
      } else if (Power1 < Power2) {
        return "Player 2 Win!";
      } else {
        return "Draw";
      }
    }
    console.log(power1);
    console.log(power2);
  };
  // console.log(power1);
  // console.log(power2);
  console.log(visibility);

  return (
    <div>
      <h1 className={style.result}>{BattleResult()}</h1>
      <div className={style.Villager}>
        <div className={style["player-1"]}>
          <h1>Player 1</h1>
          {player1 && Card1}
          <button onClick={showCard}>Call Villager!</button>
        </div>
        <div className={style["player-2"]}>
          <h1>Player 2</h1>
          {player2 && Card2}
          <button onClick={showCard2}>Call Villager!</button>
        </div>
      </div>
    </div>
  );
}
