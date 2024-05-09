import { instance } from "./api";
import MockAdapter from "axios-mock-adapter";
import { TreeNode } from "../pages/Case";
import { getCaseDetail, getCaseList } from "./caseService";
import { Gender } from "../types/case";

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
describe("getCaseList Tests", () => {
  test("Should fetch case list successfully", async () => {
    const caseListData = {
      data: [
        { config_id: 1, case_id: 101, patient_chief_complaint: "Cough", age: "45", gender: Gender.MALE },
        { config_id: 2, case_id: 102, patient_chief_complaint: "Fever", age: "30", gender: Gender.FEMALE },
      ],
    };

    mock.onGet("/cases").reply(200, caseListData);

    const response = await getCaseList();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(caseListData);
  });
});
