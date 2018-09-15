function Record() {
  this.setGroupName = function (name) {
    this.groupName = name;
  };
  this.setGroup = function (group) {
    this.group = group;
  };

  this.setUserId = function (userId) {
    this.userId = userId;
  };

  this.setName = function (name) {
    this.name = name;
  };

  this.setProfileUrl = function (profileUrl) {
    this.profileUrl = profileUrl;
  };

  this.setAvatarImage = function (avatarImage) {
    this.avatarImage = avatarImage;
  };

  this.setAnswers = function (answers) {
    this.answers = answers;
  };

}

Record.prototype.toObject = function () {
  return {
    group: this.group,
    groupName: this.groupName,
    userId: this.userId,
    name: this.name,
    profileUrl: this.profileUrl,
    avatarImage: this.avatarImage,
    answers: this.answers,
  };
};
