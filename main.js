const SteamUser = require('steam-user');
const client = new SteamUser();

const logOnOptions = {
    accountName: '',
    password: ''
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
});