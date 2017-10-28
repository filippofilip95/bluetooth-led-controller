const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const separateRgbWithComma = rgbObject =>
  `${rgbObject.r},${rgbObject.g},${rgbObject.b}X`

const convertHexToRgbString = hex => separateRgbWithComma(hexToRgb(hex))

export { hexToRgb, separateRgbWithComma, convertHexToRgbString }
