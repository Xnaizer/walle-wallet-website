import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import type {
  UseReadContractParameters,
  UseWriteContractParameters,
  UseWatchContractEventParameters,
} from "wagmi";
import { type Address, type Abi } from "viem";
import abiIdrc from "../../contracts/abi/idrc.json";
import { CONTRACT_ADDRESSES } from "src/contracts/addresses";

//================================================================
// READ HOOKS (useReadContract)
//================================================================

export const useEbiIdrcAllowance = (
  config: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName"
  > & { args: readonly [Address, Address] }
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "allowance",
    ...config,
  });
};

export const useEbiIdrcBalanceOf = (
  config: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName"
  > & { args: readonly [Address] }
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "balanceOf",
    ...config,
  });
};

export const useEbiIdrcDecimals = (
  config?: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName" | "args"
  >
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "decimals",
    ...config,
  });
};

export const useEbiIdrcName = (
  config?: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName" | "args"
  >
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "name",
    ...config,
  });
};

export const useEbiIdrcSymbol = (
  config?: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName" | "args"
  >
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "symbol",
    ...config,
  });
};

export const useEbiIdrcTotalSupply = (
  config?: Omit<
    UseReadContractParameters,
    "abi" | "address" | "functionName" | "args"
  >
) => {
  return useReadContract({
    abi: abiIdrc,
    address: CONTRACT_ADDRESSES.IDRC,
    functionName: "totalSupply",
    ...config,
  });
};

//================================================================
// WRITE HOOKS (useWriteContract)
//================================================================

// export const useEbiIdrcApprove = (
//   config?: Omit<UseWriteContractParameters, "abi" | "address" | "functionName">
// ) => {
//   return useWriteContract({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     functionName: "approve",
//     ...config,
//   });
// };

// export const useEbiIdrcDecreaseAllowance = (
//   config?: Omit<UseWriteContractParameters, "abi" | "address" | "functionName">
// ) => {
//   return useWriteContract({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     functionName: "decreaseAllowance",
//     ...config,
//   });
// };

// export const useEbiIdrcIncreaseAllowance = (
//   config?: Omit<UseWriteContractParameters, "abi" | "address" | "functionName">
// ) => {
//   return useWriteContract({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     functionName: "increaseAllowance",
//     ...config,
//   });
// };

// export const useEbiIdrcTransfer = (
//   config?: Omit<UseWriteContractParameters, "abi" | "address" | "functionName">
// ) => {
//   return useWriteContract({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     functionName: "transfer",
//     ...config,
//   });
// };

// export const useEbiIdrcTransferFrom = (
//   config?: Omit<UseWriteContractParameters, "abi" | "address" | "functionName">
// ) => {
//   return useWriteContract({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     functionName: "transferFrom",
//     ...config,
//   });
// };

//================================================================
// EVENT HOOKS (useWatchContractEvent)
//================================================================

// export const useEbiIdrcApprovalEvent = (
//   config: Omit<UseWatchContractEventParameters, "abi" | "address" | "eventName">
// ) => {
//   return useWatchContractEvent({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     eventName: "Approval",
//     ...config,
//   });
// };

// export const useEbiIdrcTransferEvent = (
//   config: Omit<UseWatchContractEventParameters, "abi" | "address" | "eventName">
// ) => {
//   return useWatchContractEvent({
//     abi: abiIdrc,
//     address: CONTRACT_ADDRESSES.IDRC,
//     eventName: "Transfer",
//     ...config,
//   });
// };
