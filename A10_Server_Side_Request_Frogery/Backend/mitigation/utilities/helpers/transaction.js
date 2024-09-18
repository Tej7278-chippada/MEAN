class NewTransaction {
  constructor(sender, receiver, senderAddress, receiverAddress, senderCity, receiverCity) {
    this.sender = sender;
    this.receiver = receiver;
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.senderCity = senderCity;
    this.receiverCity = receiverCity;
  }
}

module.exports = NewTransaction;
