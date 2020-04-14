/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { tap, length, prop, pipeWith } from "ramda";
import Api from "../tools/api";

const api = new Api();

const validator = (strNum) => {
  return new Promise((resolve, reject) => {
    const checkNumberSystem = (str) => /^\d+\.?\d+$/.test(str);
    const numberLength = strNum.length;
    const isValid = checkNumberSystem(strNum) && numberLength < 10 && numberLength > 2;
    isValid ? resolve(strNum) : reject("Validation error");
  });
};

const convertApiFetcher = api.get("https://api.tech/numbers/base");
const convertApiRequest = (value) => convertApiFetcher({ from: 10, to: 2, number: value });
const animalApiRequest = (id) => api.get(`https://animals.tech/${id}`, {});
const getResult = prop("result");

const convertToInt = (str) => Math.round(str);
const squareNum = (num) => Math.pow(num, 2);
const reminderOfDivisionThree = (num) => num % 3;

const pipePromises = pipeWith((f, res) => {
  return res instanceof Promise
    ? res.then((v) => Promise.resolve(f(v))).catch((e) => Promise.reject(e))
    : Promise.resolve(f(res));
});

const processSequence = (obj) => {
  const { value, writeLog, handleSuccess, handleError } = obj;

  const logEffect = tap((val) => writeLog(val));
  const successEffect = tap((val) => handleSuccess(val));

  const processValue = pipePromises([
    logEffect,
    validator,
    convertToInt,
    logEffect,
    convertApiRequest,
    getResult,
    logEffect,
    length,
    logEffect,
    squareNum,
    logEffect,
    reminderOfDivisionThree,
    logEffect,
    animalApiRequest,
    getResult,
    successEffect,
  ]);

  processValue(value).catch((err) => handleError(err));
};

export default processSequence;
