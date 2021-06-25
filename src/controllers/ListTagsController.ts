import { Response, Request } from "express"
import { ListTagsService } from "../services/ListTagsService"


class LisTagsController {
  async handle (request: Request, response:Response) {
    const listTagsService = new ListTagsService()

    const tags = await listTagsService.execute()

    return response.json(tags)
  }
}

export { LisTagsController }