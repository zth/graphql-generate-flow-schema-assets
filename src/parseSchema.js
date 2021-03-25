const { buildSchema, getIntrospectionQuery, graphql } = require('graphql');

module.exports = async function parseSchema(rawSchemaContent, pathToSchema) {
  const schemaType = pathToSchema.split('.').pop();
  let schema;

  switch (schemaType.toLowerCase()) {
    default:
    case 'json':
      schema = JSON.parse(rawSchemaContent);
      break;
    case 'graphql':
      const graphqlSchema = buildSchema(rawSchemaContent);
      const jsonIntrospectionSchema = await graphql(
        graphqlSchema,
        getIntrospectionQuery(),
        {}
      );
      schema = jsonIntrospectionSchema;
      break;
  }

  return schema;
};
