const {SparqlClient, SPARQL} = require('sparql-client-2');

// setup SPARQL client with predefined namespaces
const client = new SparqlClient(process.env.MU_SPARQL_ENDPOINT)
  .register({
    mu: 'http://mu.semte.ch/vocabularies/',
    muCore: 'http://mu.semte.ch/vocabularies/core/',
    muExt: 'http://mu.semte.ch/vocabularies/ext/'
  });

module.exports = {
  client: client,
  SPARQL: SPARQL
};
