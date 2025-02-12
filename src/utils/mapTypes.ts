import type { AssetTypeApi, AssetType } from "@/types";

export function mapTypes(types: AssetTypeApi[]): AssetType[] {
  const mappedTypes = types.map((type, index) => ({
    id: index + 1,
    uuid: type.uuid,
    name: type.name,
  }));

  return [{ id: 0, uuid: "0", name: "None" }, ...mappedTypes];
}
