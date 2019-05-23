# Usage

## Base Model

If your model includes the timestamp fields createdAt & updatedAt, simply import the `Base` model
class from this addon:

{{#docs-snippet name="import-base-model" title="app/models/some-model.js"}}
  import BaseModel from 'ember-data-base-model/models/-base';
{{/docs-snippet}}

...and extend your model accordingly:

```javascript
  import DS from 'ember-data';
  import BaseModel from 'ember-data-base-model/models/-base';
  
  export default BaseModel.extend({
    // your model attributes & relationships continue to go here
  });
```

## Base JSONAPI Serializer

_Coming Soon_
