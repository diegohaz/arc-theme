# arc-theme [![Build Status](https://travis-ci.org/diegohaz/arc-theme.svg?branch=master)](https://travis-ci.org/diegohaz/arc-theme) [![Coverage Status](https://coveralls.io/repos/github/diegohaz/arc-theme/badge.svg?branch=master)](https://coveralls.io/github/diegohaz/arc-theme?branch=master)

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

get('colors') // outputs { primary: [...], secondary: [...] }
get('colors.primary') // outputs ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb']
get('reverseColors.primary') // outputs ['#c2e2fb', '#71bcf7', '#2196f3', '#1976d2']
get('colors.primary[0]') // outputs '#1976d2'
get('fonts') // outputs { primary: '...', quote: '...' }
get('fonts.primary') // outputs 'Helvetica Neue, Helvetica, Roboto, sans-serif'

getColor('primary') // outputs theme.colors.primary
getColor('primary[0]', true) // outputs theme.reverseColors.primary[0]
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

get('colors', myTheme) // outputs { grayscale: [...] }
get('colors.primary', myTheme) // outputs arc-theme primary color
get('fonts.primary', myTheme) // outputs arc-theme primary font

getColor('grayscale', false, myTheme) // outputs myTheme.colors.grayscale
getColor('grayscale[0]', true, myTheme) // outputs myTheme.reverseColors.grayscale[0]
getColor('primary[0]', true, myTheme) // outputs theme.reverseColors.primary[0]
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


## License

MIT © [Diego Haz](https://github.com/diegohaz)
