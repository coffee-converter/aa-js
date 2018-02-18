'use strict'

// https://gist.github.com/wteuber/6241786
Math.fmod = function (a, b) {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8))
}

const g_MoonCoefficients1 =
    [
        [0, 0, 1, 0],
        [2, 0, -1, 0],
        [2, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 2],
        [2, 0, -2, 0],
        [2, -1, -1, 0],
        [2, 0, 1, 0],
        [2, -1, 0, 0],
        [0, 1, -1, 0],
        [1, 0, 0, 0],
        [0, 1, 1, 0],
        [2, 0, 0, -2],
        [0, 0, 1, 2],
        [0, 0, 1, -2],
        [4, 0, -1, 0],
        [0, 0, 3, 0],
        [4, 0, -2, 0],
        [2, 1, -1, 0],
        [2, 1, 0, 0],
        [1, 0, -1, 0],
        [1, 1, 0, 0],
        [2, -1, 1, 0],
        [2, 0, 2, 0],
        [4, 0, 0, 0],
        [2, 0, -3, 0],
        [0, 1, -2, 0],
        [2, 0, -1, 2],
        [2, -1, -2, 0],
        [1, 0, 1, 0],
        [2, -2, 0, 0],
        [0, 1, 2, 0],
        [0, 2, 0, 0],
        [2, -2, -1, 0],
        [2, 0, 1, -2],
        [2, 0, 0, 2],
        [4, -1, -1, 0],
        [0, 0, 2, 2],
        [3, 0, -1, 0],
        [2, 1, 1, 0],
        [4, -1, -2, 0],
        [0, 2, -1, 0],
        [2, 2, -1, 0],
        [2, 1, -2, 0],
        [2, -1, 0, -2],
        [4, 0, 1, 0],
        [0, 0, 4, 0],
        [4, -1, 0, 0],
        [1, 0, -2, 0],
        [2, 1, 0, -2],
        [0, 0, 2, -2],
        [1, 1, 1, 0],
        [3, 0, -2, 0],
        [4, 0, -3, 0],
        [2, -1, 2, 0],
        [0, 2, 1, 0],
        [1, 1, -1, 0],
        [2, 0, 3, 0],
        [2, 0, -1, -2]
    ].map((a) => {
        return {D: a[0], M: a[1], Mdash: a[2], F: a[4]}
    })

const g_MoonCoefficients2 =
    [
        [6288774, -20905355],
        [1274027, -3699111],
        [658314, -2955968],
        [213618, -569925],
        [-185116, 48888],
        [-114332, -3149],
        [58793, 246158],
        [57066, -152138],
        [53322, -170733],
        [45758, -204586],
        [-40923, -129620],
        [-34720, 108743],
        [-30383, 104755],
        [15327, 10321],
        [-12528, 0],
        [10980, 79661],
        [10675, -34782],
        [10034, -23210],
        [8548, -21636],
        [-7888, 24208],
        [-6766, 30824],
        [-5163, -8379],
        [4987, -16675],
        [4036, -12831],
        [3994, -10445],
        [3861, -11650],
        [3665, 14403],
        [-2689, -7003],
        [-2602, 0],
        [2390, 10056],
        [-2348, 6322],
        [2236, -9884],
        [-2120, 5751],
        [-2069, 0],
        [2048, -4950],
        [-1773, 4130],
        [-1595, 0],
        [1215, -3958],
        [-1110, 0],
        [-892, 3258],
        [-810, 2616],
        [759, -1897],
        [-713, -2117],
        [-700, 2354],
        [691, 0],
        [596, 0],
        [549, -1423],
        [537, -1117],
        [520, -1571],
        [-487, -1739],
        [-399, 0],
        [-381, -4421],
        [351, 0],
        [-340, 0],
        [330, 0],
        [327, 0],
        [-323, 1165],
        [299, 0],
        [294, 0],
        [0, 8752]
    ].map((a) => {
        return {A: a[0], B: a[1]}
    })


