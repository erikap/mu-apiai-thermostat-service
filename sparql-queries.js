var path = require('path');
var { SPARQL } = require(path.join(__dirname, 'sparql'));

var selectThermostatByLocation = function(location) {
  return SPARQL`
  PREFIX demo: <http://mu.semte.ch/vocabularies/ext/apiai-demo/>

  SELECT ?thermostat ?temperature WHERE {
    GRAPH ${{ value: process.env.MU_APPLICATION_GRAPH, type: 'uri' }} {
      ?thermostat a demo:Thermostat ;
      demo:location ${location} ;
      demo:temperature ?temperature .
    }
  } LIMIT 1`;
}

var insertTemperature = function(thermostat, temperature) {
  return SPARQL`
  PREFIX demo: <http://mu.semte.ch/vocabularies/ext/apiai-demo/>
  
  WITH ${{ value: process.env.MU_APPLICATION_GRAPH, type: 'uri' }}
  DELETE { ${{ value: thermostat, type: 'uri' }} demo:temperature ?temperature }
  INSERT { ${{ value: thermostat, type: 'uri' }} demo:temperature ${{ value: temperature, type: 'decimal' }} }
  WHERE  { ${{ value: thermostat, type: 'uri' }} demo:temperature ?temperature }
  `
}

module.exports = {
  selectThermostatByLocation: selectThermostatByLocation,
  insertTemperature: insertTemperature
};
