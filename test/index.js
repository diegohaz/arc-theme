import theme, { get, getColor, reverse, key, font, color, reverseColor, ifProps } from '../src'

describe('theme', () => {
  it('has primary colors', () => {
    expect(theme.colors.primary).toEqual(['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'])
  })

  it('has primary reverseColors', () => {
    expect(theme.reverseColors.primary).toEqual(['#c2e2fb', '#71bcf7', '#2196f3', '#1976d2'])
  })
})

describe('get', () => {
  const theme2 = {
    colors: {
      primary: ['a', 'b', 'c']
    }
  }

  it('returns path value', () => {
    expect(get('colors.primary')).toBe(theme.colors.primary)
    expect(get('colors.primary', theme2)).toBe(theme2.colors.primary)
    expect(get('colors.primary[1]', theme2)).toBe('b')
    expect(get('colors.primary[3]', theme2)).toBe(theme.colors.primary[3])
    expect(get('colors.grayscale', theme2)).toBe(theme.colors.grayscale)
    expect(get('fonts.primary', theme2)).toBe(theme.fonts.primary)
  })
})

describe('getColor', () => {
  const theme2 = {
    colors: {
      primary: ['a', 'b', 'c']
    },
    reverseColors: {
      primary: ['c', 'b', 'a']
    }
  }

  it('returns color', () => {
    expect(getColor('primary')).toBe(theme.colors.primary)
    expect(getColor('primary', true)).toBe(theme.reverseColors.primary)
  })

  it('returns color from anotherTheme when passed in', () => {
    expect(getColor('primary', false, theme2)).toBe(theme2.colors.primary)
    expect(getColor('primary', true, theme2)).toBe(theme2.reverseColors.primary)
  })

  it('returns value from color path', () => {
    expect(getColor('primary[0]')).toBe(theme.colors.primary[0])
    expect(getColor('primary[0]', true)).toBe(theme.reverseColors.primary[0])
    expect(getColor('primary[0]', true, theme2)).toBe('c')
    expect(getColor(['primary', 0], true, theme2)).toBe('c')
  })
})

describe('reverse', () => {
  const theme2 = {
    colors: {
      primary: ['a', 'b', 'c']
    }
  }

  it('returns reverse colors', () => {
    expect(reverse(theme2.colors)).toEqual({ primary: ['c', 'b', 'a'] })
  })
})

describe('key', () => {
  const theme2 = {
    foo: 'bar'
  }

  it('returns value from theme when no anotherTheme was passed in', () => {
    expect(key('colors')()).toBe(theme.colors)
  })

  it('returns value from anotherTheme when passed in', () => {
    expect(key('foo')({ theme: theme2 })).toBe(theme2.foo)
  })
})

describe('font', () => {
  const theme2 = {
    fonts: {
      foo: 'bar',
      pre: 'test'
    }
  }

  it('returns default font when no anotherTheme was passed in', () => {
    expect(font('primary')()).toBe(theme.fonts.primary)
  })

  it('returns default font when it does not exist on anotherTheme', () => {
    expect(font('primary')({ theme: theme2 })).toBe(theme.fonts.primary)
    expect(font('quote')({ theme: theme2 })).toBe(theme.fonts.quote)
  })

  it('returns anotherTheme font when it exists', () => {
    expect(font('foo')({ theme: theme2 })).toBe(theme2.fonts.foo)
    expect(font('pre')({ theme: theme2 })).toBe(theme2.fonts.pre)
  })
})

describe('color', () => {
  const theme2 = {
    colors: {
      foo: ['bar', 'baz']
    },
    reverseColors: {
      foo: ['baz', 'bar']
    }
  }

  it('throws when no index was passed in', () => {
    expect(() => color()({ theme: theme2, color: 'primary' })).toThrow()
  })

  it('throws when no color was passed in', () => {
    expect(() => color(0)({ theme: theme2 })).toThrow()
  })

  it('returns color at index when color was passed in with props', () => {
    expect(color(0)({ theme: theme2, color: 'primary' })).toBe(theme.colors.primary[0])
    expect(color(0)({ theme: theme2, color: 'foo' })).toBe(theme2.colors.foo[0])
    expect(color(0)({ theme: theme2, color: 'danger', reverse: true }))
      .toBe(theme.reverseColors.danger[0])
  })

  it('returns color at index when color was passed in with args ignoring props', () => {
    expect(color('danger', 1)()).toBe(theme.colors.danger[1])
    expect(color('danger', 1)({ theme: theme2 })).toBe(theme.colors.danger[1])
    expect(color('danger', 1)({ theme: theme2, color: 'foo' })).toBe(theme.colors.danger[1])
    expect(color('danger', 1)({ theme: theme2, reverse: true })).toBe(theme.reverseColors.danger[1])
  })

  it('returns color at proper index when exception was passed in', () => {
    expect(color(1, { danger: 0 })({ theme: theme2, color: 'foo' })).toBe(theme2.colors.foo[1])
    expect(color(1, { danger: 0 })({ theme: theme2, color: 'danger' })).toBe(theme.colors.danger[0])
  })
})

