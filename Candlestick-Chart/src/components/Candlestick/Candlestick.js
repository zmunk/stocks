import React, { Component, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Candlestick.module.css';
import AutocompleteUI from '../Autocomplete/Autocomplete';
import Row from 'react-row';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

// options template
const symbols = [];

const endpoint = "http://127.0.0.1:8000";

/**
 * yyyy-mm-dd
 */
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

class CandleStickChart extends Component {

    state = {
        // options template
        symbols: [],
        symbol: "20MICRONS",
        startDate: new Date("2021-06-02"),
        endDate: new Date("2021-06-04"),
        //error message
        errorMsg: '',
        //chart settings
        options: {
            title: {
                text: '20MICRONS',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return '$' + (y).toLocaleString('en');
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (y) {
                        return '$' + (y).toLocaleString('en');
                    }
                }
                },
                
            }
        }
        },
        style: {
            background: '#000',
            color: '#777',
            fontSize: '12px',
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        series: [{data:[{}]

        }]
    }

    // Fetch symbols
    componentWillMount(){
        fetch(endpoint+"/symbols")
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(e => {
                        let newObj = {id: e.symbol, name: e.symbol, symbol: e.symbol};
                        symbols.push(newObj);
                    });
                    this.setState({
                        symbols: [...symbols],
                    })
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            
    }

    // Default first render (bitcoin)
    componentDidMount() {
        this.setState({ errorMsg: 'Loading...'});
        this.fetchStocks();
    }

    //onkey handler for the input 
    keySubmit = (e) => {
        if (e.keyCode == 13) {
            
            let symbol = document.getElementById("crypto-autocomplete").value;
            //check if the input is a valid crypto name
            if (symbols.some(e => e.name == symbol)){
                this.setState({ errorMsg: 'Loading...' });
                this.setState({symbol: symbol});
                this.fetchStocks();
            } else {
                this.setState({
                    errorMsg: 'Please input a valid name'
                });
            }
        }
    }

    fetchStocks() {
        fetch(endpoint+"/stocks/"+this.state.symbol+"/"+formatDate(this.state.startDate)+"/"+formatDate(this.state.endDate))
            .then(res => res.json())
            .then(
                (result) => {

                    let candlestickFormat = result.map(function (d) {
                        return {
                            x: new Date(d.date),
                            y: [d.opn, d.high, d.low, d.close]
                        }
                    })

                    this.setState({
                        isLoaded: true,
                        series: [{data:candlestickFormat}],
                        options: { title: { text: this.state.symbol } },
                        errorMsg: ''
                    });
                },
            

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    updateStartDate = (date) => {
        this.setState({ startDate: date }, () => {
            this.fetchStocks();
        })
    }

    updateEndDate = (date) => {
        this.setState({ endDate: date }, () => {
            this.fetchStocks();
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Row>{{
                        3: <AutocompleteUI keySubmit={this.keySubmit} symbols={this.state.symbols}/>,
                        6: <DatePicker selected={this.state.startDate} onChange={this.updateStartDate}/>,
                        9: <DatePicker selected={this.state.endDate} onChange={this.updateEndDate}/>
                    }}</Row>
                    <i>{this.state.errorMsg}</i>
                </div>
                <div id="chart" className={styles.CandleStick}>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height="500" />
                </div>
                <div id="html-dist">
                </div>
            </div>
            );
        }
}

export default CandleStickChart