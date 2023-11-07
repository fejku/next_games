export enum Parity {
  ODD,
  EVEN,
}

export class Utils {
  static randomBoolean = () => Math.random() > 0.5;

  static randomRange = (min: number, max: number, parity?: Parity) => {
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (parity === undefined) return result;

    if (parity === Parity.EVEN) {
      if (max - min < 2) throw "Range for even cannot be lesser than 2";

      while (result % 2 !== 0) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    } else {
      while (result % 2 === 0) {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    return result;
  };
}