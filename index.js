const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const content = document.createElement("div");
content.classList.add("wrapper__content");
wrapper.appendChild(content);

const inputWrapper = document.createElement("div"); 
inputWrapper.classList.add("wrapper__input-wrapper");
content.appendChild(inputWrapper);

const input = document.createElement("input");
input.classList.add("wrapper__input");
input.placeholder = "Type to search...";
inputWrapper.appendChild(input);

const dropdownWrapper = document.createElement("div");
dropdownWrapper.classList.add("wrapper__dropdown-wrapper");
inputWrapper.appendChild(dropdownWrapper);

const dropdown = document.createElement("ul");
dropdown.classList.add("wrapper__dropdown");
dropdownWrapper.appendChild(dropdown); 

const repoList = document.createElement("div");
repoList.classList.add("wrapper__repo-list");
content.appendChild(repoList);

function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, ms);
  };
}

const searchRepos = debounce(async (query) => {
  console.log("🐯 ~ searchRepos ~ query:", query)
  if(query.length > 0 ){
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&per_page=5`
      );
      const data = await response.json();
      updateDropdown(data.items); 
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }else{
    updateDropdown([]); 
  }
}, 500);

function updateDropdown(repos) {
  console.log("🐯 ~ updateDropdown ~ repos:", repos)
  dropdown.innerHTML = "";
  repos.forEach((repo) => {
    const repoItem = document.createElement("li");
    repoItem.classList.add("wrapper__dropdown-item");
    repoItem.textContent = repo.name;
    repoItem.addEventListener("click", () => addRepoToList(repo))
    dropdown.appendChild(repoItem);
  });
}

function addRepoToList(repo){
  
  input.value = "";

  const repoItem = document.createElement("div")
  repoItem.classList.add("wrapper__repo-item")

  const repoName = document.createElement("div");
  repoName.classList.add("wrapper__repo-name");
  repoName.textContent = "Name: " + repo.name;
  repoItem.appendChild(repoName);

  const repoOwner = document.createElement("div");
  repoOwner.classList.add("wrapper__repo-owner");
  repoOwner.textContent = "Owner: " + repo.owner.login;
  repoItem.appendChild(repoOwner);

  const repoStars = document.createElement("div");
  repoStars.classList.add("wrapper__repo-stars");
  repoStars.textContent = "Stars: " + repo.stargazers_count;
  repoItem.appendChild(repoStars);

  const removeButton = document.createElement("button");
  removeButton.classList.add("wrapper__repo-delete");
  repoItem.appendChild(removeButton);

  updateDropdown([])
 repoList.appendChild(repoItem)
 removeButton.addEventListener("click", () => repoItem.remove());
}

input.addEventListener("input", (event) => {
  const query = event.target.value;
  searchRepos(query);
  
});

