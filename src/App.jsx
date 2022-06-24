import './app.css'
import { useEffect, useState } from "react";

const tipos = {
  artifacts: "Artefactos",
  boss: "Jefe",
  characters: "Personajes",
  consumables: "Consumibles",
  domains: "Dominios",
  elements: "Elementos",
  enemies: "Enemigos",
  materials: "Materiales",
  nations: "Naciones",
  weapons: "Armas",
};

function App() {
  const [genshinState, setGenshinState] = useState({
    types: [],
  });

  const fetchGenshinApi = async (item, url = "https://api.genshin.dev/") => {
    const respuesta = await fetch(url);
    const respJson = await respuesta.json();

    if (item === "types") {
      setGenshinState({
        ...genshinState,
        types: respJson.types,
      });
    } else {
      setGenshinState({
        ...genshinState,
        [item]: respJson,
      });
    }

    //console.log({ types });
  };

  useEffect(()=>{
    fetchGenshinApi("types");
  }, []);

  const handleChangeType = ({ target }) => {
    const url = `https://api.genshin.dev/${target.value}`;
    fetchGenshinApi(target.value, url);
  };

  return (
    <div>
      <h3>Genshin Api App</h3>
      <hr />
      <div className='alinear'>
        <select name="types" onChange={handleChangeType}>
        <option value="">Seleccione un elemento</option>
        {genshinState.types.map((type) => (
          <option key={type} value={type}>
            {tipos[type]}
          </option>
        ))}
      </select>
      {
        genshinState.artifacts && <select name="artifacts" >
          <option value="">Selecione un set de artefactos</option>
          {genshinState.artifacts.map((artifacts)=>(
            <option key={artifacts} value={artifacts}>
              {artifacts}
            </option>
          ))}
        </select>
      }
      {
        genshinState.characters && <select name="characters" >
          <option value="">Selecione un set de artefactos</option>
          {genshinState.characters.map((characters)=>(
            <option key={characters} value={characters}>
              {characters}
            </option>
          ))}
        </select>
      }
      </div>
      
    </div>
  );
}

export default App;
