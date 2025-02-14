import { describe, it, expect } from "vitest";
import { mapTypes, keepOriginalTypes } from "@/utils";
import type { AssetTypeApi, AssetType } from "@/types";

describe("mapTypes", () => {
  it("should map AssetTypeApi to AssetType and prepend 'None'", () => {
    const input: AssetTypeApi[] = [
      { uuid: "123", name: "Type A" },
      { uuid: "456", name: "Type B" },
    ];

    const expectedOutput: AssetType[] = [
      { id: 0, uuid: "0", name: "None" },
      { id: 1, uuid: "123", name: "Type A" },
      { id: 2, uuid: "456", name: "Type B" },
    ];

    expect(mapTypes(input)).toEqual(expectedOutput);
  });

  it("should return only 'None' when given an empty array", () => {
    expect(mapTypes([])).toEqual([{ id: 0, uuid: "0", name: "None" }]);
  });
});

describe("keepOriginalTypes", () => {
  it("should remove the first element (None) and return the rest", () => {
    const input: AssetType[] = [
      { id: 0, uuid: "0", name: "None" },
      { id: 1, uuid: "123", name: "Type A" },
      { id: 2, uuid: "456", name: "Type B" },
    ];

    const expectedOutput: AssetType[] = [
      { id: 1, uuid: "123", name: "Type A" },
      { id: 2, uuid: "456", name: "Type B" },
    ];

    expect(keepOriginalTypes(input)).toEqual(expectedOutput);
  });

  it("should return an empty array if input only contains 'None'", () => {
    expect(keepOriginalTypes([{ id: 0, uuid: "0", name: "None" }])).toEqual([]);
  });
});
