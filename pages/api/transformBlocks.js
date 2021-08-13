import { transformBlocks } from "../../helpers/backend";

export default async function transformBlocksAPI(req, res) {
  const body = JSON.parse(req.body)
  if (body) {
    try {
      const response = await transformBlocks(body);
      res.status(200).json({data: JSON.stringify(response)})
    } catch (error) {
      res.status(500).json({message: "Ошибка обработки блоков", error})
    }    
  } else res.status(500).end('body not found');
}