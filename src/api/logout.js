import history from "../history";

export default () => {
  localStorage.removeItem("token");
  history.replace("/login");
};
