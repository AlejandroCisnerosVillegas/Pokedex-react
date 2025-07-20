import React, { useEffect, useState } from "react";
import css from "./card.module.scss";
import axios from "axios";
import { URL_POKEMON } from "../../../api/apiRest";

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  console.log(itemPokemon);
  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);
      setItemPokemon(api.data);
    };
    dataPokemon();
  }, []);
  return (
    <div>
      <img
        src={itemPokemon?.sprites?.other["official-artwork"]?.front_default}
        alt="Pokemon"
      />
    </div>
  );
}
