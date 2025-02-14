import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAssetStore } from "@/store";
import {
  fetchAssets,
  fetchAssetById,
  updateAsset,
  fetchAmenities,
  fetchTypes,
} from "@/services";
import { LoadingStates } from "@/enums";
import type { AssetWithType } from "@/types";

vi.mock("@/services", async () => ({
  fetchAssets: vi.fn(),
  fetchAssetById: vi.fn(),
  updateAsset: vi.fn(),
  fetchAmenities: vi.fn(),
  fetchTypes: vi.fn(),
}));

describe("Asset Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with default values", () => {
    const store = useAssetStore();
    expect(store.assets).toEqual([]);
    expect(store.currentAsset).toBeUndefined();
    expect(store.types).toEqual([]);
    expect(store.amenities).toEqual([]);
    expect(store.page).toBe(1);
    expect(store.lastPage).toBe(2);
    expect(store.isModalOpen).toBe(false);
    expect(store.isLoading).toEqual([]);
    expect(store.hasError).toBe(false);
  });

  it("loads assets successfully", async () => {
    vi.mocked(fetchAssets).mockResolvedValue({
      data: [],
      meta: { last_page: 5 },
    });
    const store = useAssetStore();
    await store.loadAssets();
    expect(fetchAssets).toHaveBeenCalled();
    expect(store.assets).toEqual([]);
    expect(store.lastPage).toBe(5);
    expect(store.isLoading).not.toContain(LoadingStates.ASSETS);
  });

  it("handles asset loading failure", async () => {
    vi.mocked(fetchAssets).mockRejectedValue(
      new Error("Failed to load assets")
    );
    const store = useAssetStore();
    await store.loadAssets();
    expect(store.hasError).toBe(true);
  });

  it("loads asset by ID successfully", async () => {
    vi.mocked(fetchAssetById).mockResolvedValue({
      data: { uuid: "123", available_from: "2025-01-01T12:00:00Z" },
    });
    const store = useAssetStore();
    await store.loadAssetById("123");
    expect(fetchAssetById).toHaveBeenCalledWith("123");
    expect(store.currentAsset).toEqual({
      uuid: "123",
      available_from: "2025-01-01",
    });
  });

  it("saves asset and reloads assets", async () => {
    vi.mocked(updateAsset).mockResolvedValue("");
    vi.mocked(fetchAssets).mockResolvedValue({
      data: [],
      meta: { last_page: 5 },
    });
    const store = useAssetStore();
    await store.saveAsset("123", {} as AssetWithType);
    expect(updateAsset).toHaveBeenCalledWith("123", {});
    expect(fetchAssets).toHaveBeenCalled();
  });

  it("loads types successfully", async () => {
    vi.mocked(fetchTypes).mockResolvedValue({ data: [] });
    const store = useAssetStore();
    await store.loadTypes();
    expect(fetchTypes).toHaveBeenCalled();
    expect(store.types).toEqual([
      {
        id: 0,
        name: "None",
        uuid: "0",
      },
    ]);
  });

  it("loads amenities successfully", async () => {
    vi.mocked(fetchAmenities).mockResolvedValue({ data: ["WiFi", "Parking"] });
    const store = useAssetStore();
    await store.loadAmenities();
    expect(fetchAmenities).toHaveBeenCalled();
    expect(store.amenities).toEqual(["WiFi", "Parking"]);
  });

  it("clears store data", () => {
    const store = useAssetStore();
    store.assets = [
      {
        id: "1",
        title: "Test",
        entry: 0,
        type: "",
        size: 0,
        address: "",
        description: "",
      },
    ];
    store.clearData();
    expect(store.assets).toEqual([]);
    expect(store.currentAsset).toEqual({});
    expect(store.page).toBe(1);
    expect(store.isModalOpen).toBe(false);
  });
});
