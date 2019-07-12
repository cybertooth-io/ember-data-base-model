# Usage

## Base Model

If your model includes the timestamp fields createdAt & updatedAt, simply import the `Base` model
class from this addon:

{{#docs-snippet name="import-base-model" title="app/models/some-model.js"}}
  import BaseModel from 'ember-data-base-model/models/-base';
{{/docs-snippet}}

...and extend your model accordingly:

```javascript
  // app/models/your-model.js
  import DS from 'ember-data';
  import BaseModel from 'ember-data-base-model/models/-base';
  
  export default BaseModel.extend({
    // your model attributes & relationships continue to go here
  });
```

## Base JSONAPI Serializer

And ... if your model includes the timestamp fields `createdAt` & `updatedAt` from Rails,
I suggest you don't bother passing them in your POST/PATCH/PUT payloads.

Make your `app/serializers/application.js` serializer use our `BaseSerializer`:

```javascript
  // app/serializers/application.js
  import BaseSerializer from 'ember-data-base-model/serializers/-base';
  
  export default BaseSerializer.extend({
  // your serializer customization would go in here
});
``` 
