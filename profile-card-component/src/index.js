let followers = 1999;

const followButton = document.querySelector(".follow-button");
const profileButton = document.querySelector(".profile-button");
const followersElement = document.querySelector(".followers-data span");

followButton.addEventListener("click", () => {
    if (followButton.classList.contains("following")) {
      followButton.classList.remove("following");
      followButton.innerText = "Follow";
      followers--;
    } else {
        followButton.classList.add("following");
        followButton.innerText = "Unfollow";
        followers++;
    }
  followersElement.innerText = followers;
});

profileButton.addEventListener("click", () => {
  alert("Not implemented, sorry");
});



