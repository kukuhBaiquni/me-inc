import { ls } from "./LocalStorage";

class Authorization {

  constructor() {
    this.authUser = null;
  }

  setAuthUser() {
    this.authUser = JSON.parse(ls.getItem("auth_user"));
  }

  isLoggedIn() {
    return typeof ls.getItem("auth_user") === "string";
  }

  redirectAfterLogin(props) {
    props.navigate("/dashboard");
  }

  getAuthUser() {
    if (this.isLoggedIn() && !this.authUser) {
      this.setAuthUser();
    }

    return this.authUser;
  }

  getAccessToken() {
    const authUser = this.getAuthUser();
    return authUser && typeof authUser.token === "string" ? authUser.token : null;
  }

  login(data) {
    if (typeof Storage !== "undefined") {
      ls.removeItem("auth_user");
      ls.setItem("auth_user", JSON.stringify(data));
    } else {
      console.error("local storage is not supported");
    }
  }

  logout() {
    if (typeof Storage !== "undefined") {
      ls.removeItem("auth_user");
      this.authUser = null;
    } else {
      console.error("local storage is not supported");
    }
  }
}

export default new Authorization();
