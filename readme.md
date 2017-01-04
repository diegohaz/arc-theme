# arc-theme 
[![NPM version](https://img.shields.io/npm/v/arc-theme.svg?style=flat-square)](https://npmjs.org/package/arc-theme)
[![Build Status](https://img.shields.io/travis/diegohaz/arc-theme/master.svg?style=flat-square)](https://travis-ci.org/diegohaz/arc-theme) [![Coverage Status](https://img.shields.io/codecov/c/github/diegohaz/arc-theme/master.svg?style=flat-square)](https://codecov.io/gh/diegohaz/arc-theme/branch/master)

> ARc theming utilities and resources


## Install

```
$ npm install --save arc-theme
```


## Usage

### Basic

`get` and `getColor` use [`lodash's get`](https://lodash.com/docs/4.17.4#get) to reach the theme path.

```js
import theme, { get, getColor } from 'arc-theme'

console.log(theme) // outputs the entire theme object

get('colors') // { primary: [...], secondary: [...] }
get('colors.primary') // ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb']
get('reverseColors.primary') // ['#c2e2fb', '#71bcf7', '#2196f3', '#1976d2']
get('colors.primary[0]') // '#1976d2'
get('fonts') // { primary: '...', quote: '...' }
get('fonts.primary') // 'Helvetica Neue, Helvetica, Roboto, sans-serif'

getColor('primary') // theme.colors.primary
getColor('primary[0]', true) // theme.reverseColors.primary[0]
```

### Overriding theme

You can also provide your theme as the last argument.

```js
import { get, getColor, reverse } from 'arc-theme'

const myTheme = {}
myTheme.colors = {
	grayscale: ['#222', '#555', '#888', '#bbb', '#fff']
}
myTheme.reverseColors = reverse(myTheme.colors)

get('colors', myTheme) // { grayscale: [...] }
get('colors.primary', myTheme) // arc-theme primary color
get('fonts.primary', myTheme) // arc-theme primary font

getColor('grayscale', false, myTheme) // myTheme.colors.grayscale
getColor('grayscale[0]', true, myTheme) // myTheme.reverseColors.grayscale[0]
getColor('primary[0]', true, myTheme) // theme.reverseColors.primary[0]
```

### Utilities for [`styled-components`](https://github.com/styled-components/styled-components)

```jsx
import styled from 'components'
import { font, color, reverseColor } from 'arc-theme'

const Div = styled.div`
	font-family: ${font('primary')};
	color: ${color(0)};
	background-color: ${reverseColor('grayscale', 0)}
`

// color = theme.colors.primary[0]
// background-color = theme.reverseColors.grayscale[0]
<Div color="primary" />

// color = theme.reverseColors.primary[0]
// background-color = theme.colors.primary[0]
<Div color="primary" reverse />
```

```jsx
import styled from 'components'
import { font, color, reverseColor } from 'arc-theme'

const Div = styled.div`
	font-family: ${font('primary')};
	color: ${color({ grayscale: 0 }, 1)};
`

// color = theme.colors.primary[1]
<Div color="primary" />

// Because we defined the exception { grayscale: 0 }
// color = theme.colors.grayscale[0]
<Div color="grayscale" />
```

## API

### get(path: String|Array, [anotherTheme: Object])

Returns the value from `anotherTheme[path]` or `theme[path]`

### getColor(path: String|Array, [reverse: Boolean], [anotherTheme: Object])

Returns the value from `anotherTheme.colors[path]` or `theme.colors[path]`. `colors` will be `reverseColors` if `reverse` is `true`.

### reverse(colors: Object)

Returns a new object with reverse colors.

`colors` must be an object with the following structure:
```js
const colors = {
	foo: ['bar', 'baz'],
	a: ['b', 'c']
}

reverse(colors) // { foo: ['baz', 'bar'], a: ['c', 'b'] }
```

### font(path: String)(props: Object)

Returns the font in `props.theme.fonts[path]` or `theme.fonts[path]`.

This is the same as `get(['fonts', path], props.theme)`.

### color(index: Number, [path: String], [exceptions: Object])(props: Object)

Returns the color in `props.theme.colors[path][index]` or `theme.colors[path][index]`. `colors` will be `reverseColors` if `props.reverse` is `true`.

This is the same as `getColor([path || props.path][index], props.reverse, props.theme)`.

Arguments could be passed in any order.

### reverseColor(index: Number, [path: String], [exceptions: Object])(props: Object)

Returns the color in `props.theme.reverseColors[path][index]` or `theme.reverseColors[path][index]`. `reverseColors` will be `colors` if `props.reverse` is `true`.

This is the same as `getColor([path || props.path][index], !props.reverse, props.theme)`.

Arguments could be passed in any order.

### ifProps(needle: Array|String|Object, pass: Any, fail: Any)(props: Object)

Returns `pass` or `fail` according to `needle` result. `needle` can be some of these:
```js
'foo' // props.foo == true
['foo', 'bar'] // props.foo == true && props.bar == true
'foo.bar' // props.foo.bar == true
['foo.bar', 'baz'] // props.foo.bar == true && props.baz == true
{ foo: 'bar' } // props.foo === 'bar'
{ 'foo.bar': 'baz' } // props.foo.bar === 'baz'
{ foo: 'bar', baz: true } // props.foo === 'bar' && props.baz === true
```

## License

MIT © [Diego Haz](https://github.com/diegohaz)
