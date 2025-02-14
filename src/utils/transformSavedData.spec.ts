import { describe, it, expect } from "vitest";
import { transformSavedData } from "@/utils";
import type { AssetWithType } from "@/types";

const mockAsset: AssetWithType = {
  title: "Sample Asset",
  type_id: "old-type",
  available_from: "2025-02-14T00:00:00Z",
  bathrooms: 0,
  bedrooms: 0,
  floor: 0,
  price: "",
  type: {
    uuid: "",
    name: "",
  },
  size: 0,
  street: "",
  street_number: "",
  postal_code: "",
  description: "",
  amenities: [],
};

describe("transformSavedData", () => {
  it("should update the type_id with the selectedTypeId", () => {
    const selectedTypeId = "new-type";
    const result = transformSavedData(mockAsset, selectedTypeId);
    expect(result.type_id).toBe(selectedTypeId);
  });

  it("should correctly format the available_from date", () => {
    const result = transformSavedData(mockAsset, "some-type");
    expect(result.available_from).toBe("2025-02-14");
  });

  it("should maintain other asset properties", () => {
    const result = transformSavedData(mockAsset, "some-type");
    expect(result.uuid).toBe(mockAsset.uuid);
    expect(result.title).toBe(mockAsset.title);
  });

  it("should handle different date formats correctly", () => {
    const assetWithDifferentDate = {
      ...mockAsset,
      available_from: "2024-12-25T10:30:00Z",
    };
    const result = transformSavedData(assetWithDifferentDate, "test-type");
    expect(result.available_from).toBe("2024-12-25");
  });

  it("should not mutate the original asset object", () => {
    const originalAsset = { ...mockAsset };
    transformSavedData(originalAsset, "mutate-check");
    expect(originalAsset).toEqual(mockAsset);
  });
});