describe('reverseColor', () => {
  const fn = reverseColor
  const theme2 = {
    colors: {
      foo: ['bar', 'baz']
    },
    reverseColors: {
      foo: ['baz', 'bar']
    }
  }

  it('returns reverse color at index when color was passed in with props', () => {
    expect(fn(0)({ theme: theme2, color: 'primary' })).toBe(theme.reverseColors.primary[0])
    expect(fn(0)({ theme: theme2, color: 'foo' })).toBe(theme2.reverseColors.foo[0])
    expect(fn(0)({ theme: theme2, color: 'danger', reverse: true })).toBe(theme.colors.danger[0])
  })

  it('returns reverse color at index when color was passed in with args ignoring props', () => {
    expect(fn('danger', 1)()).toBe(theme.reverseColors.danger[1])
    expect(fn('danger', 1)({ theme: theme2 })).toBe(theme.reverseColors.danger[1])
    expect(fn('danger', 1)({ theme: theme2, color: 'foo' })).toBe(theme.reverseColors.danger[1])
    expect(fn('danger', 1)({ theme: theme2, reverse: true })).toBe(theme.colors.danger[1])
  })

  it('returns reverse color at proper index when exception was passed in', () => {
    expect(fn(1, { danger: 0 })({ theme: theme2, color: 'foo' })).toBe(theme2.reverseColors.foo[1])
    expect(fn(1, { danger: 0 })({ theme: theme2, color: 'danger' }))
      .toBe(theme.reverseColors.danger[0])
  })
})

describe('ifProps', () => {
  it('handles string needle', () => {
    expect(ifProps('foo', 'yes', 'no')()).toBe('no')
    expect(ifProps('foo', 'yes', 'no')({ foo: true })).toBe('yes')
    expect(ifProps('foo', 'yes', 'no')({ foo: false })).toBe('no')
  })

  it('handles deep string needle', () => {
    expect(ifProps('foo.bar', 'yes', 'no')({ foo: { bar: true } })).toBe('yes')
    expect(ifProps('foo.bar', 'yes', 'no')({ foo: { bar: false } })).toBe('no')
  })

  it('handles array needle', () => {
    expect(ifProps(['foo'], 'yes', 'no')({ bar: false, foo: true })).toBe('yes')
    expect(ifProps(['foo', 'bar'], 'yes', 'no')({ bar: true, foo: true })).toBe('yes')
    expect(ifProps(['foo', 'bar'], 'yes', 'no')({ foo: true, bar: false })).toBe('no')
  })

  it('handles deep array needle', () => {
    expect(ifProps(['foo.bar', 'baz'], 'yes', 'no')({ baz: true, foo: { bar: true } })).toBe('yes')
    expect(ifProps(['foo.bar', 'baz'], 'yes', 'no')({ foo: { bar: true }, baz: false })).toBe('no')
    expect(ifProps(['foo.bar', 'baz'], 'yes', 'no')({ foo: { bar: false }, baz: true })).toBe('no')
  })

  it('handles object needle', () => {
    expect(ifProps({ foo: 'ok' }, 'yes', 'no')({ foo: 'ok' })).toBe('yes')
    expect(ifProps({ foo: 'ok' }, 'yes', 'no')({ foo: 'not ok' })).toBe('no')
    expect(ifProps({ foo: 'ok', bar: 'ok' }, 'yes', 'no')({ bar: 'ok', foo: 'ok' })).toBe('yes')
    expect(ifProps({ foo: 'ok', bar: 'ok' }, 'yes', 'no')({ foo: 'not ok', bar: 'ok' })).toBe('no')
  })

  it('handles deep object needle', () => {
    expect(ifProps({ 'foo.bar': 'ok' }, 'yes', 'no')({ foo: { bar: 'ok' } })).toBe('yes')
    expect(ifProps({ 'foo.bar': 'ok' }, 'yes', 'no')({ foo: { bar: 'no' } })).toBe('no')
  })
})
