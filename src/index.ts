import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = document.getElementById("app");

if (app) {
  const button = document.createElement("button");
  button.className = "btn btn-success m-3";
  button.textContent = "Bootstrap works!";
  app.append(button);
}
