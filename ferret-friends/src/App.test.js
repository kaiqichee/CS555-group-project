import {
  createUser,
  checkWater,
  checkFertilizer,
} from "../db/users";

test("water amount", async () => {
  let user = await createUser("name");
  let waterAmount = await checkWater(user)
  expect(waterAmount).toBe(0);
});

test("fertilizer amount", async () => {
  let user = await createUser("name");
  let fertilizerAmount = await checkFertilizer(user)
  expect(fertilizerAmount).toBe(0);
});
