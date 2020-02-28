import { DEGREES_TO_RADIANS } from './constants'
import sexagesimal from './sexagesimal'

function getCorrectionInLongitude (Longitude, Latitude, JD) {
  const T = (JD - 2451545) / 36525
  let Ldash = (Longitude - 1.397 * T - 0.00031 * T * T)

  // Convert to radians
  Ldash = Ldash * DEGREES_TO_RADIANS
  Latitude = Latitude * DEGREES_TO_RADIANS

  const value = -0.09033 + 0.03916 * (Math.cos(Ldash) + Math.sin(Ldash)) * Math.tan(Latitude)
  return sexagesimal.getDecimal(0, 0, value)
}

function getCorrectionInLatitude (Longitude, JD) {
  const T = (JD - 2451545) / 36525
  let Ldash = Longitude - 1.397 * T - 0.00031 * T * T

  // Convert to radians
  Ldash = Ldash * DEGREES_TO_RADIANS

  const value = 0.03916 * (Math.cos(Ldash) - Math.sin(Ldash))
  return sexagesimal.getDecimal(0, 0, value)
}

export default {
  getCorrectionInLongitude,
  getCorrectionInLatitude
}
