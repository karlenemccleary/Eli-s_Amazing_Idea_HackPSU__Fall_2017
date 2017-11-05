var Twitter = require('twitter');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/homepage.html', function (req, res) {
    res.sendfile('homepage.html')
})



//Twitter timeline api 
var client = new Twitter({
  consumer_key: '4MTuzO9zhyHWy4njfSQz1se20',
  consumer_secret: 'jJmil4ih1hJqgb1TAcMGgGMGVAhYLD5INAdQZJ705hWpNQVczb',
  access_token_key: '3375258838-6S4w6qKBhJEcsFNaLogk0mRPaSMpFhFKmx68Fob',
  access_token_secret: 'hYR9fFm41bmEoVZGBRVeHcNNDUayu9Djfzoe0fgtF26Vq'
});

var params = {screen_name: 'nodejs',
              count: 1};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var tweetsText;
        for(var i = 0; i < tweets.length; i++) {
            tweetsText += tweets[i]["text"] + "\n"
        }
        console.log(tweetsText);
        //printFile(tweetsText);
    } else {
         console.log(error);
    }
});
function printFile(tweets) {
    fs.writeFile("file", tweets, function(err) {
    if(err) {
        return console.log(err);
    }
   console.log("The file was saved!");
    }); 
}



//Watson Tone Analyzer API
var toneAnalyzer = new ToneAnalyzerV3({
  // If unspecified here, the TONE_ANALYZER_USERNAME and TONE_ANALYZER_PASSWORD environment properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  "username": "45888021-8b74-4ced-bd12-17f4c85fcccf",
  "password": "bqqIVe3ivb3X",
  version_date: '2017-09-21'
});

toneAnalyzer.tone({ text: 'I hate you' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});


var tempSpeach = "This session of the Reichstag takes place on a date which is full of significance for the German people. Four years have passed since the beginning of that great internal revolution which in the meantime has been giving a new aspect to German life. This is the period of four years which I asked the German people to grant me for the purpose of putting my work to the test and submitting it to their judgment. Hence at the present moment nothing could be more opportune than for me to render you an account of all the successes that have been achieved and the progress that has been made during these four years, for the welfare of the German people. But within the limits of the short statement I have to make it would be entirely impossible to enumerate all the remarkable results that have been reached during a time which may be looked upon as probably the most astounding epoch in the life of our people. That task belongs rather to the press and the propaganda. Moreover, during the course of the present year there will be an Exposition here in Berlin which is being organized for the purpose of giving a more comprehensive and detailed picture of the works that have been completed, the results that have been obtained and the projects on which work has been begun, all of which can be explained better in this way than I could do it within the limits of an address that is to last for two hours. Therefore I shall utilize the opportunity afforded me by this historic meeting of the Reichstag to cast a glance back over the past four years and call attention to some of the new knowledge that we have gained, some of the experiences which we have been through, and the consequences that have resulted thereof--in so far as these have general validity. It is important that we should understand them clearly, not only for our own sake but also for that of the generations to come."
//Watson Personality Insights API
var personality_insights = new PersonalityInsightsV3({
  "username": "2a22965b-3099-4ff9-af64-4a29d2b1494a",
  "password": "kmkQwxWjsGyZ",
  version_date: '2016-10-19'
});

personality_insights.profile({
  text: tempSpeach,
  consumption_preferences: true
  },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      //console.log(JSON.stringify(response, null, 2));
      printFile(JSON.stringify(response, null, 2));
});






//https://hackpsufall2017-aidenchiavatti.c9users.io/
var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", "https://hackpsufall2017-aidenchiavatti.c9users.io/", port)
})