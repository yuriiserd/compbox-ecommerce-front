import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
};

export const logPageView = () => {
  console.log(`Logging pageview for ${process.env.NEXT_PUBLIC_URL + window.location.pathname}`)
  ReactGA.set({ page: process.env.NEXT_PUBLIC_URL + window.location.pathname });
  ReactGA.pageview(process.env.NEXT_PUBLIC_URL + window.location.pathname);
}