var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ListItem Model
 */
var ListItem = new keystone.List('ListItem', {
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	}
});

ListItem.add({
	title: {
		type: String,
		initial: true, 	// Causes the field to be displayed in the Create form
		required: true
	},
	state: {
		type: Types.Select,
		options: 'draft, published, expired',
		default: 'draft',
		index: true
	},
	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},
	lists: {
		type: Types.Relationship,
		ref: 'List',
		many: true
	}
});

ListItem.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
ListItem.register();