function goToControls() {
    window.location.href = "./";
}

$.getJSON('/ShowerData', function(data) {
    //Get/Transform Data
    var tempData = data.connections[0].data.map((e) => {
        return e.temp;
    });
    var timeData = data.connections[0].data.map((e) => {
        var d = new Date(0);
        d.setUTCMilliseconds(e.timestamp);
        var out = d.getHours() + ":" + d.getMinutes();
        return out;
    });

    // Output Data
    var ctx = document.getElementById('graph').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: '# of Votes',
                data: tempData, 
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
                }]
            }
        }
    });
});
