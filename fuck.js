const mineflayer = require('mineflayer')
const Discord = require('discord.js')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = new HypixelAPIReborn.Client(process.env['APIKEY'])
const client = new Discord.Client()
var logged = false 
const fetch = (...args) => import('node-fetch').then(({
	default: fetch
}) => fetch(...args));
// CONFIG //
var user = process.env['MAIL']
var pass = process.env['PASS']
const token = process.env['TOKEN']
var microsoft = true
// END CONFIG //
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(1000)
var bot = mineflayer.createBot({
		host: 'mc.hypixel.net',
		username: user,
		password: pass,
		auth: microsoft ? "microsoft" : "mojang",
		version: "1.8.9",
		hideErrors: true
	})
	bot.on('kicked', (err) => {
		console.log(err)
	})
	bot.on('error', (err) => {
		console.log(err)
	})
	bot.on('login', () => {
					const channel = client.channels.cache.get('977107181897936927')
    if(logged == true) return
		console.log(`Bot logged in as ${bot.username}.`)
		logged = true
		setTimeout(() => {
			bot.chat('/chat g') // change to guild chat
		}, 5000)
	})
	bot.on('message', text => {
		try {
			console.log(text)
			const channel = client.channels.cache.get('977107181897936927')
			if(text.extra[0].text.includes('§2Guild > ')) {
				if(text.extra[1].text.includes('<@') || text.extra[1].text.includes('@everyone') || text.extra[1].text.includes('<!') || text.extra[1].text.includes('<&')) return
				if(text.extra[0].text.split(" ")[3] == bot.username) return
				if(text.extra[1].text.startsWith('/bw')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						console.log(data.stats.bedwars)
						if(text.extra[1].text.split(' ').length == 2) {
							bot.chat(`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins} - ${makeid(10)}`)
						channel.send(`\`\`\`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}\`\`\``)
							return
						}
						var mode = text.extra[1].text.split(' ')[2]
						if(mode == 'solo' ||
										mode == 'doubles' ||
										mode == 'threes' ||
										mode == 'fours' ||
										mode == '4v4') {
							bot.chat(`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${data.stats.bedwars[mode].wins} - ${makeid(10)}`)
						channel.send(`\`\`\`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${data.stats.bedwars[mode].wins}\`\`\``)
						} else {
							bot.chat('Invalid Mode! Valid Modes: [solo, double, threes, fours, 4v4]')
						}
					})
				}
				if(text.extra[1].text.startsWith('/duels')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						console.log(data.stats.duels)
						let kills = data.stats.duels.kills - data.stats.duels.bridge.overall.kills
						let deaths = data.stats.duels.deaths - data.stats.duels.bridge.overall.deaths
						bot.chat(`Wins: ${data.stats.duels.wins}, CWS: ${data.stats.duels.winstreak}, BWS: ${data.stats.duels.bestWinstreak}, WLR: ${data.stats.duels.WLRatio}, KDR: ${Math.round(kills/deaths * 100) / 100} - ${makeid(10)}`)
						channel.send(`\`\`\`Wins: ${data.stats.duels.wins}, CWS: ${data.stats.duels.winstreak}, BWS: ${data.stats.duels.bestWinstreak}, WLR: ${data.stats.duels.WLRatio}, KDR: ${Math.round(kills/deaths * 100) / 100}\`\`\``)
					})
				}
				if(text.extra[1].text.startsWith('/bridgeduels')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						console.log(data.stats.duels)
						bot.chat(`Wins: ${data.stats.duels.bridge.overall.wins + data.stats.duels.bridge['3v3'].wins}, CWS: ${data.stats.duels.bridge.overall.winstreak}, BWS: ${data.stats.duels.bridge.overall.bestWinstreak}, WLR: ${data.stats.duels.bridge.overall.WLRatio}, KDR: ${data.stats.duels.bridge.overall.KDRatio} - ${makeid(10)}`)
						channel.send(`\`\`\`Wins: ${data.stats.duels.bridge.overall.wins + data.stats.duels.bridge['3v3'].wins}, CWS: ${data.stats.duels.bridge.overall.winstreak}, BWS: ${data.stats.duels.bridge.overall.bestWinstreak}, WLR: ${data.stats.duels.bridge.overall.WLRatio}, KDR: ${data.stats.duels.bridge.overall.KDRatio}\`\`\``)
					})
				}
				if(text.extra[1].text.startsWith('/sumoduels')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						console.log(data.stats.duels)
						bot.chat(`Wins: ${data.stats.duels.sumo.wins}, CWS: ${data.stats.duels.sumo.winstreak}, BWS: ${data.stats.duels.sumo.bestWinstreak}, WLR: ${data.stats.duels.sumo.WLRatio}, KDR: ${data.stats.duels.sumo.KDRatio} - ${makeid(10)}`)
						channel.send(`\`\`\`Wins: ${data.stats.duels.sumo.wins}, CWS: ${data.stats.duels.sumo.winstreak}, BWS: ${data.stats.duels.sumo.bestWinstreak}, WLR: ${data.stats.duels.sumo.WLRatio}, KDR: ${data.stats.duels.sumo.KDRatio}\`\`\``)
					})
				}
				if(text.extra[1].text.startsWith('/opduels')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						console.log(data.stats.duels)
						bot.chat(`Wins: ${data.stats.duels.op.overall.wins}, CWS: ${data.stats.duels.op.overall.winstreak}, BWS: ${data.stats.duels.op.overall.bestWinstreak}, WLR: ${data.stats.duels.op.overall.WLRatio}, KDR: ${data.stats.duels.op.overall.KDRatio} - ${makeid(10)}`)
						channel.send(`\`\`\`Wins: ${data.stats.duels.op.overall.wins}, CWS: ${data.stats.duels.op.overall.winstreak}, BWS: ${data.stats.duels.op.overall.bestWinstreak}, WLR: ${data.stats.duels.op.overall.WLRatio}, KDR: ${data.stats.duels.op.overall.KDRatio}\`\`\``)
					})
				}
				if(text.extra[1].text.startsWith('/sw')) {
					var player = text.extra[1].text.split(' ')[1]
					HypAPI.getPlayer(player).then((data) => {
						bot.chat(`Star: ${data.stats.skywars.level}${data.stats.skywars.prestigeIcon}, Wins: ${data.stats.skywars.wins}, Kills: ${data.stats.skywars.kills}, KDR: ${data.stats.skywars.KDRatio} - ${makeid(10)}`)
						channel.send(`\`\`\`Star: ${data.stats.skywars.level}, Wins: ${data.stats.skywars.wins}, Kills: ${data.stats.skywars.kills}, KDR: ${data.stats.skywars.KDRatio}\`\`\``)
					})
				}
				if(text.extra[1].text.startsWith('/denick')) {
					var nick = text.extra[1].text.split(' ')[1]
					fetch(`http://api.antisniper.net/denick?key=${process.env['ASKEY']}&nick=${nick}`).then((res) => {
						res.json().then((data) => {
							if(data.player == null) {
								bot.chat(`Nick: ${nick}; IGN: Not In Database.`)
								channel.send(`\`\`\`Nick: ${nick}; IGN: Not In Database.\`\`\``)
							}
							bot.chat(`Nick: ${data.player.nick}; IGN: ${data.player.ign}`)
							channel.send(`\`\`\`Nick: ${data.player.nick}; IGN: ${data.player.ign}\`\`\``)
						})
					})
				}
				channel.send(`> \`\`${text.extra[0].text.split(" ")[3]}\`\`: ${text.extra[1].text}`)
			} else if(text.extra[1].text == "joined.") {
				channel.send(`:green_circle:  \`\`${text.extra[0].text.substring(0, text.extra[0].text.length - 1)}\`\` joined.`)
			} else if(text.extra[1].text == "left.") {
				channel.send(`:red_circle:  \`\`${text.extra[0].text.substring(0, text.extra[0].text.length - 1)}\`\` left.`)
			}
		} catch(err) {}
	})
