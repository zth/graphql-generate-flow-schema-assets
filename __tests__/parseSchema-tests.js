const parseSchema = require('../src/parseSchema');

describe('parseSchema', () => {
  it('should handle schema in JSON format', async () => {
    expect(
      await parseSchema(
        `{ "some": "object", "for": "illustrative", "purposes": true }`,
        '/some/random/path/schema.json'
      )
    ).toEqual({
      some: 'object',
      for: 'illustrative',
      purposes: true
    });
  });

  it('should handle schema in GraphQL SDL format', async () => {
    expect(
      await parseSchema(
        `
    schema {
      query: Root
    }
    
    type Root {
      viewer: User!
    }
    
    type User {
      id: ID!
      name: String
      type: UserType
    }
    
    enum UserType {
      STUDENT
      TEACHER
      PARENT
    }
    `,
        '/some/random/path/schema.graphql'
      )
    ).toMatchSnapshot();
  });
});
