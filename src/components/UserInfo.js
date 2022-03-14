class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector, _id}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._id = _id;
  }

  getUserInfo() {
    return { 
      name: this._userNameElement.textContent, 
      about: this._userDescriptionElement.textContent.trim(),
      avatar: this._userAvatarElement.style.backgroundImage,
      _id: this._id,
    }; 
  } 

  setUserInfo({ name, about, avatar, _id }) { 
    this._userNameElement.textContent = name;  
    this._userDescriptionElement.textContent = about; 
    this._userAvatarElement.src = avatar;
    this._id = _id;
  }
  
  getUserId() {
    return this._id;
  }

  setAvatar({ avatar: link }) {
    this._userAvatarElement.src = link;
  }

}

export default UserInfo;