client.once('ready', () => {
	console.log(`Discord Bot Logged in as ${client.user.tag}!`)
})
client.on('message', (message) => {
	const channel = client.channels.cache.get('977107181897936927')
	if(message.channel.id !== '977107181897936927' || message.author.bot) {return}
if(message.content.startsWith('/bw')) {
	HypAPI.getPlayer(message.content.split(' ')[1]).then((data) => {
						bot.chat(`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins} - ${makeid(10)}`)
						channel.send(`\`\`\`Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}\`\`\``)
					})
}
	if(message.content.startsWith('/denick')) {
					var nick = message.content.split(' ')[1]
					fetch(`http://api.antisniper.net/denick?key=${process.env['ASKEY']}&nick=${nick}`).then((res) => {
						res.json().then((data) => {
							if(data.player == null) {
								bot.chat(`Nick: ${nick}; IGN: Not In Database.`)
								channel.send(`\`\`\`Nick: ${nick}; IGN: Not In Database.\`\`\``)
							} else {
								bot.chat(`Nick: ${data.player.nick}; IGN: ${data.player.ign}`)
								channel.send(`\`\`\`Nick: ${data.player.nick}; IGN: ${data.player.ign}\`\`\``)
							}
						})
					})
				}
	
	try {
		bot.chat(`${message.member.nickname !== null ? message.member.nickname : message.author.username}: ${message.content}`)
		setTimeout(() => {
			message.delete()
		}, 500)
		channel.send(`> [DISCORD] \`\`${message.member.nickname !== null ? message.member.nickname : message.author.username}\`\`: ${message.content}`)
	} catch {
		channel.send(`Message failed to send to guild.`)
	}
})
client.login(token)