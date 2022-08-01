export const data1Prure = [
  {
    brandName: "3ce",
    countProductShopee: 8.333333333333332,
    countProductLazada: 2.5,
  },
  { brandName: "kiko milano", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "rom&nd", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "bbia",
    countProductShopee: 8.333333333333332,
    countProductLazada: 5,
  },
  {
    brandName: "merzy",
    countProductShopee: 3.3333333333333335,
    countProductLazada: 2.5,
  },
  {
    brandName: "perfect diary",
    countProductShopee: 1.6666666666666667,
    countProductLazada: 0,
  },
  { brandName: "black rouge", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "dolly cosmetics",
    countProductShopee: 0,
    countProductLazada: 0,
  },
  { brandName: "lip on lip", countProductShopee: 0, countProductLazada: 5 },
  { brandName: "m.a.c", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "100% pure", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "o.two.o",
    countProductShopee: 1.6666666666666667,
    countProductLazada: 0,
  },
  { brandName: "focallure", countProductShopee: 5, countProductLazada: 0 },
  { brandName: "cezanne", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "her orange", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "l'oreal paris", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "pat mcgrath", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "fenty beauty", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "maybelline",
    countProductShopee: 1.6666666666666667,
    countProductLazada: 0,
  },
  { brandName: "miracle apo", countProductShopee: 0, countProductLazada: 5 },
  {
    brandName: "mini garden",
    countProductShopee: 6.666666666666667,
    countProductLazada: 2.5,
  },
  { brandName: "hkho", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "beautybigbang", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "lameila",
    countProductShopee: 6.666666666666667,
    countProductLazada: 2.5,
  },
  { brandName: "gecomo", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "kimuse", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "dragonranee", countProductShopee: 0, countProductLazada: 0 },
  { brandName: "mac", countProductShopee: 0, countProductLazada: 2.5 },
  {
    brandName: "romand",
    countProductShopee: 1.6666666666666667,
    countProductLazada: 0,
  },
  { brandName: "voem", countProductShopee: 0, countProductLazada: 0 },
  {
    brandName: "seimy",
    countProductShopee: 1.6666666666666667,
    countProductLazada: 0,
  },
  { brandName: "g9skin", countProductShopee: 0, countProductLazada: 2.5 },
].filter((el) => {
  if (!!el.countProductLazada || !!el.countProductShopee) return true;
  else return false;
});

let totalProudctShopee = 0;
let totalProudctLazada = 0;
data1Prure.map((e) => {
  totalProudctShopee += e.countProductShopee;
  totalProudctLazada += e.countProductLazada;
  return "";
});

export const data1 = [
  ...data1Prure,
  {
    brandName: "No brand",
    countProductShopee: ((60 - totalProudctShopee) / 60) * 100,
    countProductLazada: ((40 - totalProudctLazada) / 40) * 100,
  },
];
