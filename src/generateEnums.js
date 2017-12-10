const { prettierConfig, fileHeader } = require('./constants');
const prettier = require('prettier');

function generateEnums(types) {
  const enums = types
    .filter(t => t.name.startsWith('__') === false && t.kind === 'ENUM')
    .map(e => ({
      name: e.name,
      values: e.enumValues.map(val => val.name)
    }));

  let fileOutput = fileHeader;

  enums.forEach(e => {
    fileOutput += `
  export type ${e.name}Enum = ${e.values.map(val => `"${val}"`).join(' | ')};\n
  export const ${e.name}: {| ${e.values.map(
      v => `+${v}: "${v}"`
    )} |} = { ${e.values.map(val => `${val}: "${val}"`)} }\n\n`;
  });

  return prettier.format(fileOutput, prettierConfig);
}

module.exports = generateEnums;