/**
 * The model 'User' that is used on authentication and session management. 
 */

// _____________________________________________________________________________

// Define some dependencies.

var keystone = require('keystone');
var Types = keystone.Field.Types;

// _____________________________________________________________________________

// Create a new model (list) via 'new keystone.List(key[, options])'.
// 
// See http://keystonejs.com/docs/database/#lists for all details
// 
// Valid option are:
//     label          - The label used for the list in the Admin UI.
//     path           - The path used for the list in the Admin UI.
//     singular       - The singular label for the items in the list.
//     plural         - The plural label for the items in the list.
//     schema         - Options for the Mongoose Schema for the List. 
//     drilldown      - A space-delimited list of relationships to display as 
//                      drilldown in the Admin UI.
//     inherits       - A list object to inherit fields from.
//     sortable       - Adds a hidden field sortOrder to the schema, and 
//                      enables drag and drop sorting in the Admin UI.
//     sortContext    - A List:relationship pair to control when drag and drop 
//                      sorting is available in the Admin UI.
//     searchFields   - A space-delimited list of paths to use for searching in 
//                      Admin UI
//     defaultSort    - The default column or path to sort on in the Admin UI.
//     defaultColumns - A comma-delimited list of default columns to display in 
//                      the Admin UI List View
//     map            - An object that maps fields to special list paths.
//     autokey        - Adds a plugin to the list that automatically generates 
//                      a key for each document when it is saved
//     track          - Adds a plugin to the list that automatically keeps 
//                      track of when and who created and last updated an item.
//     noedit         - Prevents editing of items in the list.
//     nocreate       - Prevents creation of new items in the list.
//     nodelete       - Prevents deletion of items from the list.
//     hidden         - Hides the list in the Keystone Admin UI.

var User = new keystone.List('User', {
    autokey: { path: 'key', from: 'screen_name', unique: true },
    track: true
});

// Add fields (object of keys and values) to the list via List.add(fields).
// Fields are defined by a set of key/value pairs where key is the name of a 
// field and value the field options.
// 
// See http://keystonejs.com/docs/database/#fields for all details.
//
// Valid field options are:
//     type      - The type of the field. Valid types are:
//                  Types.Boolean
//                  Types.Code
//                  Types.Color
//                  Types.Date
//                  Types.Datetime
//                  Types.Email
//                  Types.Html
//                  Types.Key
//                  Types.Location
//                  Types.Markdown
//                  Types.Money
//                  Types.Name
//                  Types.Number
//                  Types.Password
//                  Types.Select
//                  Types.Text
//                  Types.Textarea
//                  Types.AzureFile
//                  Types.CloudinaryImage
//                  Types.CloudinaryImages
//                  Types.Embedly
//                  Types.LocalFile
//                  Types.S3File
//     label     - The label of this field.
//     required  - validates that the field has a value before saving
//     initial   - Causes the field to be displayed in the Create Item form, 
//                 in the Admin UI.
//     noedit    - Renders the field as read-only in the admin UI.
//     note      - Is displayed with the field in the admin UI.
//     hidden    - The field will always be hidden in the Admin UI.
//     collapse  - Displays an + add link in the admin UI when the field has 
//                 no value. 
//     dependsOn - The field or header will only be displayed when the paths 
//                 specified in the object match the current data for the item.
//     watch     - When true, the field value will be recalculated every time 
//                 an item is saved. 
//     value     - The function to generate the field value when a watched path 
//                 is changed.
User.add({
    name: { 
        type: Types.Name,
        syntax: /^[A-Za-z0]+$/
    },
    screen_name: {
        type: String,
        label: "Screen Name",
        initial: true,
        index: true,
        required: true,
        unique: true,
        min_length: 4,
        max_length: 32,
        // The screen name must contain only ASCII characters and digits with
        // hyphens, underscores and dots as *internal* separators.
        syntax: /^[A-Za-z0-9]+(?:[\._-][A-Za-z0-9]+)*$/
    },
    email: { 
        type: Types.Email, 
        required: true, 
        initial: true,
        index: true,
        unique: true,
        syntax: /[^\s@]+@[^\s@]+\.[^\s@]+/
    },
    password: { 
        type: Types.Password,
        initial: true,  
        required: true,
        min_length: 6,
        max_length: 32
    }
}, 'Permissions', {
    is_admin: { 
        type: Boolean, 
        label: 'Can access Keystone', 
        index: true 
    },
    is_verified: { 
        type: Boolean, 
        label: 'Has a verified email address'
    }
});

// _____________________________________________________________________________

// Define some virtual properties.
// Virtuals are document properties that can be accessed by get and set but 
// that do not get persisted to the database. 

User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});

// NOTE: Virtuals can also be used to define virtual setters:
// User.schema.virtual('canAccessKeystone').set(function(canAccessKeystone) {
//    this.isAdmin = canAccessKeystone;
// });

// _____________________________________________________________________________

// Define some relationships.

// Syntax: User.relationship({ path: 'posts', ref: 'Post', refPath: 'author' })
// where
//     path    - the path of the relationship reference on the Model
//     ref     - the key of the referred Model (the one that has the 
//               relationship field)
//     refPath - the path of the relationship being referred to in the referred 
//               Model.
// User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

// _____________________________________________________________________________

// Define the columns to display in the Admin UI List View. 

User.defaultColumns = 'name, screen_name, email, is_admin, is_verified';

// Initialize and register the model.
User.register();
