const functions = require("firebase-functions");
const Twitter = require("twitter");

const cors = require("cors")({origin: true});
const bearer_token =
  "AAAAAAAAAAAAAAAAAAAAAMQ2UwEAAAAATYpDiOAGdH54I%2BSlqqw5g7aRqBI%3DuxYxtzppQWn5f2CYrG3rAD6VEFe8RcNh85nsbMGgVhynYaZpn0";

const getTwitterClient = (key, secret) => {
  //CORRECT KEY ALWAYS IN FIREBASE AUTHENTICATION
  const cred = {
    consumer_key: "lKm4gQkt1euO6YLKvxfyfr0RW",
    consumer_secret: "2fz8E0807OtPBYRU7UHDJpuuuPPjGRJyefMXNz1E2yNhCl40n4",
    access_token_key: key,
    access_token_secret: secret,
  };
  functions.logger.info("Building client");
  functions.logger.info(cred);
  console.log(cred);
  return new Twitter(cred);
};

const callApi = async(request, response, url) => {
  functions.logger.info("IN CALL "+url);

  functions.logger.info(request.body);
let query = request.body;

    functions.logger.info(query);

  const client = getTwitterClient(query.token, query.secret);
  functions.logger.info("OPTIONS ARE");
  functions.logger.info(query.options);
  const data = await client.get(url, query.options);
  console.log(typeof data);
  console.log(data);

  response.status(200).send(data);
  /*
  , function (error, tweets, res) {
    if (!error) {

      functions.logger.info(tweets);
      response.status(200).send(tweets.JSON);
    } else {
      functions.logger.error(error);
      console.log(error);
  }
  });*/
};

// Doc: https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline
exports.getFollowing = functions.https.onRequest((request, response) => {
  functions.logger.info(typeof request.body);
    functions.logger.info(request);

let query = request.body;
  let options = {source_screen_name:"iamtexture", target_id: query.uid };
  
  query.options = options;
  request.body = query;
  functions.logger.info("FRIENDSHIPS CREATE " );
  functions.logger.debug(request.body);
  cors(request, response, () => {
    callApi(request, response, "friendships/show");
  });
});

// Doc: https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline
exports.timeline = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    callApi(request, response, "statuses/home_timeline");
  });
});

// Doc: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
exports.like = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    callApi(request, response, "favorites/list");
  });
});

// Doc: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me
exports.ownTweets = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    callApi(request, response, "statuses/retweets_of_me");
  });
});

exports.retweets = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    callApi(request, response, "statuses/retweets_of_me");
  });
});
