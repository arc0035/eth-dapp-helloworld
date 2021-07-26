
App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers…
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
      // Request account access
        await window.ethereum.enable();
      } catch (error) {
      // User denied account access…
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers…
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      console.log('using default 7545 Http Provider')
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return await App.initContract();
  },

  initContract: async function() {
    var web3 = new Web3(App.web3Provider);
    var accounts = web3.eth.accounts;
    console.log(accounts[0])
    var txCount = web3.eth.getTransactionCount(accounts[0])
    console.log('transaction count:'+txCount)

    var jsonFile = "D://github/mason/eth-dapp-helloworld/build/contracts/HelloWorld.json";
    var fr=new FileReader();
    fr.readAsText(jsonFile)
    console.log(fr.result)
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
