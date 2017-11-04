function processSeanMessageFromPage(event) {
  var senderID = event.sender.id;
  var pageID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

    senderID, pageID, timeOfMessage, JSON.stringify(message));

  if (message.quick_reply) {
      message.quick_reply.payload);
    handleQuickReplyResponse(event);
    return;
  }

  // the 'message' object format can vary depending on the kind of message that was received.
  // See: https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
  var messageText = message.text;
  if (messageText) {
    var lowerCaseMsg = messageText.toLowerCase();
    switch (lowerCaseMsg) {
      case 'help':
        // handle 'help' as a special case
        sendHelpOptionsAsQuickReplies(senderID);
        break;
      case 'where':
        // handle 'help' as a special case
        seanMessage(senderID);
        break;

      default:
        // otherwise, just echo it back to the sender
        sendTextMessage(senderID, messageText);
    }
  }
}

module.exports = processSeanMessageFromPage;
