import Pocketbase, { AuthModel } from "pocketbase";
import endpoints from "./endpoints.json";
import storage from "./storage";

export interface StoredAuth {
  token: string;
  model: AuthModel;
}

const pb = new Pocketbase(endpoints.pocketbase);

pb.autoCancellation(false);

pb.authStore.onChange((token, model) => {
  storage.save({ key: "auth", data: { token, model } as StoredAuth, expires: 1209600000 });
});

export default pb;
