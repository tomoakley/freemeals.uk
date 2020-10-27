import { useDataApi } from "./useDataApi";
import "whatwg-fetch";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";

describe("useDataApi", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });

  it("should return error as true if the api error", async () => {
    const { result } = renderHook(() => useDataApi());
    // Any request to 'test.com' should return return a 500 error
    fetchMock.mock("test.com", 500);

    await act(async () => {
      result.current.callApi("test.com");
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(true);
    expect(result.current.fetching).toBe(true);
  });
});
