import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  fetchAssets,
  fetchAssetById,
  updateAsset,
  fetchAmenities,
  fetchTypes,
  createAsset,
} from "@/services";
import { API_BASE_URL } from "@/configs";

vi.mock("axios");

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchAssets should fetch assets with correct parameters", async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: [{ id: 1, name: "Asset 1" }],
    });

    const result = await fetchAssets(1, 10, 2, ["pool", "gym"]);

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/listings`, {
      params: {
        page: 1,
        limit: 10,
        "filter[type_id]": 2,
        "filter[amenities]": "pool,gym",
      },
    });
    expect(result).toEqual([{ id: 1, name: "Asset 1" }]);
  });

  it("fetchAssetById should fetch an asset by ID", async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { id: "123", name: "Asset 123" },
    });

    const result = await fetchAssetById("123");

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/listings/123`);
    expect(result).toEqual({ id: "123", name: "Asset 123" });
  });

  it("updateAsset should update an asset", async () => {
    const assetData = {
      title: "Updated Asset",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      price: "",
      available_from: "",
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
    vi.mocked(axios.put).mockResolvedValue({ data: assetData });

    const result = await updateAsset("123", assetData);

    expect(axios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/listings/123`,
      assetData
    );
    expect(result).toEqual(assetData);
  });

  it("fetchAmenities should fetch amenities", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: ["Pool", "Gym"] });

    const result = await fetchAmenities();

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/amenities`);
    expect(result).toEqual(["Pool", "Gym"]);
  });

  it("fetchTypes should fetch asset types", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: ["House", "Apartment"] });

    const result = await fetchTypes();

    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/types`);
    expect(result).toEqual(["House", "Apartment"]);
  });

  it("createAsset should create a new asset", async () => {
    const newAsset = {
      title: "New Asset",
      bathrooms: 0,
      bedrooms: 0,
      floor: 0,
      price: "",
      available_from: "",
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
    vi.mocked(axios.post).mockResolvedValue({ data: newAsset });

    const result = await createAsset(newAsset);

    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/listings`,
      newAsset
    );
    expect(result).toEqual(newAsset);
  });
});
