const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("../config.json")
const axios = require('axios');

client.on('ready', () => {
  console.log(`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`);
  client.user.setActivity('Charme na Visinha', { type: 'PLAYING' }); (`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  //args[1] pega o user do github
  const comando = args.shift().toLowerCase();

  // git
  if (comando === "git") {
    const response = await axios.get(`https://api.github.com/users/${args}`);
    const { name, public_repos, html_url, public_gists, followers, following, company, bio, location } = response.data;

    message.channel.send(
`\n\n\n\nName: ${name}
Repositories: ${public_repos}
Company: ${company}
${html_url}
Gits: ${public_gists}
followers: ${followers}
following: ${following}
Bio: ${bio}
Location:${location}`
    );
  }
})

client.login(config.token);