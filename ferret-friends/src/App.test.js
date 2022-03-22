import {
  createUser,
  checkWater,
  checkFertilizer,
  updateWater
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

test("set water amount", async () => {
  let user = await createUser("name");
  await updateWater(user, 5)
  let waterAmount = await checkWater(user)
  expect(waterAmount).toBe(5);
});



//No way to test the buttons because it isn't connected to the database yet