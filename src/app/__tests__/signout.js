import React from 'react';
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import RoutesContainer from "../components/Routes";
import Route from "react-router";
import * as actions from '../../redux/actions';
import {LOGIN, LOGOUT} from "../../redux/actionTypes";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<App />);
});

describe("Actions", () => {
  it('should return logout', function () {
    const expected = {
      type: LOGOUT
    }
    expect(actions.signOutUser()).toEqual(expected)
  });
})

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
    //TODO ver como testear clicks en signout
    // Check correct page content showed up
    // expect(useSelector(state => state.auth.isAuthorized)).toEqual (true);
  })
})