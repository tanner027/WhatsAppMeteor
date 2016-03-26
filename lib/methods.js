Meteor.methods({

	'newMessage': function(message) {
		console.log(message);
		check(message, {
			text: String,
			chatId: String
		});
		message.timestamp = new Date();

		let messageId = Messages.insert(message);

		Chats.update(message.chatId, {$set: { lastMessage: message}});

		return messageId;
	}

});