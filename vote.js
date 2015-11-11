//UTILITY FUNCTIONS AND ARRAYS ===============================================
var tree1 = new imageConstructor("images/tree1.jpg");
var tree2 = new imageConstructor("images/tree2.jpg");
var tree3 = new imageConstructor("images/tree3.jpg");
var city1 = new imageConstructor("images/city1.jpg");
var city2 = new imageConstructor("images/city2.jpg");
var city3 = new imageConstructor("images/city3.jpg");

treeDirectory = [tree1, tree2, tree3];
cityDirectory = [city1, city2, city3];
midwayTreeDirectory = [];
midwayCityDirectory = [];
emptyHatTrees = [];
emptyHatCities = [];

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

}

leftImageEl.addEventListener("click", selectImageLeft);
rightImageEl.addEventListener("click", selectImageRight);
//resetButtonEl.addEventListener("click", cycleImages);


//voteButton.addEventListener("click", voteSubmit);


////////////////////select-image///////////////////////////////////////////////

function selectImageLeft() {

  midwayTreeDirectory[0].voteNumber++;
  console.log("i'm image " + midwayTreeDirectory[0].filePath + " and my vote count is " + midwayTreeDirectory[0].voteNumber);
  cycleImages();
}
function selectImageRight(){
  midwayCityDirectory[0].voteNumber++;
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
          delete emptyHatCities[kk];
      }
    }
  }
}

/*var treeVoteTotal =  //Added functionality for later (cumulitive chart)


for (ii = 0; ii<treeDirectory.length; ii++ ){


total+=


}
*/
