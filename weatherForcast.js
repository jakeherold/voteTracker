console.log("start");
var weatherData = {};
var temp_min = [];
var temp_now = [];
var temp_max = [];
var k2cOffset = 273.15; // Kelvin vs. Celcius shift

function k2f(x) {
  return (x - k2cOffset) * 1.8 + 32;
}

var barData = {
  labels : ["0","1","2","3","4","5","6"],
  datasets : [
    { fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : ["Filled with location min temp"]
    },
    { fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : []
    }
  ]
}

function processResp (rObj){
  var list = rObj.list;
  for (tt=0; tt < list.length; tt++){
    var main = list[tt].main;
    temp_min[tt] = k2f(main.temp_min);
    temp_max[tt] = k2f(main.temp_max);
    temp_now[tt] = Math.round(k2f(main.temp_now));
  }
  console.log("temp_min" + temp_min);
  console.log("temp_max" + temp_max);
}


$.ajax(
  { url: "http://api.openweathermap.org/data/2.5/forecast?q=portland,us&mode=json&appid=d343a1cd6dcf1643a83e133b7658686e"
    }
  )
//" + VacationDestination + "

.done(function(respObj) {
  console.log("respObj = ", respObj);
  processResp(respObj);
  barData.datasets[0].data = temp_min.slice(0,7);
  console.log(barData.datasets[0].data);
  barData.datasets[1].data = temp_max.slice(0,7);
  console.log(barData.datasets[1].data);

  var chart = new CanvasJS.Chart("weatherContainer", barData);
  console.log("Done with weather render");

  chart.render();
})
.fail (function (){
  console.log("XHR FAILURE.");
});

/*window.onload = function() {
  ctx = $("canvas")[0].getContext("2d");
}*/
