export class SendCourier {
  constructor(
    public sender: string,
    public senderAddress: string,
    public senderCity: string,
    public receiver: string,
    public receiverAddress: string,
    public receiverCity: string
  ) { }
}
