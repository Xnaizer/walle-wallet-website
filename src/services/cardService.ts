import api from "./api";

interface CardRegistrationData {
  signerAddress: string;
  hashCard: `0x${string}`;
  hashPin: `0x${string}`;
  ethSignMessage: string;
}

interface CardRegistrationResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface Card {
  id: string;
  name?: string;
  balance?: number;
  currency?: string;
}

export const cardService = {
  getCardList: async (signature: string): Promise<Card[]> => {
    try {
      const response = await api.post(`/v2/tap2pay/cards`, signature, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching card list:", error);
      throw error;
    }
  },

  registerCard: async (
    registrationData: CardRegistrationData
  ): Promise<CardRegistrationResponse> => {
    try {
      const response = await api.post(
        `/v2/tap2pay/card-register`,
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );

      return {
        success: true,
        message: response.data?.message || "Card registered successfully",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error registering card:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Network error occurred";

      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  accessCard: async (
    accessData: CardRegistrationData
  ): Promise<{
    success: boolean;
    hsmKey?: string;
    message?: string;
  }> => {
    try {
      const response = await api.post(`/v2/tap2pay/card-access`, accessData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });

      return {
        success: true,
        hsmKey: response.data,
        message: "Card access successful",
      };
    } catch (error: any) {
      console.error("Error accessing card:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Network error occurred";

      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  /**
   * Get card details by ID
   */
  getCardDetails: async (cardId: string, signature: string): Promise<Card> => {
    try {
      const response = await api.post(`/v2/tap2pay/card/${cardId}`, signature, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching card details:", error);
      throw error;
    }
  },

  getCardTransactions: async (
    cardId: string,
    signature: string,
    page: number = 1,
    limit: number = 20
  ): Promise<any> => {
    try {
      const response = await api.post(
        `/v2/tap2pay/card/${cardId}/transactions?page=${page}&limit=${limit}`,
        signature,
        {
          headers: {
            "Content-Type": "text/plain",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching card transactions:", error);
      throw error;
    }
  },

  getCardAnalytics: async (
    cardId: string | undefined,
    signature: string
  ): Promise<any> => {
    try {
      const endpoint = cardId
        ? `/v2/tap2pay/card/${cardId}/analytics`
        : "/v2/tap2pay/analytics/overview";

      const response = await api.post(endpoint, signature, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching card analytics:", error);
      throw error;
    }
  },

  deleteCard: async (cardId: string, signature: string): Promise<any> => {
    try {
      const response = await api.delete(`/v2/tap2pay/card/${cardId}`, {
        headers: {
          "Content-Type": "text/plain",
          Accept: "application/json",
        },
        data: signature,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting card:", error);
      throw error;
    }
  },

  updateCard: async (
    cardId: string,
    updates: Partial<Card>,
    signature: string
  ): Promise<any> => {
    try {
      const response = await api.patch(
        `/v2/tap2pay/card/${cardId}`,
        {
          signature,
          updates,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating card:", error);
      throw error;
    }
  },
};

export type { CardRegistrationData, CardRegistrationResponse, Card };
