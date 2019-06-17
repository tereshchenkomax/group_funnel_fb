function answerRecord() {
  this.setQuestion = function (question) {
    this.question = question;
  };

  this.setAnswer  = function (answer) {
    this.answer = answer;
  };

}

answerRecord.prototype.toObject = function () {
  return {
    question: this.question,
    answer: this.answer
  };
};
