import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";
import fuzzy from "fuzzy";
/* delay the input event from firing off frequently using the debounce() in lodash */
import _ from "lodash";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;
/* place-self is a shorthand for align-self and justify-self */

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
  // console.log("lodash response - ", inputValue);
  /* Get all the coin symbols */
  let coinSymbols = Object.keys(coinList); // an array of coins' keys
  /* Get all the coin names and map the symbols to the name */
  let coinNames = coinSymbols.map((coinSymbol) => {
    return coinList[coinSymbol].CoinName;
  }); // an array of the names of the key found in the coins

  let allStringsToSearch = coinSymbols.concat(coinNames); //a joint arr of both coin symbols and names
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map((searchItem) => searchItem.string);
  /* console.log(fuzzyResult); 
  // fuzzyResult is an array that contains both names and symbols */
  // to separate names from symbols in the fuzzyResult array, we use the lodash method pickby;
  let filteredCoins = _.pickBy(coinList, (result, symbolKey) => {
    let coinName = result.CoinName;
    return (
      _.includes(fuzzyResults, symbolKey) || _.includes(fuzzyResults, coinName)
    );
  });
  /* console.log(filteredCoins); */
  setFilteredCoins(filteredCoins);
}, 500);

const filterCoins = (e, setFilteredCoins, coinList) => {
  const inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
};

export default function Search() {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => {
        return (
          <SearchGrid>
            <h2>Search all coins</h2>
            <SearchInput
              onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
            />
          </SearchGrid>
        );
      }}
    </AppContext.Consumer>
  );
}
