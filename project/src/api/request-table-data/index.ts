import Joi from "joi"

import { NetworkManager } from "../../utils/network-manager"
import { tableData } from "./table-data";


interface Item {
  id: string
  title: string
  additionalInfo: string
  baked: string
  expires: string
  tags: string[]
  comments: string
  created: string
  updated: string
  author: string
  lastEditor: string
}

interface TableData {
  totalCount: number;
  items: Item[]
}

export const requestTableData = async () => {
  const networkManager = NetworkManager.init()
  let response = await networkManager.get({ path: "/some-path" });

  const responseSchema = Joi.object({
    totalCount: Joi.number().required(),
    items: Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
        title: Joi.string().required(),
        additionalInfo: Joi.string().required(),
        baked: Joi.string().required(),
        expires: Joi.string().required(),
        tags: Joi.array().items(
          Joi.string().required()
        ).required(),
        comments: Joi.string().allow("", null).required(),
        created: Joi.string().required(),
        updated: Joi.string().required(),
        author: Joi.string().required(),
        lastEditor: Joi.string().required()
      }).required()
    ).required()
  })

  try {
    response = await responseSchema.validateAsync(tableData);
    console.log("response: ", response)
    return response as TableData;
  } catch (error) {
    console.error(error)
    throw error;
  }
}