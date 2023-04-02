import React from "react";
import { LoginForm } from "./index";

describe("<LoginForm />", () => {
  it("renders", () => {
    let location;
    mount(
      <MemoryRouter initialEntries={["/"]}>
        <Route path="/">
          <SearchBar />
        </Route>
        <Route
          path="/*"
          render={({ location: loc }) => {
            location = loc;
            return null;
          }}
        />
      </MemoryRouter>
    );
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginForm />);
  });
});
