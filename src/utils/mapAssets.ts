import type { AssetApi, Asset } from "@/types";

export function mapAssets(assets: AssetApi[]): Asset[] {
  const mappedAssets = assets.map((asset, index) => ({
    id: asset?.uuid as string,
    entry: index + 1,
    title: asset.title,
    type: asset.type.name,
    size: asset.size,
    address: `${asset.street} ${asset.street_number}, ${asset.postal_code}`,
    description: asset.description,
    created: asset.created_at?.split("T")[0] as string,
    updated: asset.updated_at?.split("T")[0] as string,
  }));

  return mappedAssets;
}
