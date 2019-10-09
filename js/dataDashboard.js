function goToControls() {
    window.location.href = "./";
}

function updateChart(){
    $.getJSON('../db/userData.json', function (data) {
        // Get/Transform Data
        var tempData;
        var timeData;
        var chartTitle;
        var yAxisLabel;
        var timeInMs = new Date();

        console.log(document.getElementById("myList1").options.selectedIndex);
        console.log(document.getElementById("myList2").options.selectedIndex);
        //console.log(data.connections.length);       // Gives amount of connections 

        // Timeframe Selection
        switch (document.getElementById("myList2").options.selectedIndex) {

            // Data for last 24 hours
            case 0: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 86400000);
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(dataValues);
            }
                break;

            // Data for last 7 days
            case 1: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 604800000); 
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(timeData);
            }
                break;

            // Data for last month (30 days)
            case 2: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 2592000000);
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(timeData);
            }
                break;

            // Data for last 3 months (91 days)
            case 3: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 7862400000);
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(timeData);
            }
                break;

            // Data for last 6 months (182 days)
            case 4: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 15724800000);
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(timeData);
            }
                break;

            // Data for last 12 months (365 days)
            case 5: {
                var startTimeInMs = new Date(timeInMs.valueOf() - 31536000000);
                var dataValues = [];
                timeData = [];
                data.connections.map((e) => {
                    if (e.start_time >= startTimeInMs.valueOf()) {
                        var temp = new Date(0);
                        temp.setUTCMilliseconds(e.start_time);
                        timeData.push(temp);
                        dataValues.push(1);
                    }
                    else {
                        dataValues.push(0);
                    }
                });
                console.log(timeData);
            }
                break;
        }

        // Output Data
        switch (document.getElementById("myList1").options.selectedIndex) {

            // Obtain Average Time for each connection within timeframe
            case 0: {
                tempData = [];
                var temp = data.connections.map((e) => {
                    var showerTime = e.end_time - e.start_time;
                    var d = new Date(0);
                    d.setUTCMilliseconds(showerTime);
                    var out = d.getMinutes();       // Does not display hours i.e. if user showers for 1 hour output = 0
                    return out;
                });

                for (var i = data.connections.length; i >= 0; i--) {
                    if (dataValues[i] == 1) {
                        tempData.push(temp[i]);
                    }
                }
                console.log(tempData);
                chartTitle = 'Average Shower Time';
                yAxisLabel = 'Time (Minutes)';
            }
                break;

            // Obtain Average Water consumption for each connection within timeframe
            // Need to wait on water flow function (for hardware)
            case 1: {
                tempData = data.connections[0].data.map((e) => {
                    return e.temp;      //returns temperature values from connection 1
                });
                chartTitle = 'Average Water Use';
                yAxisLabel = 'Water (Litres)';
            }
                break;

            // Obtain Average Temperature for each connection within timeframe
            case 2: {
                tempData = [];
                tempValue = [];
                for (var i = 0; i < data.connections.length; i++) {
                    var temp = 0;
                    data.connections[i].data.map((e) => {
                        temp = temp + e.temp;
                        return;
                    });
                    temp = temp / data.connections[i].data.length;
                    tempValue.push(temp);
                }

                for (var i = data.connections.length; i >= 0; i--) {
                    if (dataValues[i] == 1) {
                        tempData.push(tempValue[i]);
                    }
                }
                chartTitle = 'Average Temperature';
                yAxisLabel = 'Temperature (Degrees Celsius)';
            }
                break;

            // Obtain the cumulative water consumption within timeframe
            // Need to wait on water flow function (for hardware)
            case 3: {
                tempData = data.connections[0].data.map((e) => {
                    return e.temp;
                });
                chartTitle = 'Net Water Use';
                yAxisLabel = 'Water (Litres)';
            }
                break;
        }

        //if (document.getElementById("myList2").options.selectedIndex = 0) {
        //$.getJSON('../db/userData.json', function (data) {
        //Get/Transform Data
        //var tempData = data.connections[1].data.map((e) => {
        //return e.temp;
        //});
        //var timeData = data.connections[1].data.map((e) => {
        //var d = new Date(0);
        //d.setUTCMilliseconds(e.timestamp);
        //var out = d.getHours() + ":" + d.getMinutes();
        //return out;
        //});
        //});
        //}

        var ctx = document.getElementById('graph').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeData,
                xAxisID: 'Time',    // Doesn't do anything??
                yAxisID: yAxisLabel,    // Doesn't do anything??
                datasets: [{
                    label: chartTitle,
                    data: tempData,
                          timeData,
                    fill: false,
                    borderWidth: 4
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },

            }
            
            //{
                //title: {
                    //display: true,
                    //fontSize: 10
                //}
            //}
        });
    });
} updateChart();