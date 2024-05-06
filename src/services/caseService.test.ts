import { instance } from "./api";
import MockAdapter from "axios-mock-adapter";
import { TreeNode } from "../pages/Case";
import { getCaseDetail } from "./caseService";

const mock = new MockAdapter(instance);

describe("Case detail Tests", () => {
  test("Should get case detail", async () => {
    const responseData = {
      data: [
        {
          key: "BACKGROUND",
          values: [
            {
              key: "Patient Demographics",
              values: "text",
            },
          ],
        },
      ] as TreeNode[],
    };
    mock.onGet("/api/case-reviews/1").reply(200, responseData);

    const response = await getCaseDetail(1);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });
});
