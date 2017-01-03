import test from 'ava';
import theme, {get, getColor, reverse} from '.';

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

	t.is(get('colors.primary'), theme.colors.primary);
	t.is(get('colors.primary', anotherTheme), anotherTheme.colors.primary);
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

	t.is(getColor('primary'), theme.colors.primary);
	t.is(getColor('primary', true), theme.reverseColors.primary);
	t.is(getColor('primary', false, anotherTheme), anotherTheme.colors.primary);
	t.is(getColor('primary', true, anotherTheme), anotherTheme.reverseColors.primary);
	t.is(getColor('primary[0]', true, anotherTheme), 'c');
	t.is(getColor(['primary', 0], true, anotherTheme), 'c');
});

test('reverse', t => {
	const anotherTheme = {
		colors: {
			primary: ['a', 'b', 'c']
		}
	};

	t.deepEqual(reverse(anotherTheme.colors), {primary: ['c', 'b', 'a']});
});
