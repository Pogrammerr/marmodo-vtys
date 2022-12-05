import { breakpoints, Breakpoints } from "components/Theme";
import { useEffect, useState } from "react";

interface State {
  [key: string]: boolean;
}


const mediaQueries = (() => {
  return Object.keys(breakpoints).reduce((accum, size) => {
    const breakpoint = breakpoints[size as keyof Breakpoints];

    return {
      ...accum,
      [size]: `(max-width: ${breakpoint}rem)`,
    };
  }, {});
})();

const getKey = (size: string) =>
  `is${size.charAt(0).toUpperCase()}${size.slice(1)}`;

const useBreakpoints = () => {
  const [state, setState] = useState<State>(() =>
    Object.keys(mediaQueries).reduce((accum, size) => {
      const key = getKey(size as keyof Breakpoints);
      const mql = window.matchMedia(mediaQueries[size]);
      return { ...accum, [key]: mql.matches };
    }, {})
  );
  useEffect(() => {
    const handlers = Object.keys(mediaQueries).map((size) => {
      const mql = window.matchMedia(mediaQueries[size]);

      const handler = (matchMediaQuery: MediaQueryListEvent) => {
        const key = getKey(size);
        setState((prevState) => ({
          ...prevState,
          [key]: matchMediaQuery.matches,
        }));
      };

      mql.addEventListener("change", handler);

      return () => {
        mql.removeEventListener("change", handler);
      };
    });

    return () => {
      handlers.forEach((unsubscribeFunc) => unsubscribeFunc());
    };
  }, [setState]);

  return state;
};

export default useBreakpoints;
