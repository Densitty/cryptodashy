import React from "react";
import moment from "moment";

const cc = require("cryptocompare");

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

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
      timeInterval: "months",
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      confirmFavorites: this.makeRegularVisitor,
      isInFavorites: this.isInFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect,
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

    this.setState(
      {
        currentFavorite: symbol,
        // to disable the chart from rendering the previous historicalData first before the new one is rendered upon changing the favorite coin, set
        historical: null,
      },
      // fetch the historicalData when current favorite is set
      this.fetchHistorical
    );

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
        price: null, // reset the state variable when changing favorite
        historical: null, // coins
      },
      () => {
        // once we confirm the favorite coins, fetch the prices of the coins and the historical data
        this.fetchPrices();
        this.fetchHistorical();
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
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    const response = await cc.coinList();
    const coinList = response.Data;
    this.setState({ coinList });
    /* any property not set initially but later set, e.g coinList, is assumed to have an initial state value of null */
    // console.log(coinList);
  };

  fetchHistorical = async () => {
    /* if we are visiting the site for the first time, that means there are no favorite coins; return from the function */
    if (this.state.firstVisit) {
      return;
    }
    let results = await this.historical();
    // console.log(results);
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => {
          return [
            moment()
              .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
              .valueOf(),
            ticker.USD,
          ];
        }),
      },
    ];
    this.setState({ historical });
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }

    /* since data is being fetched from an API and that data is going to be used to process the information for prices in 10mths duration, we await the request to be resolved */
    return Promise.all(promises);
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

  changeChartSelect = (value) => {
    // console.log(value);
    this.setState(
      // historical: null to enable chart refresh of historical data on each timeInterval change
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
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