const g_MoonCoefficients3 =
    [
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1, -1],
        [2, 0, 0, -1],
        [2, 0, -1, 1],
        [2, 0, -1, -1],
        [2, 0, 0, 1],
        [0, 0, 2, 1],
        [2, 0, 1, -1],
        [0, 0, 2, -1],
        [2, -1, 0, -1],
        [2, 0, -2, -1],
        [2, 0, 1, 1],
        [2, 1, 0, -1],
        [2, -1, -1, 1],
        [2, -1, 0, 1],
        [2, -1, -1, -1],
        [0, 1, -1, -1],
        [4, 0, -1, -1],
        [0, 1, 0, 1],
        [0, 0, 0, 3],
        [0, 1, -1, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 1],
        [0, 1, 1, -1],
        [0, 1, 0, -1],
        [1, 0, 0, -1],
        [0, 0, 3, 1],
        [4, 0, 0, -1],
        [4, 0, -1, 1],
        [0, 0, 1, -3],
        [4, 0, -2, 1],
        [2, 0, 0, -3],
        [2, 0, 2, -1],
        [2, -1, 1, -1],
        [2, 0, -2, 1],
        [0, 0, 3, -1],
        [2, 0, 2, 1],
        [2, 0, -3, -1],
        [2, 1, -1, 1],
        [2, 1, 0, 1],
        [4, 0, 0, 1],
        [2, -1, 1, 1],
        [2, -2, 0, -1],
        [0, 0, 1, 3],
        [2, 1, 1, -1],
        [1, 1, 0, -1],
        [1, 1, 0, 1],
        [0, 1, -2, -1],
        [2, 1, -1, -1],
        [1, 0, 1, 1],
        [2, -1, -2, -1],
        [0, 1, 2, 1],
        [4, 0, -2, -1],
        [4, -1, -1, -1],
        [1, 0, 1, -1],
        [4, 0, 1, -1],
        [1, 0, -1, -1],
        [4, -1, 0, -1],
        [2, -2, 0, 1]
    ].map((a) => {
        return {D: a[0], M: a[1], Mdash: a[2], F: a[4]}
    })


const g_MoonCoefficients4 =
    [
        5128122,
        280602,
        277693,
        173237,
        55413,
        46271,
        32573,
        17198,
        9266,
        8822,
        8216,
        4324,
        4200,
        -3359,
        2463,
        2211,
        2065,
        -1870,
        1828,
        -1794,
        -1749,
        -1565,
        -1491,
        -1475,
        -1410,
        -1344,
        -1335,
        1107,
        1021,
        833,
        777,
        671,
        607,
        596,
        491,
        -451,
        439,
        422,
        421,
        -366,
        -351,
        331,
        315,
        302,
        -283,
        -229,
        223,
        223,
        -220,
        -220,
        -185,
        181,
        -177,
        176,
        166,
        -164,
        132,
        -119,
        115,
        107
    ]

function getMeanLongitude(JD) {
    const T = (JD - 2451545) / 36525
    const Tsquared = T * T
    const Tcubed = Tsquared * T
    const T4 = Tcubed * T
    return Math.fmod(218.3164477 + 481267.88123421 * T - 0.0015786 * Tsquared + Tcubed / 538841 - T4 / 65194000, 360)
}

function getMeanElongation(JD) {
    const T = (JD - 2451545) / 36525
    const Tsquared = T * T
    const Tcubed = Tsquared * T
    const T4 = Tcubed * T
    return Math.fmod(297.8501921 + 445267.1114034 * T - 0.0018819 * Tsquared + Tcubed / 545868 - T4 / 113065000, 360)
}

function getMeanAnomaly(JD) {
    const T = (JD - 2451545) / 36525
    const Tsquared = T * T
    const Tcubed = Tsquared * T
    const T4 = Tcubed * T
    return Math.fmod(134.9633964 + 477198.8675055 * T + 0.0087414 * Tsquared + Tcubed / 69699 - T4 / 14712000, 360)
}

function getArgumentOfLatitude(JD) {
    const T = (JD - 2451545) / 36525
    const Tsquared = T * T
    const Tcubed = Tsquared * T
    const T4 = Tcubed * T
    return Math.fmod(93.2720950 + 483202.0175233 * T - 0.0036539 * Tsquared - Tcubed / 3526000 + T4 / 863310000, 360)
}

class Moon {
    constructor(jd) {
        this.julianDay = jd
    }

    meanLongitude() {
        return getMeanLongitude(this.julianDay)
    }

    meanElongation() {
        return getMeanElongation(this.julianDay)
    }

    meanAnomaly() {
        return getMeanAnomaly(this.julianDay)
    }

    argumentOfLatitude() {
        return getArgumentOfLatitude(this.julianDay)
    }

    equatorialCoordinates() {
        return 'equatorialCoordinates...'
    }
}

module.exports = {
    getMeanLongitude,
    getMeanElongation,
    getMeanAnomaly,
    getArgumentOfLatitude,
    Moon
}
