import Pocketbase from "pocketbase";
import endpoints from "./endpoints.json";
import storage from "./storage";

const pb = new Pocketbase(endpoints.pocketbase);

pb.autoCancellation(false);

pb.authStore.onChange((token, model) => {
  storage.save({ key: "auth", data: { token, model }, expires: 1209600000 });
});

export default pb;
