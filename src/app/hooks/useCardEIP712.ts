// src/hooks/useCardOperations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount, useSignTypedData, useReadContract } from "wagmi";
import { keccak256, stringToHex } from "viem";
import { CardRegistrationData, cardService } from "src/services/cardService";
import eip712abi from "../../contracts/abi/eip712.json";
import { CONTRACT_ADDRESSES } from "src/contracts/addresses";

export const domain = {
  name: "Walle",
  version: "1",
  chainId: 4202,
  verifyingContract: CONTRACT_ADDRESSES.EIP712,
} as const;

export const types = {
  CardSelfService: [
    { name: "operation", type: "uint8" },
    { name: "hashCard", type: "bytes32" },
    { name: "hashPin", type: "bytes32" },
  ],
} as const;

export enum CSSOperation {
  REGISTER = 0,
  ACCESS = 1,
}

export interface CardSelfServiceMessage {
  operation: number;
  hashCard: `0x${string}`;
  hashPin: `0x${string}`;
}

export const useVerifyCardSignature = (
  message: CardSelfServiceMessage | null,
  signature: string | null
) => {
  return useReadContract({
    address: domain.verifyingContract,
    abi: eip712abi,
    functionName: "getSignerCardSelfService",
    args:
      message && signature
        ? [
            message.operation,
            message.hashCard,
            message.hashPin,
            signature as `0x${string}`,
          ]
        : undefined,
    query: {
      enabled: !!(message && signature),
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });
};

// Hook for card registration with EIP-712
export const useRegisterCard = () => {
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cardId, pin }: { cardId: string; pin: string }) => {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      const hashCard = keccak256(stringToHex(cardId.trim()));
      const hashPin = keccak256(stringToHex(pin));

      const message: CardSelfServiceMessage = {
        operation: CSSOperation.REGISTER,
        hashCard,
        hashPin,
      };

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "CardSelfService",
        message: message,
      });

      console.log("Signature:", signature);

      const registrationData: CardRegistrationData = {
        signerAddress: address,
        hashCard: message.hashCard,
        hashPin: message.hashPin,
        ethSignMessage: signature,
      };

      const result = await cardService.registerCard(registrationData);

      if (!result.success) {
        throw new Error(result.message || "Registration failed");
      }

      return {
        ...result,
        cardData: { cardId, pin },
        message,
        signature,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardList"] });
      sessionStorage.removeItem("signature");
    },
    onError: (error) => {
      console.error("Card registration failed:", error);
    },
  });
};

// Hook for card access with EIP-712
export const useAccessCard = () => {
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();

  return useMutation({
    mutationFn: async ({ cardId, pin }: { cardId: string; pin: string }) => {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      const hashCard = keccak256(stringToHex(cardId.trim()));
      const hashPin = keccak256(stringToHex(pin));

      const message: CardSelfServiceMessage = {
        operation: CSSOperation.ACCESS,
        hashCard,
        hashPin,
      };

      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "CardSelfService",
        message: message,
      });

      const accessData: CardRegistrationData = {
        signerAddress: address,
        hashCard: message.hashCard,
        hashPin: message.hashPin,
        ethSignMessage: signature,
      };

      const result = await cardService.accessCard(accessData);

      if (!result.success) {
        throw new Error(result.message || "Access failed");
      }

      return {
        ...result,
        cardData: { cardId, pin },
        message,
        signature,
      };
    },
    onError: (error) => {
      console.error("Card access failed:", error);
    },
  });
};

// Hook for batch card verification
export const useBatchVerifyCards = (
  cards: Array<{ cardId: string; pin: string }>
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["batchVerifyCards", address, cards.length],
    queryFn: async () => {
      if (!address || cards.length === 0) return [];

      const verificationPromises = cards.map(async (card) => {
        try {
          const hashCard = keccak256(stringToHex(card.cardId));
          const hashPin = keccak256(stringToHex(card.pin));

          const message: CardSelfServiceMessage = {
            operation: CSSOperation.ACCESS,
            hashCard,
            hashPin,
          };

          return {
            cardId: card.cardId,
            isValid: true,
            message,
            error: null,
          };
        } catch (error) {
          return {
            cardId: card.cardId,
            isValid: false,
            message: null,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      });

      return await Promise.all(verificationPromises);
    },
    enabled: !!(address && cards.length > 0),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook for checking if user can perform card operations
export const useCardOperationPermissions = () => {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ["cardPermissions", address],
    queryFn: async () => {
      if (!address) {
        return {
          canRegister: false,
          canAccess: false,
          reason: "Wallet not connected",
        };
      }

      // Here you could add additional permission checks
      // For example, checking if the user has enough balance for gas
      // or if they meet certain criteria

      return {
        canRegister: true,
        canAccess: true,
        reason: null,
      };
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
