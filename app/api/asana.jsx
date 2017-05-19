var asana = require('asana')

const ACCESS_TOKEN = '0/fbeb5e02884aeda9d11a9636c2c89934'

export var client = asana.Client.create().useAccessToken(ACCESS_TOKEN)
client.users.me().then(function(me) {
  console.log(me);
});