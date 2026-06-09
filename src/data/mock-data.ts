import { assets } from "./figma-assets";
import { GYEONGBOKGUNG } from "@/lib/kakao/constants";
import {
  locationFromDistanceBearing,
  WIREFRAME_FARM_BEARINGS,
} from "@/lib/kakao/geo";
import type { Farm, FarmId, Product, Review } from "@/lib/types";

function wireframeLocation(id: keyof typeof WIREFRAME_FARM_BEARINGS, distanceKm: number) {
  return locationFromDistanceBearing(
    GYEONGBOKGUNG.lat,
    GYEONGBOKGUNG.lng,
    distanceKm,
    WIREFRAME_FARM_BEARINGS[id],
  );
}

const carrotReviews: Review[] = [
  {
    id: "cr1",
    farmId: "carrot",
    author: "김나미",
    rating: 5,
    content:
      "흙 묻은 당근을 담아주셨는데 향이 진짜 달랐어요. 시중에서 파는 것보다 훨씬 달고 아삭해서 아이가 날것으로도 잘 먹더라고요. 다음에도 또 구매할게요!",
    date: "2026.06.05",
    imageUrl: assets.reviews.carrot.r2,
  },
  {
    id: "cr2",
    farmId: "carrot",
    author: "박성우",
    rating: 5,
    content:
      "농부님이 용도 물어보시고 볶음용으로 적당한 크기로 골라주셨어요. 이런 세심함은 마트에선 절대 경험 못 하죠. 당근 특유의 흙냄새가 싱싱함을 증명해줬습니다.",
    date: "2026.06.01",
    imageUrl: assets.reviews.carrot.r1,
  },
];

const grapeReviews: Review[] = [
  {
    id: "gr1",
    farmId: "grape",
    author: "윤지호",
    rating: 5,
    content: "마트에서 사는 포도보다 훨씬 맛있네요. 신선도가 확실히 다릅니다.",
    date: "2026.06.04",
    imageUrl: assets.reviews.grape.r2,
  },
  {
    id: "gr2",
    farmId: "grape",
    author: "김서연",
    rating: 5,
    content: "포도 향이 진하고 달콤합니다. 생산자분 설명도 친절해서 만족했어요.",
    date: "2026.05.29",
    imageUrl: assets.reviews.grape.r1,
  },
];

const strawberryReviews: Review[] = [
  {
    id: "sr1",
    farmId: "strawberry",
    author: "김하은",
    rating: 5,
    content:
      "상자 열자마자 새콤달콤한 향이 온 집안에 가득 차네요~ 알도 크고 단단해서 무른 것 하나 없이 깨끗합니다. 다 먹으면 또 주문할게요",
    date: "2026.06.07",
    imageUrl: assets.reviews.strawberry.r2,
  },
  {
    id: "sr2",
    farmId: "strawberry",
    author: "이상미",
    rating: 5,
    content:
      "마트에 딸기가 없더라고요. 그래서 농장에서 직접 주문해 본 건데, 바로 따고 받은 거라 그런지 꼭지도 싱싱하고 달달하니 맛있네요. ^^",
    date: "2026.06.02",
    imageUrl: assets.reviews.strawberry.r1,
  },
];

const cornReviews: Review[] = [
  {
    id: "co-r1",
    farmId: "corn",
    author: "최지안",
    rating: 5,
    content: "삶아 먹으니 정말 달고 부드럽네요. 재구매 예정입니다.",
    date: "2026.06.06",
    imageUrl: assets.reviews.corn.r2,
  },
  {
    id: "co-r2",
    farmId: "corn",
    author: "박민재",
    rating: 5,
    content: "직접 보고 구매하니 품질 확인이 가능해서 안심이 됐어요.",
    date: "2026.05.31",
    imageUrl: assets.reviews.corn.r1,
  },
];

