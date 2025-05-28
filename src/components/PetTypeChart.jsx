import React, { Component } from "react";
import Chart from "react-apexcharts";

class PetTypeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [44, 55, 41, 37, 25],
            options: {
                labels: ['Dogs', 'Cats', 'Birds', 'Horse', 'Ohter'],
                legend: {
                    position: 'bottom',
                    // fontSize: '14px',
                }
            },
        }
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="pie" />
        )
    }
}

export default PetTypeChart;
