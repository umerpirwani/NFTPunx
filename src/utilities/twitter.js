// Fetch the users being followed by a specific account, by ID
// https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start
/* eslint-disable */
import needle from "needle";

// this is the ID for @TwitterDev
const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAMQ2UwEAAAAAvi1qDXO%2Fy2xu%2F5EyIzDND6S2qb4%3DSpgXULrD5HwVoApdODbrhJ8lPlbpSKlquYJ5bjIWQ2Klnj8l2I";
console.log(process.env);
const getFollowing = async (userId) => {

  console.log('bearer token');
  console.log(bearerToken);
  const url = `https://api.twitter.com/2/users/${userId}/following`;
  console.log(url);
  let users = [];
  let params = {
    max_results: 1000,
    "user.fields": "created_at",
  };

  const options = {
    headers: {
      "User-Agent": "v2FollowingJS",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving users this user is following...");
  while (hasNextPage) {
    let resp = await getPage(params, options, nextToken, url);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        users.push.apply(users, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  console.log(users);
  console.log(`Got ${users.length} users.`);
};

const getPage = async (params, options, nextToken, url) => {

  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

export { getFollowing };
