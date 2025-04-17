import * as categories from "./categories-controller.js";
import * as products from "./products-controller.js";
import * as checkout from "./checkout-controller.js";
import * as orders from "./orders-controller.js";
import * as users from "./users-controller.js";
import * as auth from "./auth-controller.js";

const controllers = {
  categories,
  products,
  orders,
  users,
  checkout,
  auth,
};
export default controllers;