import React, { useEffect, useState } from "react";
import css from "./layout.module.scss";
import Header from "../header/Header";
import axios from "axios";
import * as Falcons from "react-icons/fa";
import { URL_POKEMON } from "../../../api/apiRest";
import Card from "../Card/Card";

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}/?offset=${xp}&limit=${limit}`
      );
      setArrayPokemon(apiPoke.data.results);
    };
    api();
    getGlobalPokemon();
  }, [xpage]);
  const getGlobalPokemon = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);
    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });
    const resut = await Promise.all(promises);
    setGlobalPokemon(resut);
  };
  console.log(globalPokemon);
  return (
    <div className={css.layout}>
      <Header />
      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (xpage === 1) {
                return console.log("No puedo retroceder más");
              }
              setXpage(xpage - 1);
            }}
          >
            <Falcons.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}>De </span>
          <span className={css.item}>
            {" "}
            {Math.round(globalPokemon?.length / 15)}{" "}
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage === 67) {
                return console.log("No hay más páginas");
              }
              setXpage(xpage + 1);
            }}
          >
            {" "}
            <Falcons.FaAngleRight />
          </span>
        </div>
      </section>
      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
