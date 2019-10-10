import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Scrap from './TestParse';

export default class Login extends Component {

    scraping = () => {
        Scrap()
    }

    render() {
        return (
            <div>
                <h1 onClick={this.scraping}>Ping!</h1>
                <Link to="/main">Dashboard</Link>
            </div>
        )
    }
};
