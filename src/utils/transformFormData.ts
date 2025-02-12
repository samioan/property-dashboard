import type { AssetApi, AssetType } from "@/types";

export function transformFormData(form: AssetApi, types: AssetType[]) {
  return {
    ...form,
    price: form.price.toString(),
    type_id: types.find((item) => item.name === form.type.name)?.uuid,
    available_from: new Date(form.available_from)
      .toISOString()
      .split("T")[0]
      .split("/")
      .reverse()
      .join("-"),
  };
}
