const express = require("express");
const http = require("http");
const Wallet = require("ethereumjs-wallet");

const app = express();

app.get("/getEth", (req, res) => {
  const wallet = Wallet["default"].generate();
  res.json({
    address: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString(),
  });
});

http.createServer(app).listen(3000, "192.168.200.61", function () {
  console.log("Listening to port:  " + 3000);
});
