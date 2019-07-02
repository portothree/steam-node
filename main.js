const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');

const client = new SteamUser();

const logOnOptions = {
    accountName: '',
    password: '',
    twoFactorCode: SteamTotp.generateAuthCode('') // steam shared secret
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
});

manager.on('newOffer', offer => {
    if (offer.partner.getSteamID64() === '') { //trusted account id
        offer.accept((err, status) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Accepted offer. Status: ${status}.`);
            }
        });
    }
});