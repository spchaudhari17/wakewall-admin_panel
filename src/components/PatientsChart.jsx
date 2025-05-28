import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';

const PatientsChart = () => {
    // Data for the chart
    const series = [
        {
            name: 'Last 2 Months',
            data: [35, 22, 35, 20, 35, 25] 
        },
        {
            name: 'Previous',
            data: [20, 36, 20, 35, 22, 32],
        }
    ];

    // X-axis categories/labels
    const options = {
        chart: {
            id: 'basic-line-chart',
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        stroke: {
            width: 2, // Line thickness
            curve: 'smooth' // Smooth the lines
        },
        colors: ['#5f30ea', '#4bde98'], // Set the line colors
        xaxis: {
            categories: ['January', 'March', 'May', 'July', "September", "November", ],
        },
        markers: {
            size: 4 // Marker size on the lines
        },
        tooltip: {
            shared: true, // Show tooltip for both lines
            intersect: false
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right', // Aligning the legend to the right
            floating: true, // This removes the default space above the chart
            fontSize: '12px',
            fontWeight: 500, 
            labels: {
                colors: ['#878787'],
            },
            itemMargin: {
                horizontal: 30, // Margin between items horizontally
                vertical: 1, // Margin between items vertically
            }
        }
    };


    return (
        <ReactApexChart
            options={options} // Chart configuration
            series={series} // Data series
            type="line"
            height={300} // Height of the chart
        />
    );
}

export default PatientsChart;