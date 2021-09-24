import { ethers } from 'ethers';

const _generateIface = (abi: any[]) => {
  return new ethers.utils.Interface(abi);
};

export const encodeFunction = (
  abi: any,
  targetFunction: string,
  params: any[] = [],
) => {
  const iface: any = _generateIface(abi);
  return iface.encodeFunctionData(targetFunction, params);
};

export const decodeFunction = (
  abi: any,
  targetFunction: string,
  data: string,
) => {
  const iface: any = _generateIface(abi);
  return iface.decodeFunctionData(targetFunction, data);
};

export const decodeFunctionResultData = (
  abi: any,
  targetFunction: string,
  data: string,
) => {
  const iface: any = _generateIface(abi);
  return iface.decodeFunctionResult(targetFunction, data);
};

export const parseLog = (abi: any, data: string) => {
  const iface: any = _generateIface(abi);
  return iface.parseLog(data);
};

export const encodeEventTopic = (abi: any, event: string) => {
  const iface: any = _generateIface(abi);
  return iface.getEventTopic(event);
};

export const encodeEventFilterTopic = (
  abi: any,
  event: string,
  filter: any[],
) => {
  const iface: any = _generateIface(abi);
  return iface.encodeFilterTopics(event, filter);
};
