import React from 'react';
import handleLogout from '../components/Routes/index'
import {useSelector} from "react-redux";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import MemoryRouter from "react-router-dom";
import RoutesContainer from "../components/Routes";
import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import Route from "react-router";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<App />);
});

describe("SignOut function", () => {
  it("should set store authorized to false", async => {
    const wrapper = shallow(<RoutesContainer />)
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      console.log(pathMap)
      console.log(route)
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});

    // Check correct page content showed up
    // expect(useSelector(state => state.auth.isAuthorized)).toEqual (true);
  })
})