import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      /* setPage needs to be set here before it can be used in Consumer */
      changePage: this.changePageHandler,
      confirmFavorites: this.makeRegularVisitor,
    };
  }

  makeRegularVisitor = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard",
    });
    localStorage.setItem(
      "cryptoDashy",
      JSON.stringify({
        test: "hello",
      })
    );
  };

  savedSettings = () => {
    let cryptoData = JSON.parse(localStorage.getItem("cryptoDashy"));
    /* if we are visiting the site for the first time, then we get to the settings page */
    if (!cryptoData) {
      return {
        page: "settings",
        firstVisit: true,
      };
    }

    return {};
  };

  changePageHandler = (page) => {
    this.setState({ page: page });
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
