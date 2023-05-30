import { useEffect, useState } from "react";
import Card from "./Card";

interface Pokemon {
  name: string;
  url: string;
}

export interface DetailedPokemon {
  sprites: { front_default: string; back_default: string };
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

const PokeList = () => {
  let [detailedPokemons, setDetailedPokemons] = useState<DetailedPokemon[]>([]);
  useEffect(() => {
    const fetchDetailedData = async (url: string) => {
      const detailedResponse = await fetch(url);
      let detailedResult = await detailedResponse.json();
      return detailedResult;
    };

    const fetchData = async () => {
      let tempDetailedPokemons: DetailedPokemon[] = [];
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5`);
      let results = await response.json();
      results.results.forEach(async (poke: Pokemon) => {
        let detail = await fetchDetailedData(poke.url);
        console.log(detail);
        tempDetailedPokemons = [...tempDetailedPokemons, detail]; //if we used useState here we would only get last pokemon
        setDetailedPokemons(tempDetailedPokemons);
      });
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="container text-center">
      <div className="row">
        {detailedPokemons.map((item) => (
          <Card pokemon={item} key={item.name}></Card>
        ))}
      </div>
    </div>
  );
};

export default PokeList;
