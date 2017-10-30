var fileKeys = require("./keys.js");
var request = require('request');
var twitterApi = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');

console.log("accessToken: " + fileKeys.twitterKeys.access_token_key);
console.log("accessTokenSecret " + fileKeys.twitterKeys.access_token_secret);
console.log("consumerKey " + fileKeys.twitterKeys.consumer_key);
console.log("consumerSecret " + fileKeys.twitterKeys.consumer_secret);


var consumerKey = fileKeys.twitterKeys.consumer_key;
var consumerSecret = fileKeys.twitterKeys.consumer_secret;
var accessTokenSecret = fileKeys.twitterKeys.access_token_secret;
var accessToken = fileKeys.twitterKeys.access_token_key;
var spotifyClientId =  fileKeys.spotifyKeys.client_ID;
var spotifyClientSecret = fileKeys.spotifyKeys.client_secret;

var twitterClient = new twitterApi({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret
});
var spotifyClient = new spotify({
  id: spotifyClientId,
  secret: spotifyClientSecret
})

// console.log(spotifyClientId);
// console.log(spotifyClientSecret);



var arguments = process.argv;
var arguments1 = process.argv[2];
var arguments2 = process.argv[3];


function twitterati(){ 
var params = {screen_name: 'coolabhi291'};
twitterClient.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=20', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    var tweet_limit = tweets[0].user.statuses_count;
     //console.log(tweets[0].text);
     //console.log(tweets[0].created_at);
 for (var i = 0; i < tweet_limit ; i++) {
      console.log(tweets[i].text +'\n' + " Created at: "+tweets[i].created_at +'\n');
    }
  }
});
}



function spotifyer(){
	var song = arguments2;


if(song == undefined){
	spotifyClient.search({ type: 'track', query:'the sign' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// console.log(data); 
for (var i = 0; i < 10 ; i++) {
console.log("---------- "+i+"---------" + '\n'+
"Artists: " + data.tracks.items[i].artists[0].name +'\n'
+"Song Name: " + data.tracks.items[i].name +'\n'
+"Songs Preview URL: "+data.tracks.items[i].preview_url + '\n'
+"Songs Album: "+data.tracks.items[i].album.name)

}
});
}

else{
spotifyClient.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// console.log(data); 
for (var i = 0; i < 10 ; i++) {
console.log("---------- "+i+"---------" + '\n'+
"Artists: " + data.tracks.items[i].artists[0].name +'\n'
+"Song Name: " + data.tracks.items[i].name +'\n'
+"Songs Preview URL: "+data.tracks.items[i].preview_url + '\n'
+"Songs Album: "+data.tracks.items[i].album.name)

}
});
}
}

function moviebuff(){
var movie =arguments2;

if(movie == undefined){
	request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    if (!error && response.statusCode === 200) {

        //console.log(JSON.parse(body));
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("imdbRating: "+JSON.parse(body).imdbRating);
        console.log(JSON.parse(body).Ratings[1].Source+":"+JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);        
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

}
})
}
else{
request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    if (!error && response.statusCode === 200) {

        //console.log(JSON.parse(body));
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("imdbRating: "+JSON.parse(body).imdbRating);
        console.log(JSON.parse(body).Ratings[1].Source+":"+JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);        
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);        
    }
})
}
}

function fileReader(){
fs.readFile("random.txt", "utf8", function(error, data) {

  
  if (error) {
    return console.log(error);
  }

  
  //console.log(data);

 
  var dataArr = data.split(",");
  //arguments[2] = dataArr[0];
  arguments2 = dataArr[1];
  

  //console.log(dataArr[0]);
  //console.log(dataArr[1]);
  if(dataArr[0] === 'spotify-this-song' ){
  		spotifyer();
  }
  else if(dataArr[0] === 'movie-this'){
 	moviebuff();
 }

});

}


if(arguments1 === 'spotify-this-song' ){
 	spotifyer();
 }
 else if(arguments1 === 'movie-this'){
 	moviebuff();
 }
 else if(arguments1 === 'my-tweets'){
 	twitterati();
 }
 else if(arguments1 === 'do-what-it-says'){
 	fileReader();
 }

