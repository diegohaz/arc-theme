import test from 'ava';
import theme, {get, getColor} from '.';

test('theme', t => {
	t.deepEqual(theme.colors.primary, ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb']);
	t.deepEqual(theme.reverseColors.primary, ['#c2e2fb', '#71bcf7', '#2196f3', '#1976d2']);
});

test('get', t => {
	const anotherTheme = {
		colors: {
			primary: ['a', 'b', 'c']
		}
	};

	t.deepEqual(get('colors.primary', anotherTheme), ['a', 'b', 'c']);
	t.is(get('colors.primary[1]', anotherTheme), 'b');
	t.is(get('colors.primary[3]', anotherTheme), theme.colors.primary[3]);
	t.is(get('colors.grayscale', anotherTheme), theme.colors.grayscale);
	t.is(get('fonts.primary', anotherTheme), theme.fonts.primary);
});

test('getColor', t => {
	const anotherTheme = {
		colors: {
			primary: ['a', 'b', 'c']
		},
		reverseColors: {
			primary: ['c', 'b', 'a']
		}
	};

	t.deepEqual(getColor('primary', anotherTheme), ['a', 'b', 'c']);
	t.deepEqual(getColor('primary', anotherTheme, true), ['c', 'b', 'a']);
	t.is(getColor('primary[0]', anotherTheme, true), 'c');
	t.is(getColor(['primary', 0], anotherTheme, true), 'c');
});
