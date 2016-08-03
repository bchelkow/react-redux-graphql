import GraphqlClient from 'graphql-client';

const client = GraphqlClient({
  url    : 'http://localhost:3000/graphql',
  headers: {
    "Content-Type"               : "application/graphql",
    "Access-Control-Allow-Origin": "*"
  }
});

const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
};

const finishedRequest = (response) => {
  return {
    type    : "FINISHED_REQUEST",
    response: response
  }
};

export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return client.query(payload, {}, function optionalCallback(req, res) {
      console.log(arguments);
      if (res.headers.get('x-powered-by') === 'Express') {
        throw new Error("Don't want conten served from express")
      }
    })
                 .then(response => dispatch(finishedRequest(JSON.parse(response))))
                 .catch(function (err) {
                   console.log(err.message)
                 });
  };
};
