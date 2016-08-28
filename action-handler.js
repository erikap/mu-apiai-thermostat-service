var path = require('path');
var { client } = require(path.join(__dirname, 'sparql'));
var { selectThermostatByLocation, insertTemperature } = require(path.join(__dirname, 'sparql-queries'));

var updateTemperature = function(amount, unit, calcTemperature) {
  const query = selectThermostatByLocation('living_room');
  client.query(query)
    .execute()
    .then(function (response) {
      if (response.results.bindings[0] && response.results.bindings[0].thermostat) {
	currTemperature = parseInt(response.results.bindings[0].temperature.value);
	newTemperature = calcTemperature(currTemperature, amount, unit);
	thermostat = response.results.bindings[0].thermostat.value;
	const updateQuery = insertTemperature(thermostat, newTemperature);
	client.query(updateQuery).execute();
      } else {
	console.log("No thermostat found");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

var handleAction = function(action, params) {
  if (params.temperature == undefined) { params.temperature = { amount: 2, unit: 'C' }; }
  switch (action) {
  case 'temperature.increase':
    console.log('Handle temperature increase action');
    var calcTemperature = function(oldTemperature, amount, unit) { return oldTemperature + amount; }
    updateTemperature(params.location, params.temperature.amount, params.temperature.unit, calcTemperature);
    break;
  case 'temperature.decrease':
    console.log('Handle temperature decrease action');
    var calcTemperature = function(oldTemperature, amount, unit) { return oldTemperature - amount; }
    updateTemperature(params.location, params.temperature.amount, params.temperature.unit, calcTemperature);
    break;
  case 'temperature.set':
    console.log('Handle set temperature to ' + params.temperature.amount);
    var calcTemperature = function(oldTemperature, amount, unit) { return amount; }
    updateTemperature(params.location, params.temperature.amount, params.temperature.unit, calcTemperature);
    break;
  default:
    console.log('No action handler found');
    break;
  }
}

module.exports = handleAction;
