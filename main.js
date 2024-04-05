song="";
song2 ="";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
leftWristY = 0;
function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function gotPoses(results)
{
   if(results.length > 0 )
   {
      console.log(results);
      scoreRightWrist = results[0].pose.keypoints[10].score;
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log("scoreleftwrist = " +scoreLeftWrist);
      console.log("scorerightwrist = " + scoreRightWrist);

      leftWristX = results[0].pose .leftWrist.y;
      leftWristX = results[0].pose .leftWrist.x;
      console.log("leftWristX = "+leftWristX+"leftWristY"+leftWristY);
      rightWristX = results[0].pose .rightWrist.y;
      rightWristX = results[0].pose .rightWrist.x;
      console.log("rightWristX = "+rightWristX+"rightWristY"+rightWristY);
   }
}
function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}
function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");

    stroke("#FF0000");

    songs = song.isPlaying();
    songs2 = song2.isPlaying();
    console.log(songs);
    console.log(songs2);

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(songs2 == false)
        {
            songs2.play();
        }else{
            document.getElementById("song.id").innerHTML = "song name: music2";
        }
    }
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song2.stop();
        if(songs == false)
        {
            songs.play();
        }else{
            document.getElementById("song.id").innerHTML = "song name: music1";
        }
    }

}