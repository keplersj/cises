import { getProfessorFromSchool } from "./lib/rmp";

function createValidMockModal() {
  const baseModal = document.createElement("div");
  baseModal.id = "base-modal";
  baseModal.className = "modal fade center-lg in";
  baseModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="section-details">
                                <li class="persist">
                                    <strong>Instructor:</strong> Name McNamey
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.className = "static-header modal-open";
  document.body.appendChild(baseModal);
}

function createInvalidMockModal() {
  const baseModal = document.createElement("div");
  baseModal.id = "base-modal";
  baseModal.className = "modal fade center-lg in";
  baseModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="section-details">
                                <li class="persist">
                                    <strong>Class Section:</strong> FAKE 1234
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.className = "static-header modal-open";
  document.body.appendChild(baseModal);
}

function mockBackendResponse() {
  fetchMock.mockResponseOnce(
    `noCB({ response: { docs: [${JSON.stringify({
      city_state_s: "",
      averageratingscore_rf: 2.0,
      pk_id: 2.0,
      schoolcity_s: "",
      schoolstate_full_s: "",
      pict_thumb_name_s: "",
      id: "",
      pageviews_i: 2.0,
      averagehelpfulscore_rf: 2.0,
      schoolcountry_s: "",
      schoolname_s: "",
      status_i: 2.0,
      teachermiddlename_t: "",
      averagehotscore_rf: 2.0,
      schoolstate_s: "",
      rated_date_dt: "",
      teacherfullname_s: "",
      teacherdepartment_s: "",
      total_number_of_ratings_i: 2.0,
      visible_i: 2.0,
      content_type_s: "",
      averageeasyscore_rf: 2.0,
      schoolid_s: "",
      teacherfirstname_t: "",
      teacherlastname_t: "",
      averageclarityscore_rf: 2.0,
      schoolwebpage_s: "",
      timestamp: "",
      tag_s_mv: ["", "", ""],
      tag_id_s_mv: ["", "", ""]
    })}] } })`
  );
}

jest.mock("./lib/rmp", () => {
  return {
    getProfessorFromSchool: jest.fn(
      require.requireActual("./lib/rmp").getProfessorFromSchool
    )
  };
});

describe("College Scheduler Content Script", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = "";
    document.body.className = "";
  });

  it("injects our component into the document when the `#base-modal` element is created", cb => {
    require("./college-scheduler");

    expect(document.body).toMatchSnapshot();

    mockBackendResponse();
    createValidMockModal();

    setTimeout(() => {
      expect(document.body).toMatchSnapshot();
      expect(document.querySelector("#cises-rmp")).toBeTruthy();
      cb();
    });
  });

  it("does not inject our component if Schedule Builder doesn't include an instructor in `#base-modal`", cb => {
    require("./college-scheduler");
    expect(document.body).toMatchSnapshot();
    createInvalidMockModal();

    setTimeout(() => {
      expect(document.body).toMatchSnapshot();
      expect(document.querySelector("#cises-rmp")).toBeNull();
      cb();
    });
  });

  describe("interacts with the Rate My Professor API", () => {
    test("to get professors from the University of Utah", cb => {
      require("./college-scheduler");
      const { getProfessorFromSchool } = require("./lib/rmp");

      mockBackendResponse();
      createValidMockModal();

      setTimeout(() => {
        expect(getProfessorFromSchool).toHaveBeenCalled();
        expect(getProfessorFromSchool.mock.calls[0][1]).toBe(
          "University of Utah"
        );
        cb();
      });
    });
  });
});
