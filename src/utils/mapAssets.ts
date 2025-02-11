import type { AssetApi, Asset } from "@types";

export function mapAssets(assets: AssetApi[]): Asset[] {
  const mappedAssets = assets.map((asset, index) => ({
    id: asset.uuid,
    entry: index + 1,
    title: asset.title,
    type: asset.type.name,
    size: asset.size,
    address: `${asset.street} ${asset.street_number}, ${asset.postal_code}`,
    description: asset.description,
    created: new Date(asset.created_at).toLocaleDateString(),
    updated: new Date(asset.updated_at).toLocaleDateString(),
  }));

  return mappedAssets;
}
