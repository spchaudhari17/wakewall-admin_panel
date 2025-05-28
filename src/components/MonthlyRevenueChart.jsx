import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import API from '../API';

const MonthlyUserChart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [yearlyData, setYearlyData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/admin/users-by-month');
                setYearlyData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Original chart options from your design
    const chartOptions = {
        chart: {
            id: "basicChartBar",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#ffffff'],
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Get available years
    const availableYears = Object.keys(yearlyData).map(Number).sort();

    return (
        <div style={{ width: '100%' }}>
            {/* Simple year selector matching your original style */}
            <div style={{ marginBottom: 10 }}>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    style={{
                        padding: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9'
                    }}
                >
                    {availableYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {/* Original chart styling */}
            <Chart
                options={chartOptions}
                series={[{
                    name: "Users Created",
                    data: yearlyData[selectedYear] || Array(12).fill(0)
                }]}
                type="area"
                width="100%"
                height={150}
            />
        </div>
    );
};

export default MonthlyUserChart;