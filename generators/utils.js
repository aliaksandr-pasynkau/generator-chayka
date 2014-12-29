'use strict';

var fs = require('fs');

module.exports = function(g){

	var utils = {
		mkdir: function(path){
			return g.mkdir(g.destinationPath(path));
		},

		pathExists: function(path){
			return fs.existsSync(g.destinationPath(path));
		},

	    readDirDst: function(path) {
	        return fs.readdirSync(g.destinationPath(path));
	    },

	    readDirTpl: function(path) {
	        return fs.readdirSync(g.templatePath(path));
	    },

	    readDst: function(file) {
	        return g.fs.read(g.destinationPath(file));
	    },

	    readTpl: function(file, context) {
	        var tpl = g.fs.read(g.templatePath(file));
	        return context ? g._.template(tpl, context) : tpl;
	    },

	    write: function(file, content){
	    	return g.fs.write(g.destinationPath(file), content);
	    },

	    append: function(file, content){
	    	var old = utils.readDst(g, file);
	    	return utils.write(g, file, old + content);
	    },

	    copy: function(tpl, dst, context){
	    	if(context){
	    		return g.template(g.templatePath(tpl), g.destinationPath(dst), context);
	    	}else{
		    	return g.fs.copy(g.templatePath(tpl), g.destinationPath(dst));
	    	}
	    },

	    readTplJSON: function(file, context) {
	        return JSON.parse(utils.readTpl(g, file, context));
	    },

	    readJSON: function(file) {
	        var json = g.fs.read(g.destinationPath(file));
	        return JSON.parse(json);
	    },

	    writeJSON: function(file, json) {
	        g.fs.write(g.destinationPath(file), JSON.stringify(json, null, 4));
	    },

	    insertAtSlashStarComment: function(marker, containerCode, insertCode, replace){
	    	var re = new RegExp('(?:\\n)\\s*\\/\\*\\s*chayka:\\s*' + marker.replace(/[\/\.]/, function(m){return '\\\\'+m;}) + '\\s*\\*\\/', 'g');
	        return containerCode.replace(re, function(match) {
	            return (insertCode ? '\n' + insertCode : '') + (replace ? '' : match);
	        });
	    },

	    insertBeforeClosingBracket: function(containerCode, insertCode){
	        return containerCode.replace(/\}(?:[^}]*)\s*$/, insertCode + '}');
	    },

	    insertAtHtmlComment: function(marker, containerCode, insertCode, replace){
	    	var re = new RegExp('(?:\\n)\\s*<!--\\s*chayka:\\s*' + marker.replace(/[\/\.]/, function(m){return '\\\\'+m;}) + '\\s*-->', 'g');
	        return containerCode.replace(re, function(match) {
	            return (insertCode ? '\n' + insertCode : '') + (replace ? '' : match);
	        });
	    },

	    dasherize: function(name){
	        return g._.dasherize(name);   
	    },

	    slugify: function(name){
	        return g._.slugify(name);   
	    },

	    classify: function(name){
	        return g._.classify(name);   
	    },

	    camelize: function(name){
	        return g._.camelize(name);   
	    },

	    underscored: function(name){
	        return g._.underscored(name);   
	    },

	    humanize: function(name){
	        return g._.humanize(name);   
	    },

	    plural: function(name){
	    	return name.replace(/y$/, 'ie') + 's';
	    },

	    singular: function(){
	    	return name.replace(/s$/, '').replace(/ie/, 'y');
	    },

	    template: function(tpl, context){
	    	return g._.template(tpl, context);
	    },

	    strToArray: function(str){
	    	return str.split(/,\s+/);
	    },

	    extend: function(){
	    	return g._.extend.apply(g._, arguments);
	    },

	    checkRequired: function(value){
	        return !!value || 'This field is required';
	    },

        promptPair: function(invitaitonMsg, keyMsg, valueMsg, defaultValue, done){
            var pairPrompts = [
                {
                    name: 'confirm',
                    type: 'confirm',
                    message: invitaitonMsg||' ',
                    when: function(){
                    	return !!invitaitonMsg;
                    }
                },
                {
                    name: 'key',
                    message: keyMsg,
                    when: function (answers) {
                    	return !invitaitonMsg || answers.confirm;
                    }
                },
                {
                    name: 'value',
                    message: valueMsg,
                    when: function (answers) {
                    	return (!invitaitonMsg || answers.confirm) && answers.key;
                    },
                    default: function(answers){
                    	var value = '';
                    	switch(defaultValue){
                    		case 'dasherize':
                    			value = utils.dasherize(answers.key);
                    			break;
                    		case 'slugify':
                    			value = utils.slugify(answers.key);
                    			break;
                    		case 'classify':
                    			value = utils.classify(answers.key);
                    			break;
                    		case 'camelize':
                    			value = utils.camelize(answers.key);
                    			break;
                    		case 'underscored':
                    			value = utils.underscored(answers.key);
                    			break;
                    		case 'humanize':
                    			value = utils.humanize(answers.key);
                    			break;
                    	}
                        return value;
                    },
                },
            ];

            g.prompt(pairPrompts, done);
        },

        promptPairs: function(invitaitonMsg, keyMsg, valueMsg, defaultValue, done){
            var pairs = {};
            var pairReady = function(pair){
                if(pair.key){
                    pairs[pair.key] = pair.value;
                    utils.promptPair(false, keyMsg, valueMsg, defaultValue, pairReady);
                }else{
                    done(pairs);
                }
            };

            utils.promptPair(invitaitonMsg, keyMsg, valueMsg, defaultValue, pairReady);
        },

	};

	return utils;
};

