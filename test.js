import test from 'ava';
import theme, {get, getColor, reverse, font, color, reverseColor} from '.';

test('theme', t => {
	t.deepEqual(theme.colors.primary, ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb']);
	t.deepEqual(theme.reverseColors.primary, ['#c2e2fb', '#71bcf7', '#2196f3', '#1976d2']);
});

test('get', t => {
	const theme2 = {
		colors: {
			primary: ['a', 'b', 'c']
		}
	};

	t.is(get('colors.primary'), theme.colors.primary);
	t.is(get('colors.primary', theme2), theme2.colors.primary);
	t.is(get('colors.primary[1]', theme2), 'b');
	t.is(get('colors.primary[3]', theme2), theme.colors.primary[3]);
	t.is(get('colors.grayscale', theme2), theme.colors.grayscale);
	t.is(get('fonts.primary', theme2), theme.fonts.primary);
});

test('getColor', t => {
	const theme2 = {
		colors: {
			primary: ['a', 'b', 'c']
		},
		reverseColors: {
			primary: ['c', 'b', 'a']
		}
	};

	t.is(getColor('primary'), theme.colors.primary);
	t.is(getColor('primary', true), theme.reverseColors.primary);
	t.is(getColor('primary', false, theme2), theme2.colors.primary);
	t.is(getColor('primary', true, theme2), theme2.reverseColors.primary);
	t.is(getColor('primary[0]', true, theme2), 'c');
	t.is(getColor(['primary', 0], true, theme2), 'c');
});

test('reverse', t => {
	const theme2 = {
		colors: {
			primary: ['a', 'b', 'c']
		}
	};

	t.deepEqual(reverse(theme2.colors), {primary: ['c', 'b', 'a']});
});

test('font', t => {
	const theme2 = {
		fonts: {
			foo: 'bar'
		}
	};

	t.is(font('primary')(), theme.fonts.primary);
	t.is(font('primary')({theme: theme2}), theme.fonts.primary);
	t.is(font('quote')({theme: theme2}), theme.fonts.quote);
	t.is(font('foo')({theme: theme2}), theme2.fonts.foo);
});

test('color', t => {
	const theme2 = {
		colors: {
			foo: ['bar', 'baz']
		},
		reverseColors: {
			foo: ['baz', 'bar']
		}
	};

	t.throws(() => color(0)({theme: theme2}));
	t.throws(() => color()({theme: theme2, color: 'primary'}));
	t.is(color(0)({theme: theme2, color: 'primary'}), theme.colors.primary[0]);
	t.is(color(0)({theme: theme2, color: 'danger', reverse: true}), theme.reverseColors.danger[0]);
	t.is(color(0)({theme: theme2, color: 'foo'}), theme2.colors.foo[0]);
	t.is(color(1, {danger: 0})({theme: theme2, color: 'foo'}), theme2.colors.foo[1]);
	t.is(color(1, {danger: 0})({theme: theme2, color: 'danger'}), theme.colors.danger[0]);
	t.is(color(1, {danger: 0})({theme: theme2, color: 'danger'}), theme.colors.danger[0]);
	t.is(color('danger', 1)(), theme.colors.danger[1]);
	t.is(color('danger', 1)({theme: theme2}), theme.colors.danger[1]);
	t.is(color('danger', 1)({theme: theme2, color: 'foo'}), theme.colors.danger[1]);
	t.is(color('danger', 1)({theme: theme2, reverse: true}), theme.reverseColors.danger[1]);
});

test('reverseColor', t => {
	const fn = reverseColor;
	const theme2 = {
		colors: {
			foo: ['bar', 'baz']
		},
		reverseColors: {
			foo: ['baz', 'bar']
		}
	};

	t.is(fn(0)({theme: theme2, color: 'primary'}), theme.reverseColors.primary[0]);
	t.is(fn(0)({theme: theme2, color: 'danger', reverse: true}), theme.colors.danger[0]);
	t.is(fn(0)({theme: theme2, color: 'foo'}), theme2.reverseColors.foo[0]);
	t.is(fn(1, {danger: 0})({theme: theme2, color: 'foo'}), theme2.reverseColors.foo[1]);
	t.is(fn(1, {danger: 0})({theme: theme2, color: 'danger'}), theme.reverseColors.danger[0]);
	t.is(fn(1, {danger: 0})({theme: theme2, color: 'danger'}), theme.reverseColors.danger[0]);
	t.is(fn('danger', 1)(), theme.reverseColors.danger[1]);
	t.is(fn('danger', 1)({theme: theme2}), theme.reverseColors.danger[1]);
	t.is(fn('danger', 1)({theme: theme2, color: 'foo'}), theme.reverseColors.danger[1]);
	t.is(fn('danger', 1)({theme: theme2, reverse: true}), theme.colors.danger[1]);
});
