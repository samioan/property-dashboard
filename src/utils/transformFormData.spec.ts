import { describe, it, expect } from "vitest";
import { transformFormData } from "@/utils";
import type { AssetApi, AssetType } from "@/types";

describe("transformFormData", () => {
  it("should transform the price to a string", () => {
    const form: AssetApi = {
      price: 1000,
      type: { uuid: "0", name: "House" },
      available_from: "2025-03-15",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      title: "",
      size: 0,
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };
    const types: AssetType[] = [{ name: "House", uuid: "0", id: 0 }];

    const result = transformFormData(form, types);
    expect(result.price).toBe("1000");
  });

  it("should map type name to the correct uuid", () => {
    const form: AssetApi = {
      price: "2000",
      type: { uuid: "456-def", name: "Apartment" },
      available_from: "2025-06-01",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      title: "",
      size: 0,
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };
    const types: AssetType[] = [
      { name: "House", uuid: "123-abc", id: 0 },
      { name: "Apartment", uuid: "456-def", id: 1 },
    ];

    const result = transformFormData(form, types);
    expect(result.type_id).toBe("456-def");
  });

  it("should format available_from correctly", () => {
    const form: AssetApi = {
      price: "500",
      type: { uuid: "789-ghi", name: "Condo" },
      available_from: "2025-02-14T08:59:58.884Z",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      title: "",
      size: 0,
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };
    const types: AssetType[] = [{ id: 0, name: "Condo", uuid: "789-ghi" }];

    const result = transformFormData(form, types);
    expect(result.available_from).toBe("2025-02-14");
  });

  it("should return undefined for type_id if type name is not found", () => {
    const form: AssetApi = {
      price: 3000,
      type: { uuid: "567-gfgh", name: "Villa" },
      available_from: "2025-07-20",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      title: "",
      size: 0,
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };
    const types: AssetType[] = [{ name: "House", uuid: "123-abc", id: 1 }];

    const result = transformFormData(form, types);
    expect(result.type_id).toBeUndefined();
  });
});
