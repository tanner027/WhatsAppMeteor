angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.remove = remove;

  this.helpers({
    data: () => Chats.find({}),
  });

  ////////////

  function remove (chat) {

  	console.log(this.data);
    Chats.remove(chat._id);
  }
}