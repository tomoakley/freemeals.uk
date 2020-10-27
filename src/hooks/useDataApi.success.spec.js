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

  it("should return data with a successful api request", async () => {
    const { result } = renderHook(() => useDataApi());
    // Any request to 'test.com' should return 'returnedData: "successData"'
    fetchMock.mock("test.com", {
      returnedData: "successData"
    });

    await act(async () => {
      result.current.callApi("test.com");
    });

    expect(result.current.data).toStrictEqual({
      returnedData: "successData"
    });
    expect(result.current.error).toBe(false);
    expect(result.current.fetching).toBe(false);
  });
});

