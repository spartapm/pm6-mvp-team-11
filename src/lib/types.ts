export type FarmId =
  | "carrot"
  | "grape"
  | "strawberry"
  | "corn"
  | "potato";

export type Product = {
  id: string;
  farmId: FarmId;
  name: string;
  price: number;
  imageUrl: string;
};

export type Review = {
  id: string;
  farmId: FarmId;
  author: string;
  rating: number;
  content: string;
  date: string;
  imageUrl?: string;
};

export type Farm = {
  id: FarmId;
  name: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  thumbnailUrl: string;
  mapMarkerUrl: string;
  emoji?: string;
  isOrganic?: boolean;
  pickupLocation: string;
  address: string;
  phone: string;
  heroImageUrl: string;
  heroImages: string[];
  profileImageUrl: string;
  roadviewImageUrl: string;
  description: string;
  location: { lat: number; lng: number };
  mapMarker: { top: string; left: string; emoji: string };
  products: Product[];
  reviews: Review[];
};

export type CartItem = {
  productId: string;
  farmId: FarmId;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};
