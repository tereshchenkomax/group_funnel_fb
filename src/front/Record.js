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

  this.setJoinedFacebookOn = function (joined) {
    this.joinedFacebookOn = joined;
  };

  this.setFrom = function (from) {
    this.from = from;
  };

  this.setLivesIn = function (livesIn) {
    this.livesIn = livesIn;
  };

  this.setWorksAt = function (worksAt) {
    this.worksAt = worksAt;
  };

  this.setWentTo = function (wentTo) {
    this.wentTo = wentTo;
  };

  this.setStudiedAt = function (studiedAt) {
    this.studiedAt = studiedAt;
  };

  this.setRequestTime = function (requestTime) {
    this.requestTime = requestTime;
  };
}

Record.prototype.toObject = function () {
  return {
    //group: this.group || '',
    groupName: this.groupName || '',
    userId: this.userId || '',
    name: this.name || '',
    profileUrl: this.profileUrl || '',
    //avatarImage: this.avatarImage || '',
    answers: this.answers || Array(3).fill(''),
    joinedFacebookOn: this.joinedFacebookOn || '',
    from: this.from || '',
    livesIn: this.livesIn || '',
    worksAt: this.worksAt || '',
    wentTo: this.wentTo || '',
    studiedAt: this.studiedAt || '',
    requestTime: this.requestTime || '',
  };
};
