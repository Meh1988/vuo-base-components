import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store"
import { ChannelUser } from "./WebSocketStore";

class SessionDataStore {
  token?: string = undefined;
  shadowAccount: boolean = false
  username: string = ""
  user?: ChannelUser = undefined;
  profile: any = undefined; //TODO type check

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    await makePersistable(this, {
      name: "SessionDataStore",
      properties: ["token", "shadowAccount", "username", "user"],
      storage: window.localStorage,
    });
  }

  clearStore() {
    this.token = undefined;
    this.shadowAccount = false;
    this.username = "";
    this.user = undefined;
    this.profile = undefined;
  }
}

const sessionDataStore = new SessionDataStore()
export default sessionDataStore