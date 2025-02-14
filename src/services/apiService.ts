import axios from "axios";
import type { AssetWithType } from "@/types";
import { API_BASE_URL } from "@/configs";

export async function fetchAssets(
  page: number,
  limit: number,
  type?: number,
  amenities?: string[]
) {
  const response = await axios.get(`${API_BASE_URL}/listings`, {
    params: {
      page,
      limit,
      ...(!!type ? { ["filter[type_id]"]: type } : {}),
      ...(!!amenities?.length
        ? { ["filter[amenities]"]: amenities.join(",") }
        : {}),
    },
  });
  return response.data;
}

export const fetchAssetById = async (uuid: string) => {
  const response = await axios.get(`${API_BASE_URL}/listings/${uuid}`);
  return response.data;
};

export const updateAsset = async (uuid: string, data: AssetWithType) => {
  const response = await axios.put(`${API_BASE_URL}/listings/${uuid}`, data);
  return response.data;
};

export const fetchAmenities = async () => {
  const response = await axios.get(`${API_BASE_URL}/amenities`);
  return response.data;
};

export const fetchTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/types`);
  return response.data;
};

export const createAsset = async (data: AssetWithType) => {
  const response = await axios.post(`${API_BASE_URL}/listings`, data);
  return response.data;
};
