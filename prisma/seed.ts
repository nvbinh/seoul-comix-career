// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Create categories
  await prisma.category.createMany({
    data: [
      { value: "SUSHI", text: "스시·해산물" },
      { value: "UNAGI", text: "장어" },
      { value: "TEMPURA", text: "덴푸라" },
      { value: "TONKATSU", text: "돈카츠·쿠시카츠" },
      { value: "YAKITORI", text: "야키토리·꼬치" },
      { value: "SUKIYAKI", text: "스키야키·샤브샤브" },
      { value: "SOBA", text: "소바·우동" },
      { value: "RAMEN", text: "라멘·츠케멘" },
      { value: "YAKISOBA", text: "야키소바" },
      { value: "OKONOMIYAKI", text: "오코노미야키·타코야키" },
      { value: "DONBURI", text: "덮밥" },
      { value: "ODEN", text: "오뎅" },
      { value: "KAISEKI", text: "가이세키·일식" },
      { value: "HAMBAGU", text: "함바그·오므라이스" },
      { value: "TEPPANYAKI", text: "스테이크·철판요리" },
      { value: "CURRY", text: "카레" },
      { value: "YAKINIKU", text: "야키니쿠·호르몬" },
      { value: "NABE", text: "나베" },
      { value: "CAFE", text: "카페·디저트" },
      { value: "IZAKAYA", text: "이자카야·바" },
      { value: "OTHER", text: "기타 일본 음식" },
    ],
  });

  // Create featured items
  await prisma.featured.createMany({
    data: [
      { text: "나카노시마×야키토리 상위 맛집", icon: "stars-02" },
      { text: "도쿄의 상위 스시 맛집", icon: "stars-02" },
      { text: "교토의 라멘 명소", icon: "stars-02" },
      { text: "나고야 최고의 텐푸라집", icon: "stars-02" },
      { text: "후쿠오카 우동 맛집", icon: "stars-02" },
      { text: "오사카 야키토리 숨은 맛집", icon: "stars-02" },
      { text: "삿포로 스시 맛집", icon: "stars-02" },
      { text: "히로시마 라멘 추천", icon: "stars-02" },
      { text: "요코하마 텐푸라 추천", icon: "stars-02" },
      { text: "고베 우동 맛집", icon: "stars-02" },

    ],
  });

  // Retrieve categories and create a map dynamically
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c: { value: string; id: string; }) => [c.value, c.id]));

  // Retrieve featured items and create a map dynamically
  const featured = await prisma.featured.findMany();
  const featuredMap = Object.fromEntries(featured.map((f: { text: string; id: string; }) => [f.text, f.id]));

  // https://picsum.photos/seed/picsum/400/300

  const restaurantData = [
    {
        "rating": 4.2,
        "rating_count": 139,
        "category": "YAKITORI",
        "city": "osaka",
        "desc": "최고급 오마카세를 합리적인 가격에 무제한 사케와 함께 즐길 수 있는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/id/237/400/300",
            "https://picsum.photos/id/1/400/300"
        ],
        "name": "카구라자카 이시카와 스시하루 나카노시마 스시야 카구라자카 이시카와 스시하루 나카노시마 스시야",
        "price_range": "3~5",
        "featured": "나카노시마×야키토리 상위 맛집",
        "isFavorite": true
    },
    {
        "rating": 4.5,
        "rating_count": 200,
        "category": "SUSHI",
        "city": "tokyo",
        "desc": "신선한 해산물과 정통 스시를 제공하는",
        "images": [
            "https://picsum.photos/id/237/400/300",
        ],
        "name": "스시 긴자 이시카와",
        "price_range": "4~6",
        "featured": "도쿄의 상위 스시 맛집",
        "isFavorite": false
    },
    {
        "rating": 4.7,
        "rating_count": 180,
        "category": "RAMEN",
        "city": "kyoto",
        "desc": "진한 국물과 다양한 토핑을 자랑하는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "라멘 이치란",
        "price_range": "2~4",
        "featured": "교토의 라멘 명소",
        "isFavorite": true
    },
    {
        "rating": 4.3,
        "rating_count": 220,
        "category": "TEMPURA",
        "city": "nagoya",
        "desc": "바삭한 텐푸라를 맛볼 수 있는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "텐푸라 마츠야",
        "price_range": "3~5",
        "featured": "나고야 최고의 텐푸라집",
        "isFavorite": false
    },
    {
        "rating": 4.6,
        "rating_count": 190,
        "category": "SOBA",
        "city": "fukuoka",
        "desc": "쫄깃한 면발과 진한 육수를 자랑하는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "우동 타로",
        "price_range": "2~4",
        "featured": "후쿠오카 우동 맛집",
        "isFavorite": true
    },
    {
        "rating": 4.1,
        "rating_count": 160,
        "category": "YAKITORI",
        "city": "osaka",
        "desc": "맛있고 저렴한 야키토리 전문점",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "야키토리 하치베",
        "price_range": "1~3",
        "featured": "오사카 야키토리 숨은 맛집",
        "isFavorite": false
    },
    {
        "rating": 4.8,
        "rating_count": 250,
        "category": "SUSHI",
        "city": "sapporo",
        "desc": "신선한 해산물로 만든 정통 스시를 즐길 수 있는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "스시 사토",
        "price_range": "4~6",
        "featured": "삿포로 스시 맛집",
        "isFavorite": true
    },
    {
        "rating": 4.4,
        "rating_count": 170,
        "category": "RAMEN",
        "city": "hiroshima",
        "desc": "깊은 맛의 국물과 탱탱한 면발을 자랑하는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "라멘 타츠야",
        "price_range": "2~4",
        "featured": "히로시마 라멘 추천",
        "isFavorite": false
    },
    {
        "rating": 4.9,
        "rating_count": 300,
        "category": "TEMPURA",
        "city": "yokohama",
        "desc": "고급스러운 텐푸라를 제공하는",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "텐푸라 야마구치",
        "price_range": "5~7",
        "featured": "요코하마 텐푸라 추천",
        "isFavorite": true
    },
    {
        "rating": 4.0,
        "rating_count": 150,
        "category": "SOBA",
        "city": "kobe",
        "desc": "담백한 국물과 쫄깃한 면발이 일품인",
        "images": [
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300",
            "https://picsum.photos/seed/picsum/400/300"
        ],
        "name": "우동 가게야마",
        "price_range": "2~4",
        "featured": "고베 우동 맛집",
        "isFavorite": false
    }
  ];

  await prisma.restaurant.createMany({
    data: restaurantData.map((restaurant) => ({
      rating: restaurant.rating,
      rating_count: restaurant.rating_count,
      city: restaurant.city,
      desc: restaurant.desc,
      images: restaurant.images,
      name: restaurant.name,
      price_range: restaurant.price_range,
      isFavorite: restaurant.isFavorite,
      categoryId: categoryMap[restaurant.category] || categoryMap["SOBA"], // Assign categoryId dynamically
      featuredId: featuredMap[restaurant.featured] || featuredMap["고베 우동 맛집"], // Assign featuredId dynamically
    })),
  });

  console.log("Seed data added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
