import OneOneTwo from "../assets/regular/112.jpg";
import OneOneOne from "../assets/regular/1998.jpg";
import AsiaIn24Days from "../assets/regular/asia-in-24-days.jpg";
import AutosportTheSeries from "../assets/regular/autosport-the-series.jpg";
import BelowEcho from "../assets/regular/below-echo.jpg";
import BeyondEarth from "../assets/regular/beyond-earth.jpg";
import BottomGear from "../assets/regular/bottom-gear.jpg";
import CommunityOfOurs from "../assets/regular/community-of-ours.jpg";
import DarkSideOfTheMoon from "../assets/regular/dark-side-of-the-moon.jpg";
import Darker from "../assets/regular/darker.jpg";
import Dogs from "../assets/regular/dogs.jpg";
import DuringTheHunt from "../assets/regular/during-the-hunt.jpg";
import EarthsUntouched from "../assets/regular/earths-untouched.jpg";
import LoneHeart from "../assets/regular/lone-heart.jpg";
import MissionSaturn from "../assets/regular/mission-saturn.jpg";
import NoLandBeyond from "../assets/regular/no-land-beyond.jpg";
import OffTheTrack from "../assets/regular/off-the-track.jpg";
import ProductionLine from "../assets/regular/production-line.jpg";
import Relentless from "../assets/regular/relentless.jpg";
import SameAnswer2 from "../assets/regular/same-answer-2.jpg";
import TheDiary from "../assets/regular/the-diary.jpg";
import TheGreatLands from "../assets/regular/the-great-lands.jpg";
import TheHeiress from "../assets/regular/the-heiress.jpg";
import TheRockies from "../assets/regular/the-rockies.jpg";
import TheTastyTour from "../assets/regular/the-tasty-tour.jpg";
import UndiscoveredCities from "../assets/regular/undiscovered-cities.jpg";
import UnresolvedCases from "../assets/regular/unresolved-cases.jpg";
import VanLife from "../assets/regular/van-life.jpg";
import WhisperingHill from "../assets/regular/whispering-hill.jpg";

import TOneOneOne from "../assets/trending/1998.jpg";
import TBeyondEarth from "../assets/trending/beyond-earth.jpg";
import TBottomGear from "../assets/trending/bottom-gear.jpg";
import TDarkSideOfTheMoon from "../assets/trending/dark-side-of-the-moon.jpg";
import TUndiscoveredCities from "../assets/trending/undiscovered-cities.jpg";

const icons = [
  {
    label: "Home",
    path: "M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z",
    fill: "#5A698F",
  },
  {
    label: "Movies",
    path: "M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z",
    fill: "#5A698F",
  },
  {
    label: "Series",
    path: "M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z",
    fill: "#5A698F",
  },
  {
    label: "Bookmarked",
    path: "M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z",
    fill: "#5A698F",
  },
];

export default icons;

export interface Types {
  title: string;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
}

export const images = [
  TheGreatLands,
  TheDiary,
  EarthsUntouched,
  NoLandBeyond,
  DuringTheHunt,
  AutosportTheSeries,
  SameAnswer2,
  BelowEcho,
  TheRockies,
  Relentless,
  CommunityOfOurs,
  VanLife,
  TheHeiress,
  OffTheTrack,
  WhisperingHill,
  OneOneTwo,
  LoneHeart,
  ProductionLine,
  Dogs,
  AsiaIn24Days,
  TheTastyTour,
  Darker,
  UnresolvedCases,
  MissionSaturn,
];

export const trendImages = [
  TBeyondEarth,
  TBottomGear,
  TUndiscoveredCities,
  TOneOneOne,
  TDarkSideOfTheMoon,
];
