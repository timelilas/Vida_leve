import { FoodProps } from "../../@core/entities/food/type";
import { HttpService } from "../HttpService";
import { HttpSearchFoodsInputDTO } from "./types";

export class HttpFoodService extends HttpService {
  public async searchFoods(params: HttpSearchFoodsInputDTO) {
    const { name, limit, offset } = params;

    return await this.submit<{ foods: FoodProps[]; hasMore: boolean }>({
      method: "GET",
      path: `/foods?name=${name}&limit=${limit}&offset=${offset}`
    });
  }
}
