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

  static parseIntDefault = (number: string, defaultValue: number = 0) => {
    const parsedNumber = parseInt(number);
    return isNaN(parsedNumber) ? defaultValue : parsedNumber;
  };

  static playSuccessSound = () => new Audio("/sound/success.mp3").play();
  static playFailureSound = () => new Audio("/sound/failure.mp3").play();
}
