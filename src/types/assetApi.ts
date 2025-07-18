import type { AssetTypeApi } from "@/types";

export type AssetApi = {
  bathrooms: number;
  bedrooms: number;
  floor: number;
  latitude?: string;
  longitude?: string;
  price: string | number;
  available_from: string;
  uuid?: string;
  title: string;
  type: AssetTypeApi;
  size: number;
  street: string;
  street_number: string;
  postal_code: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  amenities: string[];
};

export interface AssetWithType extends AssetApi {
  type_id?: string;
}
