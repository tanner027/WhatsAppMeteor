angular
	.module('Whatsapp')
	.controller('ChatCtrl', ChatCtrl);

function ChatCtrl ( $scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout ) {
	$reactive(this).attach($scope);
	this.sendMessage = sendMessage;

	this.inputUp = inputUp;

	this.inputDown = inputDown;

	this.closeKeyboard = closeKeyboard;


	let chatId = $stateParams.chatId;
	let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
	this.helpers({
		data: () => Chats.findOne(chatId),
		messages: () => Messages.find({chatId: chatId})
	});

	function sendMessage () {
		Meteor.call('newMessage', {
			text: this.message,
			type: 'text',
			chatId: chatId
		});

		delete this.message;
	}

	function closeKeyboard () {
		// cordova.plugins.Keyboard.close();
	}
	function inputUp () {
		
		if ( isIOS ) {
			this.keyboardHeight = 216;
		}

		$timeout(function() {
			$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
		});
	}
	function inputDown () {
		if ( isIOS ) {
			this.keyboardHeight = 0;
		}

		$ionicScrollDelegate.$getByHandle('chatScroll').resize();
	}
}