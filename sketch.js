/*var database;
var foodStock, foodS;
var dog, dogImg, happyDog;

function preload(){

  dogImg = loadImage
  ("Dog (1).png");
 ("happydog (1).png");
  happyDog = loadImage

}

function setup() {
  database = firebase.database();
  createCanvas(750,450);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(650,230,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  milk = new Food();

  feed = createButton("FEED THE DOG")
  feed.position(1090,125)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(1000,125)
  add.mousePressed(AddFood)

}


function draw() { 
  background(32,178,170);

  milk.display();

  drawSprites();

  fill("magenta");
  strokeWeight(3);
  stroke(0,0,0);
  textSize(15);
  text("Press the 'FEED DOG' to Feed the Dog Milk", 200, 25 );
  text("Press the 'ADD FOOD' to Add more Food for the Dog to eat more Food", 100, 45 );

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x) {
  database.ref('/').update({
    Food:x
  })
}

function AddFood(){
foodS++
database.ref('/').update({
  Food:position
 })
}

function FeedDog(){
dog.addImage(happyDog)
milk.updateFoodStock(milk.getFoodStock()-1)
 database.ref('/').update({
   Food:milk.getFoodStock()
 })
}*/

var database ;
var foodS,foodStock;
var dog,dog1,dog2;
var position;
var feed,add,last 
var foodobject
var Feedtime
var Lastfeed

function preload()
{
  dog1 = loadImage  ("Dog (1).png");
  dog2 = loadImage ("happydog (1).png");
  MilkImage=loadImage('Milk (1).png');
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dog1)
  dog.scale=0.2

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  Lastfeed = database.ref('FeedTime')
  Lastfeed.on("value",readTime)

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED THE DOG")
  feed.position(700,115)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(600,115)
  add.mousePressed(AddFood)
 
   
}
function readTime(time){
  Feedtime = time.val()
}
function readStock(data){
 foodS = data.val();

}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var pasttime,delay = 15,state = "idle";
function draw() {  

  background(32,178,170);

  foodobject.display()

  
  drawSprites();
   
  fill(255,255,254);
  textSize(15);
  //console.log(Feedtime)
  text("Last Feed: "+pasttime, 600, 115)
 drawSprites();
 setToHour()
 if(pt<frameCount-delay){
  dog.addImage(dogimg1) 
 }
 if(pt>frameCount-delay){
  image(MilkImage,500+(frameCount-pt),220,100,80);
 }
}
function setToHour(){
  pasttime = "Undifined"
  if(Feedtime){
    if(Feedtime >=12)
    pasttime = Feedtime- 12 +"PM"
   }
   else {
     pasttime = Feedtime +"AM"
   }
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}
function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
var pt;
function FeedDog(){

  if(foodS>0){
    pt = frameCount;

    dog.addImage(dog2) 
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour()
   })
  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }
    

    
