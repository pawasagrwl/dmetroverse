export interface RedditPostData {
  title: string;
  selftext: string;
  url: string;
}

export interface RedditResponse {
  kind: string;
  data: {
    children: { data: RedditPostData }[];
  };
}

export interface RouteData {
  route: {
    "map-path": string[];
  }[];
}

export interface FacilityDetail {
  facility_name: string;
  purpose: string;
  location_description: string;
  nearest_gate_code: string;
  nearest_gate_name: string;
  nearest_lift_code: string;
  nearest_lift_name: string;
  nearest_platform_code: string;
  nearest_platform_name: string;
}

export interface Facility {
  kind: string;
  "icon-class": string;
  detail_list: FacilityDetail[];
}

export interface StationData {
  stationCode: string;
  stationName: string;
  facilities: Facility[];
}

export interface JourneyContextProps {
  origin: string;
  setOrigin: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

export interface JourneyContextType {
  origin: string;
  setOrigin: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
}

