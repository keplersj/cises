import * as rmp from "./rmp";

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

    it("uses fetch to get data from the Rate My Professors backend", async () => {
      let query = "";

      fetchMock.mockImplementationOnce((fetchQuery: string) => {
        query = fetchQuery;

        fetchMock.mockResponseOnce("noCB({ response: { docs: [{}] } })");

        return fetchMock(fetchQuery);
      });

      await rmp.getProfessorFromSchool("Teacher Name", "School Name");

      expect(fetchMock).toHaveBeenCalled();
      expect(query).not.toEqual("");
      expect(query).toMatchSnapshot();
    });
  });
});
