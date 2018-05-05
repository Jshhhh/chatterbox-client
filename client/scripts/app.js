// YOUR CODE HERE:

//what type of data is coming from parse server
//get messages from parse server
//display messages on user screen


var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  init :function(){
    this.fetch();
    },

  send: function(messageObj) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(messageObj),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
  },

  fetch: function(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length - 1; i >= data.results.length - 5; i--) {
            app.renderMessage(data.results[i]);
          }
        console.log('chatterbox: Messages recieved');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to recieve messages', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').children().remove();
  },

  renderMessage :function(messObj){
    $('#chats').prepend(`<div class="chat"><div class="username">${messObj.username}</div><p>${messObj.text}</p></div>`);
  },

  renderRoom: function(roomName) {
    $('#roomSelect').append(`<p>${roomName}</p>`);
  },

  handleUsernameClick: function() {
    console.log(1);
  },
  handleSubmit: function(){
    var message = {username: $('#newUser').val(), text: $('#newMessage').val()};
    this.renderMessage(message);
    this.send(message);
  }
};
 
$(document).ready(function() {
  setInterval(function(){return app.init()}, 5000);
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
    }
  ),
  $('#send .submit').on('click', function() {
    app.handleSubmit();
    }
  );
});













