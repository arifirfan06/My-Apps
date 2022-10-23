import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./components/header"
import Card from "./components/card"

function App() {

const [allVillagers, updateVill] = useState([]);
const [loadApi,navigate] = useState("https://acnhapi.com/v1a/villagers")

  const getVillagers = async () => {
    const villagers = await axios(loadApi)
    return updateVill(villagers.data)
  }
  
  useEffect(() => {
    getVillagers()
  }, [])

  console.log(allVillagers)

  function createNew(vill) {
    return <Card
      // id={vill.id}
      name={vill.name["name-EUen"]}
      img={vill.image_uri}
      opt1={vill.hobby}
      opt2={vill.personality}
      opt3={vill.saying}

    />
  }

  return (
    <div className="App">
      <Header/><ul>
      {allVillagers.map(createNew)}
    </ul>
    </div>
  );
}

export default App;
