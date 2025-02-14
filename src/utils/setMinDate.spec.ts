import { describe, it, expect, vi } from "vitest";
import { setMinDate } from "@/utils";

describe("setMinDate", () => {
  it("should return tomorrow's date in YYYY-MM-DD format", () => {
    const mockDate = new Date("2024-01-01T00:00:00Z");
    vi.setSystemTime(mockDate);
    expect(setMinDate()).toBe("2024-01-02");
    vi.useRealTimers();
  });
});
