import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Card, cardService } from "src/services/cardService";
import { useAccount, useSignMessage } from "wagmi";

// Enhanced signature manager with TanStack Query
export const useSignatureManager = () => {
  const { signMessageAsync } = useSignMessage();
  const { isConnected, address } = useAccount();
  const queryClient = useQueryClient();

  const signatureQuery = useQuery({
    queryKey: ["walletSignature", address],
    queryFn: async (): Promise<string> => {
      if (!isConnected || !signMessageAsync) {
        throw new Error("Wallet not connected");
      }

      const signature = await signMessageAsync({ message: "CARD_QUERY" });
      return signature;
    },
    enabled: false, // Only run when explicitly called
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const getOrCreateSignature = async (): Promise<string> => {
    // Try to get from session storage first
    const existingSignature = sessionStorage.getItem(`signature_${address}`);
    if (existingSignature) {
      return existingSignature;
    }

    // Try to get from React Query cache
    const cachedSignature = queryClient.getQueryData<string>([
      "walletSignature",
      address,
    ]);
    if (cachedSignature) {
      sessionStorage.setItem(`signature_${address}`, cachedSignature);
      return cachedSignature;
    }

    // Generate new signature
    const newSignature = await signatureQuery.refetch();
    if (newSignature.data) {
      sessionStorage.setItem(`signature_${address}`, newSignature.data);
      return newSignature.data;
    }

    throw new Error("Failed to generate signature");
  };

  const clearSignature = () => {
    sessionStorage.removeItem(`signature_${address}`);
    queryClient.removeQueries({ queryKey: ["walletSignature", address] });
  };

  return {
    getOrCreateSignature,
    clearSignature,
    isConnected,
    isSignatureLoading: signatureQuery.isFetching,
  };
};

// Enhanced card list query with automatic retry and error handling
export const useCardList = () => {
  const { getOrCreateSignature, clearSignature, isConnected } =
    useSignatureManager();
  const queryClient = useQueryClient();

  const cardListQuery = useQuery({
    queryKey: ["cardList"],
    queryFn: async (): Promise<Card[]> => {
      const signature = await getOrCreateSignature();
      return await cardService.getCardList(signature);
    },
    enabled: isConnected,
    staleTime: 1000 * 30, // 30 seconds
    retry: (failureCount, error) => {
      // If signature related error, clear signature and retry
      if (
        error.message?.includes("signature") ||
        error.message?.includes("unauthorized") ||
        error.message?.includes("invalid")
      ) {
        clearSignature();
        return failureCount < 2;
      }
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const refreshCardListMutation = useMutation({
    mutationFn: async () => {
      clearSignature();
      const newSignature = await getOrCreateSignature();
      return await cardService.getCardList(newSignature);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cardList"], data);
    },
    onError: (error) => {
      console.error("Failed to refresh card list:", error);
    },
  });

  return {
    cardList: cardListQuery.data,
    isLoading: cardListQuery.isLoading,
    error: cardListQuery.error,
    refetch: cardListQuery.refetch,
    refreshCardList: refreshCardListMutation.mutate,
    isRefreshing: refreshCardListMutation.isPending,
    isStale: cardListQuery.isStale,
  };
};

// Card details query for individual card information
export const useCardDetails = (cardId: string | undefined) => {
  const { getOrCreateSignature, isConnected } = useSignatureManager();

  return useQuery({
    queryKey: ["cardDetails", cardId],
    queryFn: async (): Promise<Card> => {
      if (!cardId) throw new Error("Card ID is required");

      const signature = await getOrCreateSignature();
      // Assuming you have a getCardDetails method in cardService
      const cardList = await cardService.getCardList(signature);
      const card = cardList.find((c) => c.id === cardId);

      if (!card) {
        throw new Error("Card not found");
      }

      return card;
    },
    enabled: !!(isConnected && cardId),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// // Infinite query for card transaction history
// export const useCardTransactions = (cardId: string | undefined) => {
//   const { getOrCreateSignature, isConnected } = useSignatureManager();

//   return useInfiniteQuery({
//     queryKey: ["cardTransactions", cardId],
//     queryFn: async ({ pageParam = 1 }) => {
//       if (!cardId) throw new Error("Card ID is required");

//       const signature = await getOrCreateSignature();
//       // Assuming you have a getCardTransactions method
//       const response = await fetch(
//         `/api/v2/tap2pay/card/${cardId}/transactions?page=${pageParam}&limit=20`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "text/plain",
//             Accept: "application/json",
//           },
//           body: signature,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch transactions: ${response.statusText}`);
//       }

//       return await response.json();
//     },
//     enabled: !!(isConnected && cardId),
//     getNextPageParam: (lastPage, pages) => {
//       if (lastPage.hasMore) {
//         return pages.length + 1;
//       }
//       return undefined;
//     },
//     staleTime: 1000 * 60,
//   });
// };

// Mutation for card operations (delete, update, etc.)
export const useCardMutations = () => {
  const queryClient = useQueryClient();
  const { getOrCreateSignature } = useSignatureManager();

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: string) => {
      const signature = await getOrCreateSignature();
      const response = await fetch(`/api/v2/tap2pay/card/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
        body: signature,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.statusText}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch card list
      queryClient.invalidateQueries({ queryKey: ["cardList"] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: async ({
      cardId,
      updates,
    }: {
      cardId: string;
      updates: Partial<Card>;
    }) => {
      const signature = await getOrCreateSignature();
      const response = await fetch(`/api/v2/tap2pay/card/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          signature,
          updates,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update card: ${response.statusText}`);
      }

      return await response.json();
    },
    onSuccess: (data, variables) => {
      // Update both card list and individual card details
      queryClient.invalidateQueries({ queryKey: ["cardList"] });
      queryClient.invalidateQueries({
        queryKey: ["cardDetails", variables.cardId],
      });
    },
  });

  return {
    deleteCard: deleteCardMutation.mutate,
    updateCard: updateCardMutation.mutate,
    isDeletingCard: deleteCardMutation.isPending,
    isUpdatingCard: updateCardMutation.isPending,
    deleteCardError: deleteCardMutation.error,
    updateCardError: updateCardMutation.error,
  };
};

// Query for card statistics and analytics
export const useCardAnalytics = (cardId?: string) => {
  const { getOrCreateSignature, isConnected } = useSignatureManager();

  return useQuery({
    queryKey: ["cardAnalytics", cardId],
    queryFn: async () => {
      const signature = await getOrCreateSignature();
      const endpoint = cardId
        ? `/api/v2/tap2pay/card/${cardId}/analytics`
        : "/api/v2/tap2pay/analytics/overview";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
        body: signature,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }

      return await response.json();
    },
    enabled: isConnected,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
