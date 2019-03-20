import React from "react";
import { ScheduleBuilderRMP } from "./schedule_builder_rmp";
import renderer from "react-test-renderer";

describe("Schedule Builder - Rate My Professor Component", () => {
  it("matches snapshot when provdided with valid data", () => {
    const component = renderer.create(
      <ScheduleBuilderRMP rmpId={2} tags={["", "", ""]} rating={2.0} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