const potatoReviews: Review[] = [
  {
    id: "po-r1",
    farmId: "potato",
    author: "한소희",
    rating: 5,
    content:
      "갓 수확한 햇감자를 직접 받아오니까 신선도가 달라요. 사장님이 보관 방법도 알려주셔서 오래 두고 먹을 수 있었어요. 앞으로 매년 여기서 살 거예요.",
    date: "2026.06.03",
    imageUrl: assets.reviews.potato.r2,
  },
  {
    id: "po-r2",
    farmId: "potato",
    author: "박준혁",
    rating: 5,
    content:
      "직접 농사지으신 분한테 사니까 믿음이 가요. 어떤 토양인지, 비료는 어떻게 쓰는지 설명도 해주시고 너무 친절하셨어요. 감자도 실하고 맛있었습니다.",
    date: "2026.05.27",
    imageUrl: assets.reviews.potato.r1,
  },
];

const strawberryProducts: Product[] = [
  {
    id: "p1",
    farmId: "strawberry",
    name: "설향 딸기 (500g)",
    price: 8500,
    imageUrl: assets.products.strawberry500,
  },
  {
    id: "p2",
    farmId: "strawberry",
    name: "설향 딸기 (1kg)",
    price: 14500,
    imageUrl: assets.products.strawberry1kg,
  },
  {
    id: "p3",
    farmId: "strawberry",
    name: "딸기 선물세트 (750g)",
    price: 16900,
    imageUrl: assets.products.strawberryGift,
  },
];

