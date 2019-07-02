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
  
    sendRandomItem();
});


function sendRandomItem() {
    const partner = ''; // partner steam id goes here
    const appid = 440;
    const contextid = 2;

    const offer = manager.createOffer(partner);

    manager.loadInventory(appid, contextid, true, (err, myInv) => { // true here stands for only showing tradable items
        if (err) {
            console.log(err);
        } else {
            const myItem = myInv[Math.floor(Math.random() * myInv.length - 1)];
            offer.addMyItem(myItem);

            manager.loadUserInventory(
                partner,
                appid,
                contextid,
                true,
                (err, theirInv) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const theirItem = theirInv[Math.floor(Math.random() * theirInv.length - 1)];
                        offer.addTheirItem(theirItem)

                        offer.setMessage(`You will trade my ${myItem.name} for your ${theirItem.name}`);

                        offer.send((err, status) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`Sent offer, status: ${status}`);
                            }
                        });
                    }
                }
            );
        }
    });

}