const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const logOnOptions = {
    accountName: '',
    password: '',
    twoFactorCode: SteamTotp.generateAuthCode('') // steam shared secret
};

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
});


client.on('webSession', (sessionid, cookies) => {
    sendRandomItem();

    manager.setCookies(cookies);

    community.setCookies(cookies);
    community.startConfirmationChecker(15000, ''); // identity secret goes here
});


function sendRandomItem() {
    manager.loadInventory(440, 2, true, (err, inventory) => {
        if (err) {
            console.log(err);
        } else {
            const offer = manager.createOffer(''); // partner steam id goes here
            const item = inventory[Math.floor(Math.random() * inventory.length - 1)];

            offer.addMyItem(item);
            offer.setMessage(`You get a ${item.name}`);
            offer.send((err, status) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Sent offer, status: ${status}`);
                }
            });
        }
    });
}