const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'
});

const logOnOptions = {
    accountName: '',
    password: '',
    twoFactorCode: SteamTotp.generateAuthCode('') // steam shared secret
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Logged into Steam');
});

client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
  
    community.setCookies(cookies);
    community.startConfirmationChecker(15000, '');
});

manager.on('newOffer', offer => {
    if (offer.itemToGive.length === 0) {
        offer.accept((err, status) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Donation accepted, status: ${status}`)
            }
        });
    } else {
        offer.decline(err => {
            if (err) {
                console.log(err);
            } else  {
                console.log('Wanted our items, DECLINED')
            }
        });
    }
});