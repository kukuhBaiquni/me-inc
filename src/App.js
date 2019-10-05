import React, { Component } from "react";
import * as actionTypes from './constant/actionTypes';
import { connect } from 'react-redux'

class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props        
        dispatch({
            type: actionTypes.GET_DATA_REQUEST,
            config: {
                method: 'get'
            }
        });
    };

    render() {
        console.log(this.props.data)
        return(
            <div>
                <h1>Hello Gabon</h1>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.data
    };
};


export default connect(mapStateToProps)(App);