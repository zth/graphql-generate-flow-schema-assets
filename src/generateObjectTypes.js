const { prettierConfig, fileHeader } = require('./constants');
const prettier = require('prettier');

function generateObjectTypes(types) {
  const objects = types
    .filter(t => t.name.startsWith('__') === false && t.kind === 'OBJECT')
    .map(e => e.name)
    .filter(
      name =>
        !name.endsWith('Connection') &&
        !name.endsWith('Edge') &&
        !name.endsWith('Payload') &&
        !['PageInfo', 'RootQueryType', 'Mutation'].includes(name)
    );

  let fileOutput =
    fileHeader +
    `
  export type ObjectTypesEnum = ${objects.map(o => `"${o}"`).join(' | ')};

  export const ObjectTypes: {| ${objects.map(o => `+${o}: "${o}"`)} |} = {
  `;

  objects.forEach(name => {
    fileOutput += `${name}: "${name}",`;
  });

  fileOutput += '}';

  return prettier.format(fileOutput, prettierConfig);
}

module.exports = generateObjectTypes;