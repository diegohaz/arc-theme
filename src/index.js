import _get from 'lodash/get'
import at from 'lodash/at'
import values from 'lodash/values'
import difference from 'lodash/difference'

const theme = {}

theme.colors = {
  primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
  secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
  danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
  alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
  success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
  grayscale: ['#212121', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#ffffff']
}

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif'
}

export const ifProps = (needle, pass, fail) => (props = {}) => {
  let result
  if (Array.isArray(needle)) {
    result = !at(props, needle).filter(value => !value).length
  } else if (typeof needle === 'object') {
    const needleKeys = Object.keys(needle)
    const needleValues = values(needle)
    result = !difference(at(props, needleKeys), needleValues).length
  } else {
    result = _get(props, needle)
  }
  return result ? pass : fail
}

export const get = (path, anotherTheme) => _get(anotherTheme, path, _get(theme, path))

export const getColor = (path, reverse, anotherTheme) => {
  const colorsPath = reverse ? 'reverseColors' : 'colors'
  const fullPath = Array.isArray(path) ? [ colorsPath, ...path ] : `${colorsPath}.${path}`
  return get(fullPath, anotherTheme)
}

export const reverse = colors => {
  const reverseColors = {}
  Object.keys(colors).forEach(key => {
    reverseColors[key] = [ ...colors[key] ].reverse()
  })
  return reverseColors
}

export const font = path => (props = {}) => get(['fonts', path], props.theme)

export const color = (...args) => (props = {}) => {
  const exceptions = args.find(arg => typeof arg === 'object') || {}
  const path = args.find(arg => typeof arg === 'string') || props.color
  let index = args.find(arg => typeof arg === 'number')

  if (typeof index === 'undefined') {
    throw new Error('[color] You must pass index')
  }
  if (typeof path === 'undefined') {
    throw new Error('[color] You must pass color path')
  }

  if (Object.keys(exceptions).indexOf(path) >= 0) {
    index = exceptions[path]
  }

  return getColor([path, index], props.reverse, props.theme)
}

export const reverseColor = (...args) => (props = {}) =>
  color(...args)({ ...props, reverse: !props.reverse })

theme.reverseColors = reverse(theme.colors)

export default theme
