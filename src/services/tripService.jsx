import apiService from './apiService';

export const tripService = {
  // GET /trips/routes?dcId=100000
  getTripRoutes: async (dcId = 100000) => {
    const { data } = await apiService.get('/trips/routes', {
      params: { dcId: Number(dcId) }
    });
    return data;
  },

  // POST /trips/visits/{visitId}/populate-delivery-items-from-packing
  populateDeliveryItemsFromPacking: async (visitId, dcid = 100000) => {
    const { data } = await apiService.post(
      `/trips/visits/${visitId}/populate-delivery-items-from-packing`,
      { dcid: Number(dcid) },
      { meta: { includeDcid: true } }
    );
    return data;
  }
};
