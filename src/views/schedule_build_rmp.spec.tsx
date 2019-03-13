import React from "react";
import { ScheduleBuilderRMP } from "./schedule_builder_rmp";
import renderer from "react-test-renderer";

describe("Schedule Builder - Rate My Professor Component", () => {
  it("matches snapshot when provdided with valid data", () => {
    const component = renderer.create(
      <ScheduleBuilderRMP
        professor={{
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
        }}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
