// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import "@testing-library/jest-dom";

import { render } from "@testing-library/svelte";

import Button from "../app/login/LoginContainer.svelte";

test("shows proper heading when rendered", () => {
    const { getByText } = render(Button);

    expect(getByText("Hello World!")).toBeInTheDocument();
});
