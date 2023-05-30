import { useState } from "react";
import { DetailedPokemon } from "./PokeList";

interface Props {
  pokemon: DetailedPokemon;
}

const Card = ({ pokemon }: Props) => {
  let [selectedFront, setSelectedFront] = useState<boolean>(true);
  return (
    <div key={pokemon.name} className="col-sm-6 mb-3 mb-sm-0">
      <div
        // key={pokemon.name}
        className="card"
        style={{ marginBottom: "3rem" }}
      >
        <img
          src={
            selectedFront
              ? pokemon.sprites.front_default
              : pokemon.sprites.back_default
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h3 className="card-title">{pokemon.name}</h3>
          <p className="card-text">
            This pokemon is {pokemon.height}cm high and weighs {pokemon.weight}
            lb
            {pokemon.weight > 100
              ? ` which is quite heavy for a pokemon.`
              : ` which isn't too heavy for a pokemon.`}
            It has {pokemon.abilities.length} abilities
            {pokemon.abilities.length > 0 &&
              ` its first ability is ${pokemon.abilities[0].ability.name}`}
            {pokemon.abilities.length > 1 &&
              ` and its second ability is ${pokemon.abilities[1].ability.name}.`}
          </p>
          <a
            className="btn btn-primary"
            onClick={() => {
              setSelectedFront(!selectedFront);
            }}
          >
            {selectedFront ? "see back view" : "see front view"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
