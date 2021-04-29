import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      /* setPage needs to be set here before it can be used in Consumer */
      changePage: this.changePageHandler,
    };
  }

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
