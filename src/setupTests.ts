// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-empty-function */

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      removeListener: function () {},
      addListener: function () {},
    };
  };
