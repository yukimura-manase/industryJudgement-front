/**
 * NOTE: ブランド親和性の Test DataSet
 * => 基本構造
 */
const brandAffinityObject = {
  insta_id: "robo_tamachan12", // 親和性の解析対象となる Supporter の Insta_id
  brand_name: "ロボ玉", // ブランド名
  brand_insta_id: "Robotama", // ブランドの Insta_id
  brand_network_score: 0.3158, // 数値が、高いほど親和性が強い
  brand_logo_name: "Robotama", // ブランドの Logo・Name
  brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
  parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
};

export const brandImageSrcObject = {
  Robotama:
    "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  Haktou:
    "https://photos.fife.usercontent.google.com/pw/ADCreHfRxg5Ega8mmYFWUQFfTxTfCS-57sKoJSFgJUARzS7qTppctgFfUrqPvg=w318-h239-no?authuser=0",
  Momo: "https://photos.fife.usercontent.google.com/pgc/AF1QipNKDoqiMkHF6OlfdEC4sEHbbYFlkZrVawTUvNUW=w2650-h1988-s-no?authuser=0",
  Maritama:
    "https://lh3.googleusercontent.com/pw/ADCreHdGj5HP6wjTn_70S1G8Hx9YXVe1tQjcB7TKQzuAYZ-b2b8AdB1T7DctrpKbHp_QrWDh3ael6M73DxFdA0Ay02xrvJmKk5tvV2cgon1MiYHsBTASAwj2FeooLW-g8YU69DYL-FBccx3gCcD6z7EXp0cDPD-QuDB4nm_Z0clD7zhN0KJl2ncyIqqXcS_1U5KYUQshXZeiqX5P_t9p10cnxdyZSJZjtZn44dqjaBN8F-upxGFN6aOoYFtgLS7ZKXySSu9Pq-u9YwVyK7FiACE0GWPlZJIRu2QQW8hW_tV66X1MoC8kAMZ-c7AhIWa6FLlptLTMRtfx7upglnkcqznZZrcwtGrK2gT1HIK9I2HoMStIcWcLR71GKa38HJiFVQBxIMkR9FUF0bFuE3CYig8fwbBLn-JzOb4qMtLXkXLONyJJLJe4ZtcdlGK1_AZthyWrWpVIvtdPeYsnJqPZQ8eQ3XdMsDfphJ0s3vuAH6NoLpIlAyYfkvpFSTxqNQJHXeAL_TZM2UjUVZtsiI6PhlrrGjeyTh_JNShZTUN5rJXBplP7xvEbRAVRZUnZRKp0rJVw0szCUcLj4TXXcnF6eUN0G5Z0pOC24liwe5tB-E9sIfM0FuUMpvcG8QkcndMxp_-OmW4d92_TejrFd1rXHkgmGTx78-La1cfx2njh9c0trysuVbWzqpph6YlLqmx_ztyLtslWs4vSY_9r5gkfUp3H04N5b4GxWhcxwHKQKeNS0GMdDFDXN0-ghF2XciEuHOTzRvylAJSXKHI-q2O_-HATP7VsPvWRQbwjXDZ1WQ1TB3Z2HEnVEwrWrJpyHqxNllJLiyiUTFCGc_zMyQ9tI42cXamf5ETOACD9pocfoM5ea9jqRnmKHOo7XRqWUftyci8YCIdIUhLoK6C1QgR2RStIwRsVK0D-jpvbLVX0G0BVycDtR4QrAEL7io2SWLz49KeI=w1492-h1988-s-no?authuser=0",
  Purutama:
    "https://lh3.googleusercontent.com/pw/ADCreHe4AwETzfVWSjUFey0KP3ul0-y2CYw4LT6Ha0qIbZFxQnUMx5TrCVc84ZA78FtnvsDxNEKxDrKN5f4bthGKKDblVYkAgv1gvpdmoCI23U8PzbcCUObaJ8i1XqbXUa3a3YM4nIM47AdwlDeprVjir-1HuoyMHGO8s2yudmz5WsfRBGNbxkXNKqmnIycLF5Q5r_Gai8c2jydkO2i0bkZddiD29nigR1sikl6cUMwG7zo392FbY5dcVDA2COUk8RpsLCNriGJViq0743d-clRiX_Pr2HZrK-L6Cl-VHprClKYSftgB29UdVMPnE49p-ZtwVyT1TGMNJSlQm-lGWbUAhmylhJA5v3WPVq-mtMqD41NFa7CIT2qcR1JXMJ4LlgnosjWrZvXdSq-ZLCNrBmZmQPHUJWqLZTG1Efkr2-N6BGGA7lc5bx8pItMxgd08ikPi8KkEF9bVXKt10305km9w74jhZ_Ldrl8P5nbCl25_RUnYaFEpWi2Xawzzm-jFvj2wrQQnAPz51xru-xIMJgRmDgeyCTDWkif2ZlIU935aYn0JZsQ0GIKdMyYmc3lXIII3Japn3lP1WsV7N46O-WNNP5B2q-yOu_i-CPMAtV9A-atuN2Gr-7hecpkRulqJ5qklZM984riYPeGmdpbaIIDodPPGZgkgTDVo-ySAFpEVl33jrm5FCQvdgTqzVKDvfodKDU9_v5P-Y06YH78URQSiQw3XutRB0o3ErBTpCjjXQPWRMwpoYWkrsWoQ5_zqFZUClZ4AjpkKG_xxqDOzRlIum-jPam-Tqiv4S1V68-yOdp4YNe-s0YMH-wb4kBEBcTFy_sI5FwNgsrg8XYe9GbORAKr3PDT7tbuqT61NT9Mk6SWU3i18GnZXUdILrqrOvlbqJX2UbTPL0thJoEHhAduaM1k0eoUUTtEC6e6EAxSevpiNkbcy2bi_7hMUCzQF_lK-=w1492-h1988-s-no?authuser=0",
};

