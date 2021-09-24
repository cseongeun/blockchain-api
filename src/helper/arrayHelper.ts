import * as _ from 'lodash';

import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { toCheckSumAddresses } from './addressHelper';
import { isZero } from './bignumberHelper';
import { checkSpace, checkSpecialCharacters } from './regExpHelper';
import { isNull } from './typeHelper';

export const convertArrayToObject = (array: any[], key: string) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, []);
};

export const findGreaterThanZeroBalance = (array: any[]) => {
  return array.filter((v) => !v.balance.isZero());
};

export const flat = (array: any[], all: boolean = false) => {
  return all ? array.flat(Infinity) : array.flat();
};

export const fillSomeThing = (number: number, thing: any) => {
  return Array.from({ length: number }, (_, i) => thing);
};

export const fillSequenceNumber = (number: number, start: number = 0) => {
  return Array.from({ length: number }, (_, i) => i + start);
};

export const toSplitWithChunkSize = (array: any[], chunkSize: number) => {
  return _.chunk(array, chunkSize);
};

export const toSplitWithReturnSize = (array: any[], returnSize: number) => {
  const len = array.length;
  const chunkSize = len / returnSize;
  const temps = [];
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    temps.push(chunk);
  }
  return temps;
};

export const toSplitStartEndNumberReturnSize = (
  start: number,
  end: number,
  returnSize: number,
) => {
  const chunk = parseInt(((end - start) / returnSize - 1).toString(), 10);
  const temps = [];
  let acc = start;

  while (acc <= end - 1) {
    temps.push([acc, acc + chunk]);
    acc += chunk + 1;
    if (acc >= end - 1) {
      temps.push([acc, end - 1]);
      break;
    }
  }
  return temps;
};

export const delHasCharacterArguments = (array: any[]) => {
  return array.map((value) => {
    if (!checkSpecialCharacters(value)) return value;
  });
};

export const delHasSpaceArguments = (array: any[]) => {
  return array.map((value) => {
    if (!checkSpace(value)) return value;
  });
};

export const removeItem = (array: any[], item: any) => {
  const indexOfItem = array.indexOf(item);
  if (indexOfItem > -1) {
    array.splice(indexOfItem, 1);
  }
  return array;
};

export const randomPick = (array: any[]) => {
  return _.sample(array);
};

export const groupBy = (array: any[], key: string[]) => {
  return array.reduce((carry, element) => {
    const group = key.reduce((k, e) => {
      k = k[e];
      return k;
    }, element);

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[group].push(element);
    return carry;
  }, {});
};

export const isAllZeroValue = (array: any[]) => {
  return array.every((item) => isZero(item));
};

export const sliceByIndexes = (array: any[], indexes: number[]) => {
  const temps = [];
  const latest = indexes.reduce((prevIndex, index) => {
    const value = array.slice(prevIndex, index);
    temps.push(value);
    return index;
  }, 0);

  // left
  temps.push(array.slice(latest, array.length));
  return temps;
};

export const toLowerCaseValues = (array: string[]) => {
  return _.map(array, _.method('toLowerCase'));
};

export const removeStringValues = (
  array: any[],
  removeArray: any[],
  checkSum = false,
) => {
  const lowerArray = toLowerCaseValues(array);
  const lowerRemoveArray = toLowerCaseValues(removeArray);
  if (isNull(lowerRemoveArray) || lowerRemoveArray.length == 0)
    return lowerArray;
  const result = _.without(lowerArray, ...lowerRemoveArray);

  return checkSum ? toCheckSumAddresses(result) : result;
};

export const zipObject = (keyArray: any[], valueArray: any[]) => {
  return _.zipObject(keyArray, valueArray);
};
