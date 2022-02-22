class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector, userId}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._userId = userId;
  }

  getUserInfo() {
    return { 
      name: this._userNameElement.textContent, 
      description: this._userDescriptionElement.textContent, 
      avatar: this._userAvatarElement.style.backgroundImage,
      _id: this._id,
    }; 
  } 

  setUserInfo({name, description, avatar, _id}) { 
    if (name) this._userNameElement.textContent = data.Name; 
    if (description) this._userDescriptionElement.textContent = data.Description; 
    if (avatar) this._userAvatarElement.src = avatar;
    if (_id) this._userId = data._id;
  }
  
  getUserId() {
    return this._id;
  }
}

export default UserInfo;

