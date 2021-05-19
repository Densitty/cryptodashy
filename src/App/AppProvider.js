import React from "react";

const cc = require("cryptocompare");

const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      /* setPage needs to be set here before it can be used in Consumer */
      changePage: this.changePageHandler,
      confirmFavorites: this.makeRegularVisitor,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
    };
  }

  addCoin = (key) => {
    let newFavorites = [...this.state.favorites];
    if (newFavorites.length < MAX_FAVORITES) {
      newFavorites.push(key);
      this.setState({
        favorites: newFavorites,
      });
    }
  };

  removeCoin = (key) => {
    let newFavorites = [...this.state.favorites].filter((coinItem) => {
      // console.log(coinItem !== key);
      return coinItem !== key;
    });
    this.setState({
      favorites: newFavorites,
    });
  };

  // disable coin already in favorites to be add more than once
  isInFavorites = (key) => {
    /* console.log(this.state.favorites.includes(key)); */
    return this.state.favorites.includes(key);
  };

  makeRegularVisitor = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard",
    });
    localStorage.setItem(
      "cryptoDashy",
      JSON.stringify({
        favorites: this.state.favorites,
      })
    );
  };

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    const response = await cc.coinList();
    const coinList = response.Data;
    this.setState({ coinList });
    /* any property not set initially but later set, e.g coinList, is assumed to have an initial state value of null */
    // console.log(coinList);
  };

  savedSettings = () => {
    let cryptoData = JSON.parse(localStorage.getItem("cryptoDashy"));
    /* if we are visiting the site for the first time, then we get directed to the settings page */
    if (!cryptoData) {
      return {
        page: "settings",
        firstVisit: true,
      };
    }

    let { favorites } = cryptoData;
    // when favorite coins are selected, override the default favorites (i.e this.state.favorites)
    return { favorites: favorites };
  };

  changePageHandler = (page) => {
    this.setState({ page: page });
  };

  setFilteredCoins = (filteredCoins) => {
    // console.log(this.state.filteredCoins);
    this.setState({ filteredCoins });
  };

  render() {
    // console.log(this.state);
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
