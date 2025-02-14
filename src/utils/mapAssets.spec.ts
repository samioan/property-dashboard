import { describe, it, expect } from "vitest";
import { mapAssets } from "@/utils";
import type { AssetApi, Asset } from "@/types";

describe("mapAssets", () => {
  it("should map an array of AssetApi objects to Asset objects", () => {
    const input: AssetApi[] = [
      {
        uuid: "123",
        title: "Apartment in Berlin",
        type: { uuid: "1", name: "Apartment" },
        size: 80,
        street: "Main Street",
        street_number: "10",
        postal_code: "10115",
        description: "A cozy apartment in the city center.",
        created_at: "2023-10-01T12:00:00Z",
        updated_at: "2023-10-05T14:30:00Z",
        bathrooms: 0,
        bedrooms: 0,
        floor: 0,
        price: "",
        available_from: "",
        amenities: [],
      },
      {
        uuid: "456",
        title: "House in Munich",
        type: { uuid: "2", name: "House" },
        size: 120,
        street: "Park Avenue",
        street_number: "20",
        postal_code: "80331",
        description: "A spacious house with a garden.",
        created_at: "2023-09-15T10:00:00Z",
        updated_at: "2023-09-20T11:45:00Z",
        bathrooms: 0,
        bedrooms: 0,
        floor: 0,
        price: "",
        available_from: "",
        amenities: [],
      },
    ];

    const expected: Asset[] = [
      {
        id: "123",
        entry: 1,
        title: "Apartment in Berlin",
        type: "Apartment",
        size: 80,
        address: "Main Street 10, 10115",
        description: "A cozy apartment in the city center.",
        created: "2023-10-01",
        updated: "2023-10-05",
      },
      {
        id: "456",
        entry: 2,
        title: "House in Munich",
        type: "House",
        size: 120,
        address: "Park Avenue 20, 80331",
        description: "A spacious house with a garden.",
        created: "2023-09-15",
        updated: "2023-09-20",
      },
    ];

    const result = mapAssets(input);
    expect(result).toEqual(expected);
  });

  it("should handle an empty array", () => {
    const input: AssetApi[] = [];
    const expected: Asset[] = [];

    const result = mapAssets(input);
    expect(result).toEqual(expected);
  });

  it("should handle missing optional fields", () => {
    const input: AssetApi[] = [
      {
        uuid: "789",
        title: "Office in Hamburg",
        type: { uuid: "3", name: "Office" },
        size: 200,
        street: "Business Road",
        street_number: "30",
        postal_code: "20095",
        description: "A modern office space.",
        created_at: undefined,
        updated_at: undefined,
        bathrooms: 0,
        bedrooms: 0,
        floor: 0,
        price: "",
        available_from: "",
        amenities: [],
      },
    ];

    const expected: Asset[] = [
      {
        id: "789",
        entry: 1,
        title: "Office in Hamburg",
        type: "Office",
        size: 200,
        address: "Business Road 30, 20095",
        description: "A modern office space.",
        created: undefined,
        updated: undefined,
      },
    ];

    const result = mapAssets(input);
    expect(result).toEqual(expected);
  });

  it("should handle missing required fields", () => {
    const input: AssetApi[] = [
      {
        uuid: "999",
        title: "Unknown Property",
        type: { uuid: "", name: "" },
        size: 0,
        street: "",
        street_number: "",
        postal_code: "",
        description: "",
        created_at: undefined,
        updated_at: undefined,
        bathrooms: 0,
        bedrooms: 0,
        floor: 0,
        price: "",
        available_from: "",
        amenities: [],
      },
    ];

    const expected: Asset[] = [
      {
        id: "999",
        entry: 1,
        title: "Unknown Property",
        type: "",
        size: 0,
        address: " , ",
        description: "",
        created: undefined,
        updated: undefined,
      },
    ];

    const result = mapAssets(input);
    expect(result).toEqual(expected);
  });
});
