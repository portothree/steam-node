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