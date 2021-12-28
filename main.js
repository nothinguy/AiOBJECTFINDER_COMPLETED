video = "";
objects = [];


function setup() {
canvas = createCanvas(380,350);
canvas.position(440,230);
video = createCapture(VIDEO);
 video.hide();
video.size(400,300);
}

function preload(){
  
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    input = document.getElementById("input").value;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
image(video,0,0,430,350);

if(status != "") {
    objectDetector.detect(video, gotResult);
    for(i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";


        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == input){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("objects").innerHTML = input + " Found";
            speech = window.speechSynthesis;
          utterThis = new SpeechSynthesisUtterance(input +" mentioned found");
            speech.speak(utterThis);
        }
        else {
            document.getElementById("objects").innerHTML = input + " mentioned Not Found"
        }
    }
}


}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) 
{
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}