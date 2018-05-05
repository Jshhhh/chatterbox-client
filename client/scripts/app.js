// YOUR CODE HERE:

//what type of data is coming from parse server
//get messages from parse server
//display messages on user screen


var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
  init :function(){
    this.clearMessages();
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

  fetch: function() {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length -1; i >= data.results.length - 100; i--) {
          app.renderMessage(data.results[i]);
          app.renderRoom(data.results[i].roomname);
        }
        console.log('chatterbox: Messages recieved', data);
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
    
    if ($(`option:contains(${roomName})`).length === 0){
      // $('#roomSelect').append(`<option>${roomName}</option>`);
      $('#roomSelect').append(`<option>`+ roomName +`</option>`);
    }
  },

  handleUsernameClick: function() {
    console.log(1);
  },
  handleSubmit: function(){
    var message = {username: $('#newUser').val(), text: $('#newMessage').val(), roomname: $('select').val()};
    this.renderMessage(message);
    this.send(message);
  }
};
 
$(document).ready(function() {
  app.init();

 $('#newRoom').on('click', function() {
      console.log('submitted');
      var message =  $('#newRoomname').val();
    
      app.renderRoom(message);
    }
  );



  //setInterval(function(){app.init()}, 8000);
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
    }
  );

  $('select').on('change', function() {
    app.clearMessages();
    var room = $('select').val();
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length -1; i >= data.results.length - 100; i--) {
          if (room === data.results[i].roomname) {
            console.log(data.results[i].roomname)
            app.renderMessage(data.results[i]);
          }
        }
        console.log('chatterbox: Messages recieved', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to recieve messages', data);
      }
    });
    console.log(room);
  });

  $('#send .submit').on('click', function() {
    console.log('submitted');
    app.handleSubmit();
    }
  );
});













