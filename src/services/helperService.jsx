import api from "./apiService";

const RFID_SCAN_DATA_API = "/rfid/scan/data";

export const helperService = {
  submitRfidScanData: async (payload) => {
    const { data } = await api.post(RFID_SCAN_DATA_API, payload);
    return data;
  },

  populateDeliveryItemsFromPacking: async (visitId) => {
    const response = await api.post(
      `/trips/visits/${visitId}/populate-delivery-items-from-packing`,
      {},
      {
        meta: { includeDcid: true },
      }
    );

    return {
      success: true,
      statusCode: response.status || 200,
      visitId: Number(visitId),
      message: `Delivery request items successfully populated from packing for Visit ID: ${visitId}`,
      timestamp: new Date().toISOString(),
      details: response.data || "Visit delivery items populated successfully.",
    };
  },
};
