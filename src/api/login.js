import history from "../history";

export default token => {
  localStorage.setItem("token", token);
  history.replace("/");
};