/**
 * ブランド親和性の Test Data List
 * => 第一階層: 5つ
 * => 第二階層: 5つ
 * => 第一階層・1つ + 第二階層・5つ で構成される 6つの Node・Set
 * => Node・Set(6つ) ✖️ 5
 * => 合計: 30個の DataSet
 */
export const brandAffinityList = [
  // ---------------------- Set 1 ------------------------
  {
    insta_id: "robo_tamachan12", // 親和性の解析対象となる Supporter の Insta_id
    brand_name: "ロボ玉", // ブランド名
    brand_insta_id: "Robotama", // ブランドの Insta_id
    brand_network_score: 0.3158, // 数値が、高いほど親和性が強い
    brand_logo_name: "Robotama", // ブランドの Logo・Name
    brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
    parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ロボ玉_1",
    brand_insta_id: "Robotama_1",
    brand_network_score: 0.5,
    brand_logo_name: "Robotama_1",
    brand_network_attr: 2,
    parent_brand: "Robotama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ロボ玉_2",
    brand_insta_id: "Robotama_2",
    brand_network_score: 0.5,
    brand_logo_name: "Robotama_2",
    brand_network_attr: 2,
    parent_brand: "Robotama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ロボ玉_3",
    brand_insta_id: "Robotama_3",
    brand_network_score: 0.5,
    brand_logo_name: "Robotama_3",
    brand_network_attr: 2,
    parent_brand: "Robotama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ロボ玉_4",
    brand_insta_id: "Robotama_4",
    brand_network_score: 0.5,
    brand_logo_name: "Robotama_4",
    brand_network_attr: 2,
    parent_brand: "Robotama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ロボ玉_5",
    brand_insta_id: "Robotama_5",
    brand_network_score: 0.5,
    brand_logo_name: "Robotama_5",
    brand_network_attr: 2,
    parent_brand: "Robotama",
  },
  // ---------------------- Set 2 ------------------------
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん",
    brand_insta_id: "Hakutou",
    brand_network_score: 1, // 数値が、高いほど親和性が強い
    brand_logo_name: "白桃さん",
    brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
    parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん_1",
    brand_insta_id: "Hakutou_1",
    brand_network_score: 0.5,
    brand_logo_name: "白桃さん_1",
    brand_network_attr: 2,
    parent_brand: "Hakutou",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん_2",
    brand_insta_id: "Hakutou_2",
    brand_network_score: 0.5,
    brand_logo_name: "白桃さん_2",
    brand_network_attr: 2,
    parent_brand: "Hakutou",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん_3",
    brand_insta_id: "Hakutou_3",
    brand_network_score: 0.5,
    brand_logo_name: "白桃さん_3",
    brand_network_attr: 2,
    parent_brand: "Hakutou",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん_4",
    brand_insta_id: "Hakutou_4",
    brand_network_score: 0.5,
    brand_logo_name: "白桃さん_4",
    brand_network_attr: 2,
    parent_brand: "Hakutou",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "白桃さん_5",
    brand_insta_id: "Hakutou_5",
    brand_network_score: 0.5,
    brand_logo_name: "白桃さん_5",
    brand_network_attr: 2,
    parent_brand: "Hakutou",
  },
  // ---------------------- Set 3 ------------------------
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん",
    brand_insta_id: "Momo",
    brand_network_score: 0.8, // 数値が、高いほど親和性が強い
    brand_logo_name: "Momo",
    brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
    parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん_1",
    brand_insta_id: "Momo_1",
    brand_network_score: 0.3,
    brand_logo_name: "Momo_1",
    brand_network_attr: 2,
    parent_brand: "Momo",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん_2",
    brand_insta_id: "Momo_2",
    brand_network_score: 0.3,
    brand_logo_name: "Momo_2",
    brand_network_attr: 2,
    parent_brand: "Momo",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん_3",
    brand_insta_id: "Momo_3",
    brand_network_score: 0.3,
    brand_logo_name: "Momo_3",
    brand_network_attr: 2,
    parent_brand: "Momo",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん_4",
    brand_insta_id: "Momo_4",
    brand_network_score: 0.3,
    brand_logo_name: "Momo_4",
    brand_network_attr: 2,
    parent_brand: "Momo",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ももたん_5",
    brand_insta_id: "Momo_5",
    brand_network_score: 0.3,
    brand_logo_name: "Momo_5",
    brand_network_attr: 2,
    parent_brand: "Momo",
  },
  // ---------------------- Set 4 ------------------------
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama",
    brand_network_score: 1, // 数値が、高いほど親和性が強い
    brand_logo_name: "Maritama",
    brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
    parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama_1",
    brand_network_score: 0.2,
    brand_logo_name: "Maritama_1",
    brand_network_attr: 2,
    parent_brand: "Maritama_1",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama_2",
    brand_network_score: 0.2,
    brand_logo_name: "Maritama_2",
    brand_network_attr: 2,
    parent_brand: "Maritama_2",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama_3",
    brand_network_score: 0.2,
    brand_logo_name: "Maritama_3",
    brand_network_attr: 2,
    parent_brand: "Maritama_3",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama_4",
    brand_network_score: 0.2,
    brand_logo_name: "Maritama_4",
    brand_network_attr: 2,
    parent_brand: "Maritama_4",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "まり玉",
    brand_insta_id: "Maritama_5",
    brand_network_score: 0.2,
    brand_logo_name: "Maritama_5",
    brand_network_attr: 2,
    parent_brand: "Maritama_5",
  },
  // ---------------------- Set 5 ------------------------
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま",
    brand_insta_id: "Purutama",
    brand_network_score: 1, // 数値が、高いほど親和性が強い
    brand_logo_name: "Purutama",
    brand_network_attr: 1, // attr = 1 親ブランド、 = 2  が子供ブランド
    parent_brand: null, // 親ブランドの Insta_id (brand_insta_id) or null(第一階層の場合)
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま_1",
    brand_insta_id: "Purutama_1",
    brand_network_score: 0.5,
    brand_logo_name: "Purutama_1",
    brand_network_attr: 2,
    parent_brand: "Purutama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま_2",
    brand_insta_id: "Purutama_2",
    brand_network_score: 0.5,
    brand_logo_name: "Purutama_2",
    brand_network_attr: 2,
    parent_brand: "Purutama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま_3",
    brand_insta_id: "Purutama_3",
    brand_network_score: 0.5,
    brand_logo_name: "Purutama_3",
    brand_network_attr: 2,
    parent_brand: "Purutama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま_4",
    brand_insta_id: "Purutama_4",
    brand_network_score: 0.5,
    brand_logo_name: "Purutama_4",
    brand_network_attr: 2,
    parent_brand: "Purutama",
  },
  {
    insta_id: "robo_tamachan12",
    brand_name: "ぷるたま_5",
    brand_insta_id: "Purutama_5",
    brand_network_score: 0.5,
    brand_logo_name: "Purutama_5",
    brand_network_attr: 2,
    parent_brand: "Purutama",
  },
  // ---------------------- Fin ------------------------
];
