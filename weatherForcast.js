// var prizeLocation = (document.getElementById("vacationDestination").value);


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
  labels : ["min","max"],
  datasets : [
    { fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : []
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

function makeWeather(){
//var prizeLocation = (document.getElementById("vacationDestination").value);

//var siteURL = "http://api.openweathermap.org/data/2.5/forecast?q=portland,us&mode=json&appid=d343a1cd6dcf1643a83e133b7658686e"
// + prizeLocation + vactionCityDataOutput

var siteURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + vactionCityDataOutput + ",us&mode=json&appid=d343a1cd6dcf1643a83e133b7658686e"

$.ajax(
  { url: siteURL
    }
  )
//" + VacationDestination + "

.done(function(respObj) {
  console.log("respObj = ", respObj);
  processResp(respObj);
  barData.datasets[0].data = temp_min.slice(0,7);
  barData.datasets[1].data = temp_max.slice(0,7);
  window.myBar = new Chart(ctx).Bar(barData, {responsive:true});
  console.log("Done with weather render");
})
.fail (function (){
  console.log("XHR FAILURE.");
});

}

ctx = $("canvas")[0].getContext("2d");

