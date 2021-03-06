'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
// var shelljs = require('shelljs');
// var fs = require('fs');
var utils = require('../utils'), util = null;
var promptAnswers = {};
// console.log(utils);
// var strings = require('yeoman-generator/underscore.strings');
module.exports = yeoman.generators.Base.extend({
    initializing: function() {
        var done = this.async();
        this.pkg = require('../../package.json');
        var g = this;
        util = utils(g);


        done();
    },
    prompting: function() {
        var done = this.async();
        // var _ = this._;
        var g = this;
        var vars = this.config.getAll();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the divine ' + chalk.red('Chayka') + ' generator!'));
        var prompts = [{
            name: 'mechanism',
            message: 'Please select mechanism you need to generate:',
            type: 'list',
            choices: function(){
                return [
                    {
                        name: 'Custom Post Type',
                        value: 'post-type',
                    }, {
                        name: 'Taxonomy',
                        value: 'taxonomy',
                    }, 
                ];
            },
            default: ''
        }, 
            /* Custom Post Types */
        {
            name: 'postType',
            message: 'Post type. ' + chalk.reset.gray('(slugified, max. 20 characters, can not contain capital letters or spaces)') + ':\n',
            filter: function(value){
                return util.slugify(value);
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'labels',
            message: 'Auto-generate labels?',
            type: 'confirm',
            default: function(answers){
                answers.singularName = util.capitalize(util.humanize(answers.postType));
                answers.pluralName = util.plural(answers.singularName);
                answers.menuName = answers.pluralName;
                answers.nameAdminBar = answers.singularName;
                answers.allItems = answers.pluralName;
                answers.addNew = 'Add New';
                answers.addNewItem = answers.addNew + ' ' + answers.singularName;
                answers.editItem = 'Edit ' + answers.singularName;
                answers.newItem = 'New ' + answers.singularName;
                answers.viewItem = 'View ' + answers.singularName;
                answers.searchItems = 'Search ' + answers.pluralName;
                answers.notFound = 'No ' + answers.pluralName.toLowerCase() + ' found';
                answers.notFoundInTrash = 'No ' + answers.pluralName.toLowerCase() + ' found in Trash';
                answers.parentItemColon = 'Parent ' + answers.singularName;
                return true;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'pluralName',
            message: chalk.green('name') + chalk.reset(' - general name for the post type, usually plural:\n'),
            default: function(answers){
                return util.capitalize(util.humanize(util.plural(answers.postType)));
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'singularName',
            message: chalk.green('singular_name') + chalk.reset(' - name for one object of this post type:\n'),
            default: function(answers){
                return util.capitalize(util.humanize(util.singular(answers.pluralName)));
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'menuName',
            message: chalk.green('menu_name') + chalk.reset(' - the menu name text. This string is the name to give menu items:\n'),
            default: function(answers){
                return answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'nameAdminBar',
            message: chalk.green('name_admin_bar') + chalk.reset(' - name given for the "Add New" dropdown on admin bar:\n'),
            default: function(answers){
                return answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'allItems',
            message: chalk.green('all_items') + chalk.reset(' - the all items text used in the menu:\n'),
            default: function(answers){
                return answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'addNew',
            message: chalk.green('add_new') + chalk.reset(' - the add new text:\n'),
            default: function(){
                return 'Add New';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'addNewItem',
            message: chalk.green('add_new_item') + chalk.reset(' - the add new item text:\n'),
            default: function(answers){
                return answers.addNew + ' ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'editItem',
            message: chalk.green('edit_item') + chalk.reset(' - the edit item text. In the UI, this label is used as the main header on the post\'s editing panel:\n'),
            default: function(answers){
                return 'Edit ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'newItem',
            message: chalk.green('new_item') + chalk.reset(' - the new item text:\n'),
            default: function(answers){
                return 'New ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'viewItem',
            message: chalk.green('view_item') + chalk.reset(' - the view item text:\n'),
            default: function(answers){
                return 'View ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'searchItems',
            message: chalk.green('search_items') + chalk.reset(' - the search items text:\n'),
            default: function(answers){
                return 'Search ' + answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'notFound',
            message: chalk.green('not_found') + chalk.reset(' - the not found text:\n'),
            default: function(answers){
                return 'No ' + answers.pluralName.toLowerCase() + ' found';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'notFoundInTrash',
            message: chalk.green('not_found_in_trash') + chalk.reset(' - the not found in trash text:\n'),
            default: function(answers){
                return 'No ' + answers.pluralName.toLowerCase() + ' found in Trash';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'parentItemColon',
            message: chalk.green('parent_item_colon') + chalk.reset(' - the parent item text (without colon, please):\n'),
            default: function(answers){
                return 'Parent ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !answers.labels;
            }
        },
        {
            name: 'description',
            message: 'Post Type ' + chalk.green('description') + chalk.reset(' - A short descriptive summary of what the post type is:\n'),
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'public',
            message: chalk.green('public') + chalk.reset(' - Controls how the type is visible to authors (show_in_nav_menus, show_ui) and readers (exclude_from_search, publicly_queryable):\n'),
            type: 'confirm',
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'excludeFromSearch',
            message: chalk.green('exclude_from_search') + chalk.reset(' - Whether to exclude posts with this post type from front end search results:\n'),
            type: 'confirm',
            default: function(answers){
                return !answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'publiclyQueryable',
            message: chalk.green('publicly_queryable') + chalk.reset(' - Whether queries can be performed on the front end as part of parse_request():\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'showUi',
            message: chalk.green('show_ui') + chalk.reset(' - Whether to generate a default UI for managing this post type in the admin:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'showInNavMenus',
            message: chalk.green('show_in_nav_menus') + chalk.reset(' - Whether post_type is available for selection in navigation menus:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'showInMenu',
            message: chalk.green('show_in_menu') + chalk.reset(' - Where to show the post type in the admin menu:\n'),
            type: 'list',
            choices: [
                {'value': false, 'name': 'do not display in the admin menu'},
                {'value': true, 'name': 'display as a top level menu'},
                {'value': 'custom', 'name': 'display as a sub page of a top level menu defined below'},
            ],
            default: function(answers){
                return !!answers.showUi;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && answers.showUi;
            }
        },
        {
            name: 'showInMenu',
            message: chalk.green('show_in_menu') + chalk.reset(' - Define parent top level menu:\n'),
            default: function(){
                return 'edit.php?post_type=page';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && answers.showInMenu === 'custom';
            }
        },
        {
            name: 'menuPosition',
            message: chalk.green('menu_position') + chalk.reset(' - The position in the menu order the post type should appear:\n'),
            type: 'list',
            choices: [
                {value: '5', name:'5 - below Posts'},
                {value: '10', name:'10 - below Media'},
                {value: '15', name:'15 - below Links'},
                {value: '20', name:'20 - below Pages'},
                {value: '25', name:'25 - below Comments'},
                {value: '60', name:'60 - below first separator'},
                {value: '65', name:'65 - below Plugins'},
                {value: '70', name:'70 - below Users'},
                {value: '75', name:'75 - below Tools'},
                {value: '80', name:'80 - below Settings'},
                {value: '100', name:'100 - below second separator'},
            ],
            default: function(){
                return '25';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !!answers.showInMenu;
            }
        },
        {
            name: 'menuIcon',
            message: chalk.green('menu_icon') + chalk.reset(' - The url to the icon to be used for this menu or the name of the icon from the iconfont\n') + 
                    chalk.cyan('https://developer.wordpress.org/resource/dashicons/#wordpress') + '\n',
            default: function(){
                return 'dashicons-admin-post';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && !!answers.showInMenu;
            }
        },
        {
            name: 'showInAdminBar',
            message: chalk.green('show_in_admin_bar') + chalk.reset(' - Whether to make this post type available in the WordPress admin bar:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.showInMenu;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'capabilityType',
            message: chalk.green('capability_type') + chalk.reset(' - The string to use to build the read, edit, and delete capabilities:\n'),
            type: 'list',
            choices: function(answers){
                return [
                    {value: 'post', name: 'post'},
                    {value: 'page', name: 'page'},
                    {value: 'custom', name: util.slugify(answers.singularName) + ', ' + util.slugify(answers.pluralName)},
                ];
            },
            default: function(){
                return 'post';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'hierarchical',
            message: chalk.green('hierarchical') + chalk.reset(' - Whether the post type is hierarchical. Allows Parent to be specified:\n'),
            type: 'confirm',
            default: function(){
                return false;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'supports',
            message: chalk.green('supports') + chalk.reset(' - An alias for calling add_post_type_support() directly:\n'),
            type: 'checkbox',
            choices: function(answers){
                return [
                    {value: 'title', name: 'title', checked: true},
                    {value: 'editor', name: 'editor' + chalk.cyan(' (content)'), checked: true},
                    {value: 'author', name: 'author', checked: false},
                    {value: 'thumbnail', name: 'thumbnail' + chalk.cyan(' (featured image, current theme must also support post-thumbnails)'), checked: true},
                    {value: 'excerpt', name: 'excerpt', checked: true},
                    {value: 'trackbacks', name: 'trackbacks', checked: false},
                    {value: 'custom-fields', name: 'custom-fields', checked: false},
                    {value: 'comments', name: 'comments' + chalk.cyan(' (also will see comment count balloon on edit screen)'), checked: false},
                    {value: 'revisions', name: 'revisions' + chalk.cyan(' (will store revisions)'), checked: false},
                    {value: 'page-attributes', name: 'page-attributes' + chalk.cyan(' (menu order, \'hierarchical\' must be true to show Parent option)'), checked: !!answers.hierarchical},
                    {value: 'post-formats', name: 'post-formats', checked: false},
                ];
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'taxonomies',
            message: chalk.green('taxonomies') + chalk.reset(' - An array of registered taxonomies like category or post_tag that will be used with this post type:\n'),
            default: function(){
                return 'category, post_tag';
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'hasArchive',
            message: chalk.green('has_archive') + chalk.reset(' - Enables post type archives. Will use $post_type as archive slug by default:\n'),
            type: 'confirm',
            default: function(){
                return false;
            },
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'rewrite',
            message: chalk.green('rewrite') + chalk.reset(' - Triggers the handling of rewrites for this post type:\n'),
            type: 'confirm',
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
        {
            name: 'queryVar',
            message: chalk.green('query_var') + chalk.reset(' - adds the custom post type’s query var to the built-in query_vars array so that WordPress will recognize it. WordPress removes any query var not included in that array:\n'),
            default: function(answers){
                return util.slugify(answers.singularName);
            },
            when: function(answers) {
                return answers.mechanism === 'post-type' && answers.publiclyQueryable;
            }
        },
        {
            name: 'canExport',
            message: chalk.green('can_export') + chalk.reset(' - Can this post_type be exported:\n'),
            type: 'confirm',
            when: function(answers) {
                return answers.mechanism === 'post-type';
            }
        },
            /* Custom Taxonomies */
        {
            name: 'taxonomy',
            message: 'The name of the taxonomy. ' + chalk.reset.gray('Name should only contain lowercase letters and the underscore character, and not be more than 32 characters long (database structure restriction).') + ':\n',
            filter: function(value){
                return util.underscored(value);
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'objectType',
            message: 'Name of the object type for the taxonomy object. ' + chalk.reset.gray('Object-types can be built-in Post Type or any Custom Post Type that may be registered.') + ':\n',
            type: 'checkbox',
            choices: function(){
                return [
                    {name: 'post', value: '\'post\''},
                    {name: 'page', value: '\'page\''},
                    {name: 'attachment', value: '\'attachment\''},
                    {name: 'revision', value: '\'revision\''},
                    {name: 'nav_menu_item', value: '\'nav_menu_item\''},
                ];
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'hierarchical',
            message: chalk.green('hierarchical') + chalk.reset(' - Is this taxonomy hierarchical (have descendants) like categories or not hierarchical like tags:\n'),
            type: 'list',
            choices: [
                {value: false, name: chalk.green('not hierarchical') + ' like tags'},
                {value: true, name: chalk.green('hierarchical') + ' like categories (have descendants)'},
            ],
            default: function(){
                return false;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'labels',
            message: 'Auto-generate labels?',
            type: 'confirm',
            default: function(answers){
                answers.singularName = util.capitalize(util.humanize(answers.taxonomy));
                answers.pluralName = util.plural(answers.singularName);
                answers.menuName = answers.pluralName;
                answers.allItems = 'All ' + answers.pluralName;
                answers.editItem = 'Edit ' + answers.singularName;
                answers.viewItem = 'View ' + answers.singularName;
                answers.updateItem = 'Update ' + answers.singularName;
                answers.addNewItem = 'Add New ' + answers.singularName;
                answers.newItemName = 'New ' + answers.singularName + ' Name';
                answers.parentItem = 'Parent ' + answers.singularName;
                answers.searchItems = 'Search ' + answers.pluralName;
                answers.popularItems = 'Popular ' + answers.pluralName;
                answers.separateItemsWithCommas = 'Separate ' + answers.pluralName.toLowerCase() + ' with commas';
                answers.addOrRemoveItems = 'Add or remove ' + answers.pluralName.toLowerCase();
                answers.chooseFromMostUsed = 'Choose from the most used ' + answers.pluralName.toLowerCase();
                answers.notFound = 'No ' + answers.pluralName.toLowerCase() + ' found.';
                return true;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'pluralName',
            message: chalk.green('name') + chalk.reset(' - general name for the taxonomy, usually plural:\n'),
            default: function(answers){
                return util.capitalize(util.humanize(util.plural(answers.taxonomy)));
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'singularName',
            message: chalk.green('singular_name') + chalk.reset(' - name for one object of this taxonomy:\n'),
            default: function(answers){
                return util.capitalize(util.humanize(util.singular(answers.pluralName)));
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'menuName',
            message: chalk.green('menu_name') + chalk.reset(' - the menu name text. This string is the name to give menu items:\n'),
            default: function(answers){
                return answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'allItems',
            message: chalk.green('all_items') + chalk.reset(' - the all items text:\n'),
            default: function(answers){
                return 'All ' + answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'editItem',
            message: chalk.green('edit_item') + chalk.reset(' - the edit item text:\n'),
            default: function(answers){
                return 'Edit ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'viewItem',
            message: chalk.green('view_item') + chalk.reset(' - the view item text:\n'),
            default: function(answers){
                return 'View ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'updateItem',
            message: chalk.green('update_item') + chalk.reset(' - the update item text:\n'),
            default: function(answers){
                return 'Update ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'addNewItem',
            message: chalk.green('add_new_item') + chalk.reset(' - the add new item text:\n'),
            default: function(answers){
                return 'Add New ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'newItemName',
            message: chalk.green('new_item_name') + chalk.reset(' - the new item name text:\n'),
            default: function(answers){
                return 'New ' + answers.singularName + ' Name';
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'parentItem',
            message: chalk.green('parent_item') + chalk.reset(' - the parent item text. This string is not used on non-hierarchical taxonomies such as post tags:\n'),
            default: function(answers){
                return 'Parent ' + answers.singularName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !!answers.hierarchical;
            }
        },
        {
            name: 'searchItems',
            message: chalk.green('search_items') + chalk.reset(' - the search items text:\n'),
            default: function(answers){
                return 'Search ' + answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels;
            }
        },
        {
            name: 'popularItems',
            message: chalk.green('popular_items') + chalk.reset(' - the popular items text. This string is not used on hierarchical taxonomies:\n'),
            default: function(answers){
                return 'Popular ' + answers.pluralName;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !answers.hierarchical;
            }
        },
        {
            name: 'separateItemsWithCommas',
            message: chalk.green('separate_items_with_commas') + chalk.reset(' - the separate item with commas text used in the taxonomy meta box. This string is not used on hierarchical taxonomies:\n'),
            default: function(answers){
                return 'Separate ' + answers.pluralName.toLowerCase() + ' with commas';
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !answers.hierarchical;
            }
        },
        {
            name: 'addOrRemoveItems',
            message: chalk.green('add_or_remove_items') + chalk.reset(' - the add or remove items text and used in the meta box when JavaScript is disabled. This string is not used on hierarchical taxonomies:\n'),
            default: function(answers){
                return 'Add or remove ' + answers.pluralName.toLowerCase();
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !answers.hierarchical;
            }
        },
        {
            name: 'chooseFromMostUsed',
            message: chalk.green('choose_from_most_used') + chalk.reset(' - the choose from most used text used in the taxonomy meta box. This string is not used on hierarchical taxonomies:\n'),
            default: function(answers){
                return 'Choose from the most used ' + answers.pluralName.toLowerCase();
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !answers.hierarchical;
            }
        },
        {
            name: 'notFound',
            message: chalk.green('not_found') + chalk.reset(' - the text displayed via clicking \'Choose from the most used tags\' in the taxonomy meta box when no tags are available. This string is not used on hierarchical taxonomies:\n'),
            default: function(answers){
                return 'No ' + answers.pluralName.toLowerCase() + ' found.';
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && !answers.labels && !answers.hierarchical;
            }
        },
        {
            name: 'public',
            message: chalk.green('public') + chalk.reset(' - If the taxonomy should be publicly queryable:\n'),
            type: 'confirm',
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'showUi',
            message: chalk.green('show_ui') + chalk.reset(' - Whether to generate a default UI for managing this taxonomy. As of 3.5, setting this to false for attachment taxonomies will hide the UI:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'showInNavMenus',
            message: chalk.green('show_in_nav_menus') + chalk.reset(' - true makes this taxonomy available for selection in navigation menus:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.public;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'showTagcloud',
            message: chalk.green('show_tagcloud') + chalk.reset(' - Whether to allow the Tag Cloud widget to use this taxonomy:\n'),
            type: 'confirm',
            default: function(answers){
                return !!answers.showUi;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'metaBoxCb',
            message: chalk.green('meta_box_cb') + chalk.reset(' - Whether show default metabox or not:\n'),
            type: 'list',
            choices: function(answers){
                return [
                    {'name': 'Show default taxonomy metabox', 'value': answers.hierarchical?
                        'post_categories_meta_box' : 'post_tags_meta_box'},
                    {'name': 'Hide default taxonomy metabox', 'value': false},
                ];
            },
            default: function(){
                return 0;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'showAdminColumn',
            message: chalk.green('show_admin_column') + chalk.reset(' - Whether to allow automatic creation of taxonomy columns on associated post-types table:\n'),
            type: 'confirm',
            default: function(){
                return false;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'updateCountCallback',
            message: chalk.green('update_count_callback') + chalk.reset(' - (optional) A function name that will be called when the count of an associated $object_type, such as post, is updated. Works much like a hook:\n'),
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'queryVar',
            message: chalk.green('query_var') + chalk.reset(' - False to disable the query_var, set as string to use custom query_var instead of default which is $taxonomy, the taxonomy\'s "name":\n'),
            type: 'list',
            choices: function(answers){
                return [
                    {'name': 'Default', 'value': answers.taxonomy},
                    {'name': 'None', 'value': false},
                    {'name': 'Custom', 'value': 'custom'},
                ];
            },
            default: function(){
                return 0;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'queryVar',
            message: chalk.green('query_var') + chalk.reset(' - Set custom query_var instead of default which is $taxonomy, the taxonomy\'s "name":\n'),
            default: function(answers){
                return answers.taxonomy;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy' && answers.queryVar === 'custom';
            }
        },
        {
            name: 'rewrite',
            message: chalk.green('rewrite') + chalk.reset(' - Set to false to prevent automatic URL rewriting a.k.a. "pretty permalinks":\n'),
            type: 'confirm',
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        {
            name: 'sort',
            message: chalk.green('sort') + chalk.reset(' - Whether this taxonomy should remember the order in which terms are added to objects:\n'),
            type: 'confirm',
            default: function(){
                return false;
            },
            when: function(answers) {
                return answers.mechanism === 'taxonomy';
            }
        },
        ];
        try{
            this.prompt(prompts, function(answers) {
                util.extend(promptAnswers, vars, answers);
                // _.extend(this.Chayka.options, answers);
                done();
            }.bind(this));

        }catch(e){
            g.log(e.stack);
        }
    },
    writing: {
        app: function() {

        },

        directories: function() {
            this.mkdir(this.destinationPath('app'));
            this.mkdir(this.destinationPath('app/helpers'));
        },

        customPostType: function(){
            // var vars = this.Chayka.options;
            var vars = promptAnswers;
            // var g = this;
            if(vars.mechanism === 'post-type'){

                var constantCode = util.readTpl('code/registerCustomPostType.constant.xphp', vars);
                var functionCode = util.readTpl('code/registerCustomPostType.function.xphp', vars);
                var registerCode = util.readTpl('code/registerCustomPostType.register.xphp', vars);

                var appFile = vars.appType === 'plugin'?'Plugin.php':'Theme.php';

                var appCode = util.readDst(appFile);

                if(appCode.indexOf('registerCustomPostTypes') > -1 ){
                    appCode = util.insertAtSlashStarComment('constants', appCode, constantCode);
                    appCode = util.insertAtSlashStarComment('registerCustomPostType', appCode, functionCode);
                    appCode = util.insertAtSlashStarComment('registerCustomPostTypes', appCode, registerCode);
                    util.write(appFile, appCode);
                }else{
                    this.composeWith('chayka', 
                        {
                            options: {
                                'externalCall': 'enable-custom-post-types',
                                'externalEmbeddings': [
                                    {
                                        'file': appFile,
                                        'marker': 'constants',
                                        'mode': 'curly',
                                        'insert': constantCode,
                                    },
                                    {
                                        'file': appFile,
                                        'marker': 'registerCustomPostType',
                                        'mode': 'curly',
                                        'insert': functionCode,
                                    },
                                    {
                                        'file': appFile,
                                        'marker': 'registerCustomPostTypes',
                                        'mode': 'curly',
                                        'insert': registerCode,
                                    },
                                ],
                            }
                        }
                    );
                }
                var customPostTypes = this.config.get('customPostTypes');
                if(!customPostTypes){
                    customPostTypes = [];                    
                }
                if(customPostTypes.indexOf(vars.postType) === -1){
                    customPostTypes.push(vars.postType);   
                }
                this.config.set('customPostTypes', customPostTypes);
            }


        },

        taxonomy: function(){
            // var vars = this.Chayka.options;
            var vars = promptAnswers;
            // var g = this;
            if(vars.mechanism === 'taxonomy'){

                var constantCode = util.readTpl('code/registerTaxonomy.constant.xphp', vars);
                var functionCode = util.readTpl(vars.hierarchical ? 
                        'code/registerTaxonomy.function.cat.xphp':
                        'code/registerTaxonomy.function.tag.xphp', 
                        vars);
                var registerCode = util.readTpl('code/registerTaxonomy.register.xphp', vars);

                var appFile = vars.appType === 'plugin'?'Plugin.php':'Theme.php';

                var appCode = util.readDst(appFile);

                if(appCode.indexOf('registerTaxonomies') > -1 ){
                    appCode = util.insertAtSlashStarComment('constants', appCode, constantCode);
                    appCode = util.insertAtSlashStarComment('registerTaxonomy', appCode, functionCode);
                    appCode = util.insertAtSlashStarComment('registerTaxonomies', appCode, registerCode);
                    util.write(appFile, appCode);
                }else{
                    this.composeWith('chayka', 
                        {
                            options: {
                                'externalCall': 'enable-taxonomies',
                                'externalEmbeddings': [
                                    {
                                        'file': appFile,
                                        'marker': 'constants',
                                        'mode': 'curly',
                                        'insert': constantCode,
                                    },
                                    {
                                        'file': appFile,
                                        'marker': 'registerTaxonomy',
                                        'mode': 'curly',
                                        'insert': functionCode,
                                    },
                                    {
                                        'file': appFile,
                                        'marker': 'registerTaxonomies',
                                        'mode': 'curly',
                                        'insert': registerCode,
                                    },
                                ],
                            }
                        }
                    );
                }
                var taxonomies = this.config.get('taxonomies');
                if(!taxonomies){
                    taxonomies = [];                    
                }
                if(taxonomies.indexOf(vars.taxonomy) === -1){
                    taxonomies.push(vars.taxonomy);   
                }
                this.config.set('taxonomies', taxonomies);
            }

        },


    },
    install: function() {

    }
});