export const FARMS: Farm[] = [
  {
    id: "carrot",
    name: "수비니비니 당근당근",
    distanceKm: 1.2,
    rating: 5.0,
    reviewCount: 2,
    thumbnailUrl: assets.farms.carrot,
    mapMarkerUrl: assets.mapMarkers.carrot,
    isOrganic: true,
    pickupLocation: "서울 성동구 성수동",
    address: "경기도 광주시 남종면 당근리",
    phone: "010-2222-2222",
    heroImageUrl: assets.farms.carrot,
    heroImages: [assets.farms.carrot, assets.certificates.carrot],
    profileImageUrl: assets.farmerProfile,
    roadviewImageUrl: assets.farmRoadview,
    description:
      "햇살 가득한 밭에서 정성껏 키운 당근을 소개합니다. 아이들도 안심하고 먹을 수 있는 유기농 당근입니다.",
    location: wireframeLocation("carrot", 1.2),
    mapMarker: { top: "58.5%", left: "45.0%", emoji: "🥕" },
    products: [
      {
        id: "c1",
        farmId: "carrot",
        name: "유기농 당근 (1kg)",
        price: 5900,
        imageUrl: assets.farms.carrot,
      },
    ],
    reviews: carrotReviews,
  },
  {
    id: "grape",
    name: "은순이네 포도 천국",
    distanceKm: 2.2,
    rating: 5.0,
    reviewCount: 2,
    thumbnailUrl: assets.farms.grape,
    mapMarkerUrl: assets.mapMarkers.grape,
    pickupLocation: "서울 마포구 연남동",
    address: "경기도 이천시 포도마을",
    phone: "010-3333-3333",
    heroImageUrl: assets.farms.grape,
    heroImages: [assets.farms.grape, assets.certificates.grape],
    profileImageUrl: assets.farmerProfile,
    roadviewImageUrl: assets.farmRoadview,
    description: "가족이 함께 키운 포도를 만나보세요. 당도 높은 포도가 자랑입니다.",
    location: wireframeLocation("grape", 2.2),
    mapMarker: { top: "39.4%", left: "19.3%", emoji: "🍇" },
    products: [
      {
        id: "g1",
        farmId: "grape",
        name: "샤인머스캣 (500g)",
        price: 12000,
        imageUrl: assets.farms.grape,
      },
    ],
    reviews: grapeReviews,
  },
  {
    id: "strawberry",
    name: "효연이가 키운 딸기",
    distanceKm: 2.4,
    rating: 5.0,
    reviewCount: 2,
    thumbnailUrl: assets.farms.strawberry,
    mapMarkerUrl: assets.mapMarkers.strawberry,
    isOrganic: true,
    pickupLocation: "서울 성동구 왕십리2동",
    address: "경기도 광주시 남종면 금사리",
    phone: "010-1111-1111",
    heroImageUrl: assets.storeHero,
    heroImages: [
      assets.storeHero,
      assets.farms.strawberry,
      assets.products.strawberryGift,
      assets.certificates.strawberry,
    ],
    profileImageUrl: assets.farmerProfile,
    roadviewImageUrl: assets.farmRoadview,
    description:
      "안녕하세요, 저희 농장에 오신 걸 환영합니다\n따사로운 햇살 아래, 저희 가족이 정성껏 키운 딸기를 소개합니다.\n\n저는 이 땅에서 20년 넘게 딸기를 재배해온 농부입니다.\n농약 한 방울 없이, 오직 건강한 흙과 맑은 물, 그리고 부지런한 손길만으로 딸기를 키웁니다.\n아이들이 밭에서 바로 따서 먹어도 걱정 없는 딸기, 그게 저희 농장의 자랑입니다.\n\n올 한 해도 저희 농장 딸기를 사랑해 주셔서 고맙습니다.",
    location: wireframeLocation("strawberry", 2.4),
    mapMarker: { top: "44.6%", left: "75.1%", emoji: "🍓" },
    products: strawberryProducts,
    reviews: strawberryReviews,
  },
  {
    id: "corn",
    name: "윤경의 옥수수밭",
    distanceKm: 3.0,
    rating: 5.0,
    reviewCount: 2,
    thumbnailUrl: assets.farms.corn,
    mapMarkerUrl: assets.mapMarkers.corn,
    isOrganic: true,
    pickupLocation: "서울 용산구 이태원동",
    address: "충청남도 아산시 옥수수마을",
    phone: "010-4444-4444",
    heroImageUrl: assets.farms.corn,
    heroImages: [assets.farms.corn, assets.certificates.corn],
    profileImageUrl: assets.farmerProfile,
    roadviewImageUrl: assets.farmRoadview,
    description: "아침에 수확한 옥수수를 바로 만나보세요.",
    location: wireframeLocation("corn", 3.0),
    mapMarker: { top: "10.4%", left: "44.2%", emoji: "🌽" },
    products: [
      {
        id: "co1",
        farmId: "corn",
        name: "당일 수확 옥수수 (5개)",
        price: 7000,
        imageUrl: assets.farms.corn,
      },
    ],
    reviews: cornReviews,
  },
  {
    id: "potato",
    name: "예준이의 눈을 감자",
    distanceKm: 5.0,
    rating: 5.0,
    reviewCount: 2,
    thumbnailUrl: assets.farms.potato,
    mapMarkerUrl: assets.mapMarkers.potato,
    pickupLocation: "서울 은평구 불광동",
    address: "강원도 평창군 감자마을",
    phone: "010-5555-5555",
    heroImageUrl: assets.farms.potato,
    heroImages: [assets.farms.potato, assets.certificates.potato],
    profileImageUrl: assets.farmerProfile,
    roadviewImageUrl: assets.farmRoadview,
    description: "고랭지에서 자란 포슬포슬한 감자를 소개합니다.",
    location: wireframeLocation("potato", 5.0),
    mapMarker: { top: "0%", left: "10.5%", emoji: "🥔" },
    products: [
      {
        id: "po1",
        farmId: "potato",
        name: "감자 (2kg)",
        price: 6500,
        imageUrl: assets.farms.potato,
      },
    ],
    reviews: potatoReviews,
  },
];

export function getFarmById(id: string): Farm | undefined {
  return FARMS.find((farm) => farm.id === id);
}

export function getProductById(productId: string): Product | undefined {
  for (const farm of FARMS) {
    const product = farm.products.find((item) => item.id === productId);
    if (product) return product;
  }
  return undefined;
}

export function isFarmId(id: string): id is FarmId {
  return FARMS.some((farm) => farm.id === id);
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}
