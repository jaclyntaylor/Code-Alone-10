// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

function changeChannel(e) {
  let active = document.querySelector(".channel.active");
  if (active) {
    active.classList.remove("active");
  }
  let clicked = e.currentTarget;
  clicked.classList.add("active");
  let changeHeader = document.querySelector("#channel-title");
  changeHeader.textContent = clicked.textContent;

  messages(clicked.dataset.channel);

}

function messages(channelName){
  let container = document.querySelector("#chat-messages");
  let template = document.querySelector("template");
  container.innerHTML = "";
  let aMessages = chatData[channelName] || [];

  aMessages.forEach((msg) => {
    let newMessage = document.importNode(template.content,true);

    newMessage.querySelector(".sender").textContent = `${msg.sender}:`;
    newMessage.querySelector(".text").textContent = msg.text;

    if (msg.fromSelf) {
      newMessage.querySelector(".message").classList.add("self");
    }
    container.appendChild(newMessage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let channels = document.querySelectorAll(".channel");
  channels.forEach((channel) => {
    channel.addEventListener("click", changeChannel);
  });
  let sendButton = document.querySelector(".chat-input button");
  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }
  channels.forEach((channel) => {
    if (!channel.id) {
      channel.id = `channel-${channel.dataset.channel}`;
    }
  });
});
