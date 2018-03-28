//Connect to OKTA create users API
var request = require("request");
require('dotenv').config();

module.exports = function(app) {
  app.post("/api/register", function(req, res) {
    //console.log("process.env.apiKey "+ process.env.apiKey);
    console.log(req.body);
    var apiKey = "0055AoJ3LX24PesXlm2x889Z7hQSM2ijhnWkT2LAfy";
    var registerBody = {
      "profile": {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "login": req.body.email,
        "mobilePhone": req.body.mobilePhone
      },
      "credentials": {
        "password": {
          "value": req.body.password
        }
      }
    }

    request({
      method: "POST",
      url: "https://dev-718531.oktapreview.com/api/v1/users?activate=true",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "SSWS " + apiKey
      },
      body: JSON.stringify(registerBody)
    }, function(error, response, body) {
      if (error) {
        console.error(error);
        return res.send(500, "Server Error");
      }
      // console.log('Status:', response.statusCode);
      // console.log('Headers:', JSON.stringify(response.headers));
      // console.log('Response:', body);
      var json = JSON.parse(body);
      console.log(json);

      var dbObj = {
        id: json.id,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email
      };
      res.json(dbObj);
    })
  });
}
