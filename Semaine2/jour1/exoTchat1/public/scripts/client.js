const messageInput = document.querySelector('#message-input');
messageInput.addEventListener('input', () => {
  socket.emit('notifyTyping');
});

socket.on('typingNotification', (username) => {
  const typingNotification = document.querySelector('#typing-notification');
  typingNotification.textContent = `${username} is typing...`;
});

socket.on('stopTypingNotification', () => {
  const typingNotification = document.querySelector('#typing-notification');
  typingNotification.textContent = '';
});

const channels = document.querySelectorAll('a[data-channel]');
channels.forEach(channel => {
  channel.addEventListener('click', (event) => {
    event.preventDefault();
    const channelName = event.target.getAttribute('data-channel');
    socket.emit('changeChannel', channelName);
  });
});
