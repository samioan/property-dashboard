import { describe, it, expect } from "vitest";
import { transformAssetData } from "@/utils/transformAssetData";
import type { AssetApi } from "@/types";

describe("transformAssetData", () => {
  it("should transform asset data correctly", () => {
    const input: AssetApi = {
      title: "Luxury Apartment",
      available_from: "2025-06-15T12:00:00Z",
      floor: 3,
      bathrooms: 2,
      bedrooms: 4,
      price: "250000",
      size: 1200,
      type: {
        uuid: "",
        name: "",
      },
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };

    const expectedOutput = {
      ...input,
      available_from: "2025-06-15",
      floor: "3",
      bathrooms: "2",
      bedrooms: "4",
      price: "250000",
      size: "1200",
    };

    expect(transformAssetData(input)).toEqual(expectedOutput);
  });

  it("should handle edge case where available_from is already formatted", () => {
    const input: AssetApi = {
      title: "Cozy Studio",
      available_from: "2025-07-01",
      floor: 2,
      bathrooms: 1,
      bedrooms: 1,
      price: "150000",
      size: 600,
      type: {
        uuid: "",
        name: "",
      },
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };

    const expectedOutput = {
      ...input,
      available_from: "2025-07-01",
      floor: "2",
      bathrooms: "1",
      bedrooms: "1",
      price: "150000",
      size: "600",
    };

    expect(transformAssetData(input)).toEqual(expectedOutput);
  });

  it("should handle empty strings and zero values", () => {
    const input: AssetApi = {
      title: "Minimal Loft",
      available_from: "2025-08-20T00:00:00Z",
      floor: 0,
      bathrooms: 0,
      bedrooms: 0,
      price: "0",
      size: 0,
      type: {
        uuid: "",
        name: "",
      },
      street: "",
      street_number: "",
      postal_code: "",
      description: "",
      amenities: [],
    };

    const expectedOutput = {
      ...input,
      available_from: "2025-08-20",
      floor: "0",
      bathrooms: "0",
      bedrooms: "0",
      price: "0",
      size: "0",
    };

    expect(transformAssetData(input)).toEqual(expectedOutput);
  });
});
