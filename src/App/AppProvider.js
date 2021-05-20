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
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      confirmFavorites: this.makeRegularVisitor,
      isInFavorites: this.isInFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
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

  setCurrentFavorite = (symbol) => {
    console.log(this.state.favorites.filter((favorite) => favorite === symbol));

    this.setState({
      currentFavorite: symbol,
    });

    // reset the localStorage to reflect the change
    localStorage.setItem(
      "cryptoDashy",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDashy")),
        currentFavorite: symbol,
      })
    );
  };
  // disable coin already in favorites to be add more than once
  isInFavorites = (key) => {
    /* console.log(this.state.favorites.includes(key)); */
    return this.state.favorites.includes(key);
  };

  makeRegularVisitor = () => {
    let currentFavorite = this.state.favorites[0];
    console.log(this.state.favorites[0]);
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      "cryptoDashy",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite,
      })
    );
  };

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  };

  fetchCoins = async () => {
    const response = await cc.coinList();
    const coinList = response.Data;
    this.setState({ coinList });
    /* any property not set initially but later set, e.g coinList, is assumed to have an initial state value of null */
    // console.log(coinList);
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        const priceData = await cc.priceFull(this.state.favorites[i], "USD");
        /* console.log(priceData); */
        returnData.push(priceData);
      } catch (e) {
        console.log(e);
      }
    }
    return returnData;
  };

  /* fetchPrices = async () => {
    const prices = await this.prices();
    console.log(prices);
    this.setState({ prices });
  }; */

  fetchPrices = async () => {
    /* if we are visiting the site for the first time, have no price displayed */
    if (this.state.firstVisit) {
      return;
    }
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    // We must filter the empty price objects (not in the lecture)
    prices = prices.filter((price) => {
      // console.log(Object.keys(price).length);
      return Object.keys(price).length;
    });
    this.setState({ prices });
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

    let { favorites, currentFavorite } = cryptoData;
    // when favorite coins are selected, override the default favorites (i.e this.state.favorites)
    return { favorites: favorites, currentFavorite: currentFavorite };
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
