import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import {
  Content,
  Header,
  Grid,
  InlineNotification,
} from "carbon-components-react";

import { configure, shallow } from "enzyme";
import { render as enzymeRender } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Carbon Tacos Testing", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test("Render heading", () => {
    expect(wrapper.find("h1").text()).toContain("Build your own taco");
  });

  test("Render a Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  test("Render a Content component", () => {
    expect(wrapper.find(Content)).toHaveLength(1);
  });

  test("Render a Grid component", () => {
    expect(wrapper.find(Grid)).toHaveLength(1);
  });

  // test("Render the inital value of state for total fat in a <p>", () => {
  //   expect(wrapper.find(".tacos--value").text()).toBe("0g");
  // });

  test("Render the click event of Add taco button", () => {
    wrapper.find(`[type="button"]`).simulate("click");
    expect(wrapper.find(InlineNotification)).toHaveLength(1);
  });
});
