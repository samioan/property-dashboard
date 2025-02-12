import type { AssetApi } from "@/types";

export function transformAssetData(assetData: AssetApi) {
  return {
    ...assetData,
    available_from: assetData.available_from.split("T")[0],
    floor: `${assetData.floor}`,
    bathrooms: `${assetData.bathrooms}`,
    bedrooms: `${assetData.bedrooms}`,
    price: `${assetData.price}`,
    size: `${assetData.size}`,
  };
}
