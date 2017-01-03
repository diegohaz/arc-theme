'use strict';

const get = require('lodash/get');
const at = require('lodash/at');
const values = require('lodash/values');
const difference = require('lodash/difference');
const assign = require('lodash/assign');

const theme = {};

theme.colors = {
	primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
	secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
	danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
	alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
	success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
	grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#ffffff']
};

theme.fonts = {
	primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
	pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
	quote: 'Georgia, serif'
};

theme.ifProps = (needle, pass, fail) => props => {
	let result;
	if (Array.isArray(needle)) {
		result = !at(props, needle).filter(value => !value).length;
	} else if (typeof needle === 'object') {
		const needleKeys = Object.keys(needle);
		const needleValues = values(needle);
		result = !difference(at(props, needleKeys), needleValues).length;
	} else {
		result = get(props, needle);
	}
	return result ? pass : fail;
};

theme.get = (path, anotherTheme) => get(anotherTheme, path, get(theme, path));

theme.getColor = (path, reverse, anotherTheme) => {
	const colorsPath = reverse ? 'reverseColors' : 'colors';
	const fullPath = Array.isArray(path) ? [colorsPath].concat(path) : colorsPath + '.' + path;
	return theme.get(fullPath, anotherTheme);
};

theme.reverse = colors => {
	const reverseColors = {};
	Object.keys(colors).forEach(key => {
		reverseColors[key] = [].concat(colors[key]).reverse();
	});
	return reverseColors;
};

theme.reverseColors = theme.reverse(theme.colors);

theme.font = path => props => theme.get(['fonts', path], (props || {}).theme);

theme.color = (i, p, e) => props => {
	props = props || {};
	const args = [i, p, e];
	const exceptions = args.find(arg => typeof arg === 'object') || {};
	const path = args.find(arg => typeof arg === 'string') || props.color;
	let index = args.find(arg => typeof arg === 'number');

	if (typeof index === 'undefined') {
		throw new Error('[color] You must pass index');
	}
	if (typeof path === 'undefined') {
		throw new Error('[color] You must pass color path');
	}

	if (Object.keys(exceptions).indexOf(path) >= 0) {
		index = exceptions[path];
	}

	return theme.getColor([path, index], props.reverse, props.theme);
};

theme.reverseColor = (i, p, e) => props =>
	theme.color(i, p, e)(assign({}, props, {reverse: !(props || {}).reverse}));

module.exports = theme;
