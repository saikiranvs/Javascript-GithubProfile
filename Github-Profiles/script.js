const APIURL = "https://api.github.com/users/";

const formElement = document.querySelector("#form");
const mainElement = document.querySelector("#main");
const searchElement = document.querySelector("#searchField");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchField.value;
  console.log("search value : " + searchValue);
  if (searchValue) {
    getUser(searchValue);
    searchField.value = "";
  } else {
    window.alert("Enter User Name");
  }
});

async function getUser(userName) {
  const response = await fetch(APIURL + userName);
  const githubUser = await response.json();
  console.log("githubUser " + githubUser);

  createUserCard(githubUser);
  getUserRepos(userName);
}

function createUserCard(user) {
  const cardHTML = `
        <div class="card">
            <div class="card-img">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}

async function getUserRepos(userName) {
  const response = await fetch(APIURL + userName + "/repos");
  const repos = await response.json();
  console.log("repos " + repos);

  addReposToCard(repos);
}

function addReposToCard(repos) {
  const repoElement = document.getElementById("repos");
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const anchorTag = document.createElement("a");
      anchorTag.classList.add("repo");
      anchorTag.href = repo.html_url;
      anchorTag.target = "_blank";
      anchorTag.innerText = repo.name;
      repoElement.appendChild(anchorTag);
    });
}
