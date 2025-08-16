import { deleteImage } from "./deleteImage";
import { getUser } from "./getUser";
import { updateImage } from "./updateImage";
import { updateUser } from "./updateUser";

export const userPaths = {
  "/users/profile": { get: getUser, put: updateUser },
  "/users/profile/image": { post: updateImage, delete: deleteImage },
};
