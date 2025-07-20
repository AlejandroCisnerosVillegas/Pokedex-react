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
    <div className={css.card}>
      <img
        src={itemPokemon?.sprites?.other["official-artwork"]?.front_default}
        alt="Pokemon"
      />
      <div className={css.sub_card}>
        <strong className={css.id_card}>001</strong>
        <strong className={css.name_card}>name</strong>
        <h4 className={css.altura_poke}>10cm</h4>
        <h4 className={css.peso_poke}>peso</h4>
        <h4 className={css.habitat_poke}>habitat</h4>
      </div>
    </div>
  );
}
