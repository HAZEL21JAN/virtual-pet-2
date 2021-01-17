//Create variables here
var dog, happyDog 
var dog1,dog2
var  foodS, foodStock

var database

function preload()
{
  //load images here
   dog1=loadImage("images/dogImg.png");
  
  dog2=loadImage("images/dogImg1.png");
}

function setup() {

  database=firebase.database();

  createCanvas(500, 500);
   dog=createSprite(250,250,20,20);
   dog.scale=0.15;
  //dog=addImage("dog",dog1);
  dog.addImage(dog1);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  

  
}


function draw() {  

  background(46, 139, 87) ;

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
  }
    drawSprites();
  //add styles here

  textSize(20);
  fill("black");
  stroke(4) ;
  text('press the up arrow to feed the dog',100,100);

  if(lastFed>=12){
    text("lastFeed:"+lastFed%12+"pm",350,30)
  }else if (lastFed==0){
    text("lastFeed:12 am"+350,30);
  }else{
    text("lastFeed:"+lastFed+"am",350,30)
  }
  
  

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dog2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



