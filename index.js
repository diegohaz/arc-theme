'use strict';

const get = require('lodash/get');

const theme = {};

theme.colors = {
	primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
	secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
	danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
	alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
	success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
	grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#ffffff']
};

theme.reverseColors = {};

Object.keys(theme.colors).forEach(key => {
	theme.reverseColors[key] = [].concat(theme.colors[key]).reverse();
});

theme.fonts = {
	primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
	pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
	quote: 'Georgia, serif'
};

theme.get = (path, anotherTheme) => get(anotherTheme, path, get(theme, path));

theme.getColor = (path, anotherTheme, reverse) => {
	const colorsPath = reverse ? 'reverseColors' : 'colors';
	const fullPath = Array.isArray(path) ? [colorsPath].concat(path) : colorsPath + '.' + path;
	return theme.get(fullPath, anotherTheme);
};

module.exports = theme;
