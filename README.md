This is a discord bot to reset HWIDs on keyauth, very simple to set up, could easily be made into a dynamic command.
Instructions below uses node.

1. Fill in .env

DISCORD_TOKEN=DISCORDTOKEN
CLIENT_ID=CLIENTID
SELLER_KEY_1=your_seller_key_1
SELLER_KEY_2=your_seller_key_2
SELLER_KEY_3=your_seller_key_3
SELLER_KEY_4=your_seller_key_4
SELLER_KEY_5=your_seller_key_5

2. Edit names in index.js

 .addChoices(
{ name: 'Fortnite Temp', value: 'seller_key_1' },
{ name: 'Fortnite Priv', value: 'seller_key_2' },
{ name: 'Fortnite Pub', value: 'seller_key_3' },
{ name: 'Fortnite Internal', value: 'seller_key_4' },
{ name: 'Perm', value: 'seller_key_5' }
                ))
Names can be whatever you would like

3. Add allowed use roles

 const allowedRoleIDs = ['role_id_1', 'role_id_2']; // FILL IN ROLE IDS

4. Add more options if needed

4a. Add next seller key in .env
Example
SELLER_KEY_5=your_seller_key_4
SELLER_KEY_6=your_seller_key_6 - Added seller key

4b. Add choice under .addchoics
{ name: 'Fortnite Temp', value: 'seller_key_1' },
{ name: 'Fortnite Priv', value: 'seller_key_2' },
{ name: 'Fortnite Pub', value: 'seller_key_3' },
{ name: 'Fortnite Internal', value: 'seller_key_4' },
{ name: 'Perm', value: 'seller_key_5' },
{ name: 'Temp', value: 'seller_key_6' }, -- New Option

4c. Add switch choice
case 'seller_key_4':
                sellerKey = process.env.SELLER_KEY_4;
                break;
case 'seller_key_5':
                sellerKey = process.env.SELLER_KEY_5;
                break;
case 'seller_key_6': -- Added changed name
                sellerKey = process.env.SELLER_KEY_6; -Added changed name
                break; -- Added
            default: --Move default down



5. Launching

5a. Install latest version of node
5b. Open CMD in folder
5c. Run npm install
5d. Run node index.js
5e. Program should now run
