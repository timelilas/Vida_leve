import {
  HttpGetUserProfileOutputDTO,
  HttpSetProfileImageInputDTO,
  HttpSetProfileImageOutputDTO,
  HttpUpdateUserProfileInputDTO,
  HttpUpdateUserProfileOutputDTO
} from "./types";
import { HttpService } from "../HttpService";
import { STORAGE_ACCESS_TOKEN } from "../../constants/localStorageConstants";
import { SecureStorage } from "../secureStorage/SecureStorage";

export class HttpUserService extends HttpService {
  public async updateProfile(params: HttpUpdateUserProfileInputDTO) {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpUpdateUserProfileOutputDTO>({
      method: "PUT",
      path: "/users/profile",
      body: params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  public async getProfile() {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpGetUserProfileOutputDTO>({
      method: "GET",
      path: "/users/profile",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  public async deleteProfileImage() {
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    return await this.submit<HttpGetUserProfileOutputDTO>({
      method: "DELETE",
      path: "/users/profile/image",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  public async setProfileImage(params: HttpSetProfileImageInputDTO) {
    const { name, uri, type } = params;
    const accessToken = await SecureStorage.getItem(STORAGE_ACCESS_TOKEN);

    const formData = new FormData();
    formData.append("file", { uri, name, type } as any);

    return await this.submit<HttpSetProfileImageOutputDTO>({
      method: "POST",
      path: "/users/profile/image",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  }
}
