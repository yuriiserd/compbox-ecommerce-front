import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize([
    {
      trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    },
  ]);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}