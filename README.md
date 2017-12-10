# graphql-generate-flow-schema-assets
A small lib to help generating various Flow assets from a GraphQL schema.
It currently finds all `enum` and `object` types in your schema and outputs them both as JS constants and as Flow types.

The point of this lib is to:

1. Make you rely on auto generated code straight from the source of truth (the schema),
instead of hard coding constants into your code.
1. Help type check and by that make your code resilient to change by providing a fully typed 
extraction of assets from your GraphQL schema. 

Ideally, this lib is used in combination with saving your schema from your backend.
Example in `package.json`:

```
"scripts": {
  ...
  "graphql:save-schema": "some-script-to-save-your-schema && npm run graphql:generate-assets",
  "graphql:generate-assets": "graphql-generate-flow-schema-assets -s path/to/schema.json --enums --object-types --enum-file-path ./src/constants/enums.js --object-types-file-path ./src/constants/object-types.js"
  ...
```

This way, your code always relies auto generated code 100% in sync with your backend.
If something changes in a incompatible way in the schema, Flow will tell you since the generated types will change.

## Installation
```
npm install -g graphql-generate-flow-schema-assets
```

## Usage
All options can be seen by running:
```
graphql-generate-flow-schema-assets -h
```
### Generating Enum constants
```
graphql-generate-flow-schema-assets -s path/to/schema.json --enums
```
This will generate a file containing all enums from your GraphQL schema
both as types and as actual objects. This means that instead of doing:

```
if (user.status === 'Active') {
...
```

You can do:

```
import { UserStatuses } from '../path/to/enums.js';

if (user.status === UserStatuses.Active) {
...
```

...meaning it'll be type checked, auto completed by your editor/IDE, and all 
of that good stuff.

### Generating Object types
```
graphql-generate-flow-schema-assets -s path/to/schema.json --object-types
```
This will generate a file containing all object types from your GraphQL schema
both as types and as properties on one root object. This means that instead of doing:

```
if (userOrSomeOtherType.__typename === 'User') {
    ...
```

You can do:

```
import { ObjectTypes } from '../path/to/object-types.js';

if (user.status === ObjectTypes.User) {
    ...
```

...meaning it'll be type checked, auto completed by your editor/IDE, and all 
of that good stuff.