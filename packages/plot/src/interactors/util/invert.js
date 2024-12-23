export function invert(value, scale, pixelSize = 1) {
   if (scale.type == 'band') {
      // Limitations - does not take into account pixelSize and assumes values are ordered in ascending values
      return Math.round(( (value - scale.range[0]) / (scale.range[1] - scale.range[0]) ) * (scale.domain.slice(-1) - scale.domain[0]));
   } else {
      return scale.invert(pixelSize * Math.floor(value / pixelSize));
   }
}
