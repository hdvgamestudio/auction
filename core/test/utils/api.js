var _               = require('lodash'),
    url             = require('url'),
    moment          = require('moment'),
    config          = require('../../server/config'),
    ApiRouteBase    = config.apiBaseUri,
    host            = config.server.host,
    port            = config.server.port,
    schema          = 'http://',
    expectedProperties = {
      user: ['_id', 'username', 'email', 'first_name', 'last_name', 'avatar_url',
        'genre', 'birthday', 'phone', 'provider', 'access_token', 'password', 'created_at', 'modified_at'
      ]
    };

function getApiQuery(route) {
  return url.resolve(ApiRouteBase, route);
}

function getApiURL(route) {
  var baseURL = url.resolve(schema + host + ':' + port, ApiRouteBase);
  return url.resolve(baseURL, route);
}

// make sure the API only returns expected properties only
function checkResponseValue(jsonResponse, properties) {
  for (var i = 0; i < properties.length; i = i + 1) {
    // For some reason, settings response objects do not have the 'hasOwnProperty' method
    if (Object.prototype.hasOwnProperty.call(jsonResponse, properties[i])) {
      continue;
    }
    jsonResponse.should.have.property(properties[i]);
  }
  Object.keys(jsonResponse).length.should.eql(properties.length);
}

function checkResponse(jsonResponse, objectType, additionalProperties, missingProperties) {
  var checkProperties = expectedProperties[objectType];
  checkProperties = additionalProperties ? checkProperties.concat(additionalProperties) : checkProperties;
  checkProperties = missingProperties ? _.xor(checkProperties, missingProperties) : checkProperties;

  checkResponseValue(jsonResponse, checkProperties);
}

function isISO8601(date) {
  return moment(date).parsingFlags().iso;
}

module.exports = {
  getApiURL: getApiURL,
  getApiQuery: getApiQuery,
  checkResponse: checkResponse,
  checkResponseValue: checkResponseValue,
  isISO8601: isISO8601
};
