/**
 * The model 'List'.
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

var List = new keystone.List('List', {
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	}
});

List.add({
	title: {
		type: String,
		initial: true,
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
	image: {
		type: Types.CloudinaryImage
	},
});

List.relationship({
	ref: 'ListItem',
	path: 'items'
});

List.register();