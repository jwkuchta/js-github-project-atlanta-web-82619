const searchForm = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")

searchForm.addEventListener("submit", searchByName)
userList.addEventListener("click", getRepos)
  
function searchByName(e){
    e.preventDefault();
    let searchTerm = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(resp => resp.json())
    .then(searchResults => getUser(searchResults))
}
  
function getUser(searchResults){
    const userData = searchResults.items.filter(searchResult => searchResult.type === "User");
    displayUserInfo(userData);
}
  
function displayUserInfo(userData){
    const userList = document.querySelector("#user-list");
    userData.forEach(userInfo => {
      let li = document.createElement("li");
      li.innerHTML = `<h3>Name: ${userinfo.login}</h3>
      <img src="${userInfo.avatar_url}" alt="name"><br>
      <button type="button" id="repo-button" data-url="${userInfo.repos_url}">UserRepos</button>`
      userList.append(li)
    })
}

function getRepos(e){
    if (e.target.id == "repo-button"){
      fetch(`${e.target.dataset.url}`)
        .then(rsp => rsp.json())
        .then(repos => displayUserRepos(repos))
    }
}
  
function displayUserRepos(repos){
    const reposList = document.querySelector("#repos-list");
    repos.forEach(function(repo){
      let li = document.createElement("li");
      li.innerHTML = `<p><a href="${repo.html_url}">${repo.name}</a></p>`
      reposList.append(li)
    })
}

