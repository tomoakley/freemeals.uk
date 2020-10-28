import { useDataApi } from "./useApi";
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

  it("should return error as true if the api encounters an error", async () => {
    const { result } = renderHook(() => useDataApi());
    // Any request to 'test.com' should return return a 500 error
    fetchMock.mock("test1.com", 500);

    await act(async () => {
      result.current.callApi("test1.com");
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(true);
    expect(result.current.fetching).toBe(true);
  });

  it("should return data with a successful api request", async () => {
    const { result } = renderHook(() => useDataApi());
    // Any request to 'test.com' should return 'returnedData: "successData"'
    fetchMock.mock("test2.com", {
      returnedData: "successData"
    });

    await act(async () => {
      result.current.callApi("test2.com");
    });

    expect(result.current.data).toStrictEqual({
      returnedData: "successData"
    });
    expect(result.current.error).toBe(false);
    expect(result.current.fetching).toBe(false);
  });
});
