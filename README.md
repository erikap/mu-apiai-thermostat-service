# mu-apiai-thermostat-service
Microservice to manage thermostats through [api.ai](http://api.ai) conversations

## API
### GET /?q={text} 
Send text to the [api.ai](http://api.ai) engine. The text is passed through the query param `q`.

The response contains an action and parameters. The implementation of the response handling can be found in `action-handler.js`.

E.g. `http://my-apiai-thermostat-service?q="It's cold in the kitchen".`

## Configuration
The [api.ai](http://api.ai) client access token can be configured through the `APIAI_ACCESS_TOKEN` environment variable. This environment variable is required.

The SPARQL endpoint can be configured through the `MU_SPARQL_ENDPOINT` environment variable. By default this is set to `http://database:8890/sparql`. In that case the triple store used in the backend should be linked to the microservice container as `database`.

The `MU_APPLICATION_GRAPH` environment variable specifies the graph in the triple store the microservice will work in. By default this is set to `http://mu.semte.ch/application`. The graph name can be used in the service via `process.env.MU_APPLICATION_GRAPH`.
