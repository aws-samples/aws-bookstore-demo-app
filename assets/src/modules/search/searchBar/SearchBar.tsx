import React from "react";
import "./searchBar.css";
import { Redirect } from "react-router";

interface SearchBarProps {}

interface SearchBarState {
  redirect: string | undefined;
  value: string;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      redirect: undefined,
      value: ""
    };
  }

  handleChange = (event: React.ChangeEvent) => {
    const target = event.currentTarget as HTMLInputElement;
    this.setState({ value: target.value });
  }

  onSearch = () => {
    this.setState({
      redirect: `/search/${this.state.value}`
    });
  }

  render() {
    return (
      <form className="searchform mainsearch">
        <div className="row">
          <div className="col-md-8 search-padding">
            <div className="input-group">
              <div className="input-group-addon addon-black no-radius">Search</div>
              <input type="text" className="form-control no-radius" id="txtSearch" value={this.state.value} onChange={this.handleChange} />
              <div className="input-group-btn">
                <button className="btn btn-orange no-radius" onClick={this.onSearch}>
                  <span className="glyphicon glyphicon-search"></span>
                </button>
                {this.state.redirect && <Redirect to={this.state.redirect} />}
              </div>
            </div>
          </div>
          <div className="col-md-4 title-padding">
          <h3 className="no-margin white">Best<span className="orange">{` deals `}</span>of the day</h3>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;

