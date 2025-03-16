export interface RedditMediaMetadata {
  s: {
    u: string;
  };
}

export interface RedditPostData {
  title: string;
  selftext_html: string;
  url: string;
  author: string;
  ups: number;
  created_utc: number;
  preview?: {
    images: [
      {
        source: {
          url: string;
        };
      }
    ];
  };
  secure_media?: {
    reddit_video?: {
      fallback_url: string;
    };
  };
  is_gallery?: boolean;
  media_metadata?: { [key: string]: RedditMediaMetadata };
}



export interface RedditPostProps {
  title: string;
  body: string;
  url: string;
  username: string;
  votes: number;
  createdUtc: number;
  imageUrl?: string; // For single images
  gallery?: string[]; // Array of image URLs for galleries
  videoUrl?: string;
}

export interface RedditResponse {
  kind: string;
  data: {
    children: { data: RedditPostData }[];
  };
}

export interface PostHeaderProps {
  title: string;
  url: string;
}

export interface PostBodyProps {
  body: string;
  imageUrl?: string; // Optional prop for single images
  gallery?: string[]; // Optional prop for an array of image URLs for galleries
  videoUrl?: string; // Optional prop for a video URL
}

export interface PostFooterProps {
  username: string;
  votes: number;
  createdUtc: number;
}

export interface RouteData {
  route: {
    "map-path": string[];
  }[];
}

export interface FacilityDetail {
  facility_name: string;
  purpose: string | null;
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
  journeyType: string;
  setJourneyType: (type: string) => void; 
}


export interface HeaderProps {
  setShowFoodFacilities: (show: boolean) => void;
  setShowRedditPosts: (show: boolean) => void;
  
  showFoodFacilities: boolean;
  showRedditPosts: boolean;
  
}

export interface Station {
  station_code: string;
  station_name: string;
}