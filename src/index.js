#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const packageJson = require('../package');
const generateObjectTypes = require('./generateObjectTypes');
const generateEnums = require('./generateEnums');

program
  .version(packageJson.version)
  .option('-s, --schema <path>', 'Path to schema.json.')
  .option('-e, --enums', 'Generate enums.')
  .option(
    '--enums-file-path <path>',
    'File path to generate enums to. Defaults to current folder and enums.js.flow.'
  )
  .option('-o, --object-types', 'Generate object types.')
  .option(
    '--object-types-file-path <path>',
    'File path to generate object types to. Defaults to current folder and object-types.js.flow.'
  )
  .parse(process.argv);

let schema;

try {
  schema = require(path.resolve(program.schema));
} catch (e) {
  console.error('Could not load schema.');
  process.exit(0);
}

let types;

if (schema.hasOwnProperty('__schema')) {
  types = schema.__schema.types;
} else if (
  schema.hasOwnProperty('data') &&
  schema.data.hasOwnProperty('__schema')
) {
  types = schema.data.__schema.types;
} else {
  throw new Error(`Could not find types in schema. 
  Please make sure the schema is available on the prop '__schema' on the first level of the schema.json, 
  or nested under a prop called 'data' on the first level of the schema.json.`);
}

/**
 * ENUMS
 */

if (!!program.enums) {
  console.log(chalk.yellow('Generating enums...'));
  const enumOutput = generateEnums(types);
  const enumsFilePath = path.resolve(
    typeof program.enumsFilePath === 'string'
      ? program.enumsFilePath
      : './enums.js'
  );

  console.log(chalk.green(`Enums generated to file ${enumsFilePath}`));
  fs.writeFileSync(enumsFilePath, enumOutput);
}

/**
 * OBJECT TYPES
 */

if (!!program.objectTypes) {
  console.log(chalk.yellow('Generating object types...'));
  const objectTypesOutput = generateObjectTypes(types);
  const objectTypesFilePath = path.resolve(
    typeof program.objectTypesFilePath === 'string'
      ? program.objectTypesFilePath
      : './object-types.js'
  );
  console.log(
    chalk.green(`Object types generated to file ${objectTypesFilePath}`)
  );
  fs.writeFileSync(objectTypesFilePath, objectTypesOutput);
}
