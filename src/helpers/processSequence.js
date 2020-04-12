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
import { pipe, tap, ifElse, andThen, length, otherwise, prop, has, always } from "ramda";
import Api from "../tools/api";

const api = new Api();

const validator = (strNum) => {
  const checkNumberSystem = (str) => /^\d+\.?\d+$/.test(str);
  const numberLength = strNum.length;
  return checkNumberSystem(strNum) && numberLength < 10 && numberLength > 2;
};

const convertApiFetcher = api.get("https://api.tech/numbers/base");
const convertApiRequest = (value) => convertApiFetcher({ from: 10, to: 2, number: value });
const animalApiRequest = (id) => api.get(`https://animals.tech/${id}`, {});
const getResult = prop("result");

const squareNum = (num) => Math.pow(num, 2);
const reminderOfDivisionThree = (num) => num % 3;
const convertToInt = (str) => Math.round(str);
// eslint-disable-next-line no-unused-vars
const clog = (m) => tap((v) => console.log(m, v));

const processSequence = (obj) => {
  const { value, writeLog, handleSuccess, handleError } = obj;

  const logEffect = tap((val) => writeLog(val));
  const errorEffect = tap(() => handleError("ValidationError"));
  const networkErrorEffect = tap((v) => handleError(v));
  const successEffect = tap((val) => handleSuccess(val));
  const stop = always(undefined);

  const processConvertApiResult = pipe(
    length,
    logEffect,
    squareNum,
    logEffect,
    reminderOfDivisionThree,
    logEffect,
    animalApiRequest,
    otherwise(networkErrorEffect),
    andThen(ifElse(has("result"), pipe(getResult, successEffect), stop))
  );

  const processConvertApiReq = pipe(
    convertToInt,
    logEffect,
    convertApiRequest,
    otherwise(networkErrorEffect),
    andThen(ifElse(has("result"), pipe(getResult, logEffect, processConvertApiResult), stop))
  );

  const processValue = pipe(logEffect, ifElse(validator, processConvertApiReq, errorEffect));

  processValue(value);
};

export default processSequence;
