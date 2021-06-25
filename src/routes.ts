import { Router } from "express"

import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { LisTagsController } from "./controllers/ListTagsController"
import { ListUsersController } from "./controllers/ListUsersController"

const routes = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new LisTagsController()
const listUsersController = new ListUsersController()

routes.post("/users", createUserController.handle)
routes.post("/session", authenticateUserController.handle)

routes.use(ensureAuthenticated)

routes.get("/users", listUsersController.handle)

routes.post(
  "/tags",
  ensureAdmin, 
  createTagController.handle)

routes.get("/tags", listTagsController.handle)

routes.post(
  "/compliments", 
  ensureAuthenticated,
  createComplimentController.handle)

routes.get(
  "/users/compliments/send", 
  listUserSendComplimentsController.handle )

routes.get(
  "/users/compliments/receive", 
  listUserReceiveComplimentsController.handle)



export { routes }