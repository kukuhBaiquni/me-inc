import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    render() {
        return (
            <div>
                <h1 style={{cursor: 'pointer'}}>Ping!</h1>
                <Link to="/main">Dashboard</Link>
            </div>
        )
    }
};
