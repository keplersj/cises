import * as rmp from "./rmp";
import { jsxAttribute } from "@babel/types";

describe("Rate My Professors", () => {
  describe("getProfessorFromSchool", () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it("provides object from RMP's callback function", async () => {
      fetchMock.mockResponseOnce("noCB({ response: { docs: [{}] } })");

      const response = await rmp.getProfessorFromSchool(
        "Teacher Name",
        "School Name"
      );

      expect(response).toEqual({});
    });
  });
});
