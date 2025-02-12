import type { AssetWithType } from "@/types";

export function transformSavedData(
  asset: AssetWithType,
  selectedTypeId: string
) {
  return {
    ...asset,
    type_id: selectedTypeId,
    available_from: new Date(asset.available_from)
      .toISOString()
      .split("T")[0]
      .split("/")
      .reverse()
      .join("-"),
  };
}
