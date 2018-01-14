import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state={
    countries: [],
    title: 'Simple Country Application',
  } 

  componentDidMount() {
    var that = this;

    fetch('http://localhost:3001/api/countries')
      .then(function(response) {
        response.json()
          .then(function(data) {
            // let countries = that.state.countries;
            // console.log('state', countries)
            // countries.concat(data);
            // that.setState({ countries: countries });
            // console.log('post state', countries)
            that.setState({ countries: data });
          })
      })
  }

  addCountry(e) {
    e.preventDefault();
    let country_data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value
    };
    var request = new Request('http://localhost:3001/api/new-country', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(country_data)
    });

    let countries = this.state.countries;
    countries.push(country_data);
    this.setState({ countries: countries });
  
    // modern take on xmlhttpsrequest(), creates Promise
    fetch(request)
      .then(function(response) {
        // console.log({response});
        response.json()
          .then(function(data){
            // console.log({data});
          })
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  removeCountry(id){
    var that = this;
    let countries = this.state.countries;
    let country = countries.find(function(country) {
      return country.id === id;
    });
    var index = countries.indexOf(country);

    var request = new Request('http://localhost:3001/api/remove/' + id, {
      method: 'DELETE'
    });

    fetch(request)
      .then(function(response) {
        countries.splice(index, 1);
        that.setState({ countries: countries });
        response.json()
          .then(function(data) {
          })
      })
  }

  render() {
    let title = this.state.title
    let countries = this.state.countries;
    return (
      <div className='App'>
        <h1>{title}</h1>
        <form ref='countryForm'>
          <input type="text" ref="country_name" placeholder="country name" />
          <input type="text" ref="continent_name" placeholder="continent name" />
          <button onClick={this.addCountry.bind(this)}> Add Country </button>
        </form>
        <ul>
          {countries.map(country => 
            <li key={country.id}>
              {country.country_name}, {country.continent_name}
              <button onClick={this.removeCountry.bind(this, country.id)}>Remove</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
