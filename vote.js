/*UTILITY FUNCTIONS AND ARRAYS ===============================================*/
var tree1 = new imageConstructor("images/tree1.jpg");
var tree2 = new imageConstructor("images/tree2.jpg");
var tree3 = new imageConstructor("images/tree3.jpg");
var tree4 = new imageConstructor("images/tree4.jpg");
var tree5 = new imageConstructor("images/tree5.jpg");
var tree6 = new imageConstructor("images/tree6.jpg");
var tree7 = new imageConstructor("images/tree7.jpg");
var tree8 = new imageConstructor("images/tree8.jpg");
var tree9 = new imageConstructor("images/tree9.jpg");
var tree10 = new imageConstructor("images/tree10.jpg");
var city1 = new imageConstructor("images/city1.jpg");
var city2 = new imageConstructor("images/city2.jpg");
var city3 = new imageConstructor("images/city3.jpg");
var city4 = new imageConstructor("images/city4.jpg");
var city5 = new imageConstructor("images/city5.jpg");
var city6 = new imageConstructor("images/city6.jpg");
var city7 = new imageConstructor("images/city7.jpg");
var city8 = new imageConstructor("images/city8.jpg");
var city9 = new imageConstructor("images/city9.jpg");
var city10 = new imageConstructor("images/city10.jpg");

treeDirectory = [tree1, tree2, tree3, tree4, tree5, tree6, tree5, tree8, tree8, tree10];
cityDirectory = [city1, city2, city3, city4, city5, city6, city7, city8, city9, city10];
midwayTreeDirectory = [];
midwayCityDirectory = [];
emptyHatTrees = [];
emptyHatCities = [];

var totalTreeTemp = function() {
  var treeTemp = 0;
  for (ii = 0; ii<treeDirectory.length; ii++ ){
    treeTemp+= treeDirectory[ii].voteNumber;
}
  return treeTemp;
};

treeVoteTotal = totalTreeTemp();

var totalCityTemp = function() {
  var cityTemp = 0;
  for (ii = 0; ii<cityDirectory.length; ii++ ){
    cityTemp+= cityDirectory[ii].voteNumber;
}
  return cityTemp;
};

cityVoteTotal = totalCityTemp();

var treeMax = treeDirectory.length - 1;
var cityMax = cityDirectory.length - 1;
var midwayTreeMax = midwayTreeDirectory.length - 1;
var midwayCityMax = midwayCityDirectory.length - 1;
//GET A RANDOM TREE IMAGE
function randomTree() {            //selects our tree image
 x = Math.floor(Math.random() * treeDirectory.length);
 return x;
}
var randomTreePlaceholder = randomTree();


//GET A RANDOM CITY IMAGE`
function randomCity(){             //selects our city image
 var y = Math.floor(Math.random() * cityDirectory.length);
 return y;
}
var randomCityPlaceholder = randomCity();

leftImageEl = document.getElementById("leftImage");
rightImageEl = document.getElementById("rightImage");
resetButtonEl = document.getElementById("resetButton");
voteButtonEl = document.getElementById("voteButton");


//IMAGE DATA OBJECT CONSTRUCTION
function imageConstructor(filePath){
this.filePath = filePath;
this.voteNumber = Math.floor((Math.random() * 49 ) + 2);     ///utility zone
}


//OnPageLoad =================================================================

(function(){
//loads image to page
leftImageEl.src  = treeDirectory[randomTreePlaceholder].filePath;
//Copies used image into temp. array
midwayTreeDirectory.push(treeDirectory[randomTreePlaceholder]);
//replicates unused image on top of used image in the array
treeDirectory[randomTreePlaceholder] = treeDirectory[treeMax];
//pops off last image in array
treeDirectory.pop();


rightImageEl.src = cityDirectory[randomCityPlaceholder].filePath;
midwayCityDirectory.push(cityDirectory[randomCityPlaceholder]);
cityDirectory[randomCityPlaceholder] = cityDirectory[cityMax];
cityDirectory.pop();

makeChart();

})();

function cycleImages(){

  randomCityPlaceholder = randomCity();
  randomTreePlaceholder = randomTree();
  //Empties midway array into emptyHat array
  emptyHatTrees.push(midwayTreeDirectory[0]);
  //deletes and collapses midway array
  midwayTreeDirectory.pop();


  emptyHatCities.push(midwayCityDirectory[0]);
  midwayCityDirectory.pop();

  //put "enter chart" bit in here, first

  //re-writes the src of the images in html
  leftImageEl.src  = treeDirectory[randomTreePlaceholder].filePath;
  midwayTreeDirectory.push(treeDirectory[randomTreePlaceholder]);
  rightImageEl.src = cityDirectory[randomCityPlaceholder].filePath;
  midwayCityDirectory.push(cityDirectory[randomCityPlaceholder]);

  //if original array is empty, recycle everything
    if((cityDirectory.length === 0) && (treesDirectory.length === 0)){
        resetImages();
      }
      makeChart();
}

leftImageEl.addEventListener("click", selectImageLeft);
rightImageEl.addEventListener("click", selectImageRight);
//resetButtonEl.addEventListener("click", cycleImages);


//voteButton.addEventListener("click", voteSubmit);


///////////////'onClick' select-image///////////////////////////////////////////////

function selectImageLeft() {

  midwayTreeDirectory[0].voteNumber++;
  treeVoteTotal++;
  console.log("i'm image " + midwayTreeDirectory[0].filePath + " and my vote count is " + midwayTreeDirectory[0].voteNumber);
  cycleImages();
}
function selectImageRight(){
  midwayCityDirectory[0].voteNumber++;
  cityVoteTotal++;
  console.log("i'm image " + midwayCityDirectory[0].filePath + " and my vote count is " + midwayCityDirectory[0].voteNumber);
  cycleImages();
}

function resetImages(){
  //treesDirectory  = emptyHatTrees;
  for (mm=0; mm < emptyHatTrees.length; mm++){

    treesDirectory.push(emptyHatTrees[mm]);

    if ((treeDirectory.length) === (emptyHatTrees.length)){

        for (jj = 0; jj < emptyHatTrees.length; jj++){
            emptyHatTrees.pop();
      }
    }
  }
  //cityDirectory = emptyHatCities;
  for (gg=0; gg<emptyHatCities.length; gg++){

    cityDirectory.push(emptyHatCities[gg]);

    if ((cityDirectory.length)=== (emptyHatCities.length)){
        for (kk = 0; kk < emptyHatCities.length; kk++){
          emptyHatCities.pop();
      }
    }
  }
}

//CHART STUFF
 function makeChart() {

    var treeChartTemp = treeVoteTotal;
    var cityChartTemp = cityVoteTotal;
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Cities vs Trees"
      },
      axisY: {
        title: "Total Vote number",
        maximum: 500
      },
      data: [
      {
        type: "bar",
        showInLegend: true,
        legendText: "Gold",
        color: "gold",
        dataPoints: [
        { y: treeChartTemp, label: "Trees"},
        { y: cityChartTemp, label: "Cities"},

        ]
      }

      ]
    });
//chart.destroy();
chart.render();
}

