const Migrations = artifacts.require("Migrations");
const HelloWorld = artifacts.require("HelloWorld");

module.exports = async function (deployer) {
  //await deployer.deploy(Migrations);
  await deployer.deploy(HelloWorld)
};
