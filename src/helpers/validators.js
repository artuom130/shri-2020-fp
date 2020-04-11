import {
  compose,
  pipe,
  allPass,
  equals,
  prop,
  filter,
  keys,
  isEmpty,
  symmetricDifference,
  curry,
  length,
  converge,
  map,
  apply,
  unapply,
  not,
} from "ramda";
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isRed = equals("red");
const isBlue = equals("blue");
const isOrange = equals("orange");
const isGreen = equals("green");
const isWhite = equals("white");

const getStar = prop("star");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getCircle = prop("circle");

const filterRedFigures = filter(isRed);
const filterBlueFigures = filter(isBlue);
const filterOrangeFigures = filter(isOrange);
const filterGreenFigures = filter(isGreen);
const filterWhiteFigures = filter(isWhite);

const twoOrMore = (v) => v >= 2;
const threeOrMore = (v) => v >= 3;

const eqValues = curry(compose(isEmpty, symmetricDifference));
const haveFigures = (figures) => compose(eqValues(figures), keys);
const objectKeysLength = compose(length, keys);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
const haveRedStar = compose(isRed, getStar);
const haveGreenSquare = compose(isGreen, getSquare);
const haveWhiteTriangleAndCircle = compose(haveFigures(["circle", "triangle"]), filterWhiteFigures);
export const validateFieldN1 = allPass([haveRedStar, haveGreenSquare, haveWhiteTriangleAndCircle]);

// 2. Как минимум две фигуры зеленые.
const greenFiguresArray = compose(keys, filterGreenFigures);
export const validateFieldN2 = pipe(greenFiguresArray, length, twoOrMore);

// 3. Количество красных фигур равно кол-ву синих.
const redFiguresCount = compose(length, keys, filterRedFigures);
const blueFiguresCount = compose(length, keys, filterBlueFigures);
export const validateFieldN3 = converge(equals, [redFiguresCount, blueFiguresCount]);

// 4. Синий круг, красная звезда, оранжевый квадрат
const haveBlueCircle = compose(isBlue, getCircle);
const haveOrangeSquare = compose(isOrange, getSquare);
export const validateFieldN4 = allPass([haveBlueCircle, haveRedStar, haveOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
const lengthsOfObjects = map(objectKeysLength);
const maxLengthOfObjects = compose(apply(Math.max), lengthsOfObjects);
const nonWhiteFilters = [
  filterRedFigures,
  filterBlueFigures,
  filterOrangeFigures,
  filterGreenFigures,
];
const maxCountOfNonWhiteFigures = converge(unapply(maxLengthOfObjects), nonWhiteFilters);
export const validateFieldN5 = compose(threeOrMore, maxCountOfNonWhiteFigures);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
const haveGreenTriangle = compose(isGreen, getTriangle);
const haveRedFigure = compose(Boolean, objectKeysLength, filterRedFigures);
const haveTwoGreenFigure = compose(twoOrMore, objectKeysLength, filterGreenFigures);
export const validateFieldN6 = allPass([haveGreenTriangle, haveRedFigure, haveTwoGreenFigure]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
  haveFigures(["circle", "triangle", "star", "square"]),
  filterOrangeFigures
);

// 8. Не красная и не белая звезда.
const haveNotWhiteStar = compose(not, isWhite, getStar);
const haveNotRedStar = compose(not, haveRedStar);
export const validateFieldN8 = allPass([haveNotWhiteStar, haveNotRedStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
  haveFigures(["circle", "triangle", "star", "square"]),
  filterGreenFigures
);

// 10. Треугольник и квадрат одного цвета (не белого)
const haveNotWhiteTriangle = compose(not, isWhite, getTriangle);
const haveNotWhiteSquare = compose(not, isWhite, getSquare);
const triangleAndSquareHaveSameColor = converge(equals, [getTriangle, getSquare]);
export const validateFieldN10 = allPass([
  haveNotWhiteTriangle,
  haveNotWhiteSquare,
  triangleAndSquareHaveSameColor,
]);
