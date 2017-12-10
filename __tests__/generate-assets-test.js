const generateEnums = require('../src/generateEnums');
const generateObjectTypes = require('../src/generateObjectTypes');

let types;

beforeEach(() => {
  types = require('../schema.json').__schema.types;
});

describe('Generate assets', () => {
  it('should generate enums', () => {
    expect(generateEnums(types)).toMatchSnapshot();
  });

  it('should generate object types', () => {
    expect(generateObjectTypes(types)).toMatchSnapshot();
  });
});
