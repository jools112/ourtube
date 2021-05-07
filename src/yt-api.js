//TODO: Backup key!

const lookup = [177, 175, 204, 150, 169, 190, 191, 174, 229, 82, 74, 20, 183, 8, 41, 185, 39, 152, 51, 30, 78, 21, 68, 80, 72, 17, 10, 154, 98, 186, 57, 192, 118, 74, 40, 112, 120, 8, 123];
const yk = ':A\x02\x11{37\x88N\xe81\xd2f)y\x08*Mw)}\xd1i\xdanO\x8eC\x1e5\x96\xdd\xf9\xd1\xc8\xdb\xaa\xeb\xc2'
//const yk = atob("OkECEXszN/QJ1inIW2IYJDd2GCYH71T8EEvRcAENiPuIjcPiopjG") // BACKUP KEY!!!
let api_builder = "";
for (let idx in lookup) {
    api_builder += String.fromCharCode(yk[idx].charCodeAt(0) ^ lookup[lookup.length - idx - 1]);
}

export const YT_API_KEY = api_builder;