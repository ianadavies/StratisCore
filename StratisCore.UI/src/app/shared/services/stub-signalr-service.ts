import { ISignalRService } from '@shared/services/interfaces/services.i';
import { SignalRMessageHandler } from '@shared/services/signalr-service';

export class StubSignalRService implements ISignalRService {
  private onMessageReceivedHandlers: Array<SignalRMessageHandler> = [];

  constructor(
    private blockHeight: number = 726414,
    private balance: number = 1000,
    private address: string = 'tDBPE4NCXfYderyDjqeuHPVjdZ1mqL1Zz9') {
    setInterval(() => {
      this.balance += 1;
      this.executeMessageReceivedHandlers(this.getTestBalanceMessage());
      this.executeMessageReceivedHandlers(this.getBlockConnectedEventTestMessage());
    }, 10000);
  }

  public connect(hubName: string): void {
  }

  public registerOnMessageEventHandler<TMessage>(messageType: string, onEventMessageReceivedHandler: (message: TMessage) => void): void {
    this.onMessageReceivedHandlers.push({
      messageType: messageType,
      onEventMessageDelegate: onEventMessageReceivedHandler
    });
  }

  private executeMessageReceivedHandlers(message: any): void {
    this.onMessageReceivedHandlers.forEach(handler => {
      if (message.nodeEventType) {
        const typeParts = message.nodeEventType.split(',');
        if (typeParts[0].endsWith(handler.messageType)) {
          handler.onEventMessageDelegate(message);
        }
      }
    });
  }

  private getBlockConnectedEventTestMessage() {
    return {
      'type': 1,
      'target': 'receiveEvent',
      'arguments': [{
        'hash': '3740cde6b894d33465cd6d3017e866ed14418b1f07242585f556d5983774be40',
        'height': this.blockHeight,
        'nodeEventType': 'Stratis.Bitcoin.EventBus.CoreEvents.BlockConnected, Stratis.Bitcoin, Version=3.0.6.0, Culture=neutral, PublicKeyToken=null'
      }]
    };
  }

  private getTestBalanceMessage() {
    return {
      'type': 1,
      'target': 'receiveEvent',
      'arguments':
        [{
          'nodeEventType': 'Stratis.Bitcoin.Features.SignalR.Events.WalletGeneralInfo, Stratis.Bitcoin.Features.SignalR, Version=3.0.7.0, Culture=neutral, PublicKeyToken=null',
          'accountsBalances': [{
            'accountName': 'account 0',
            'accountHdPath': 'm/44\'/400\'/0\'',
            'coinType': 400,
            'amountConfirmed': this.balance,
            'amountUnconfirmed': 0,
            'spendableAmount': this.balance,
            'addresses': [{
              'address': this.address,
              'isUsed': true,
              'isChange': false,
              'amountConfirmed': this.balance,
              'amountUnconfirmed': 0
            }, {
              'address': 'tKNqwfCshXpNT6WNeasMdfSf7PZLq4xA8E',
              'isUsed': true,
              'isChange': false,
              'amountConfirmed': 4,
              'amountUnconfirmed': 0
            }, {
              'address': 't7UKEENwCwykRYKq3JDocJU4ExcTuYEEUo',
              'isUsed': true,
              'isChange': false,
              'amountConfirmed': 1,
              'amountUnconfirmed': 0
            }, {
              'address': 'tHmd2zB5azp4XnH3j3BdNjQDNCED9RcaeP',
              'isUsed': true,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tFa3qgMEJgo5TW8ZtRU14MHihd5AQbjMbM',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tC35tThAEXL73eK8UcBJA75jNcRFmjorRn',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tBzy3rwL2oxz77hq7HdhwvyNFiR4LH9TXs',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tVpQ3H6W4vc7783JH2z8guwVmnnkkmLSQ2',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tW2gXoNVDhc4cU1CJE6VNNrxe5b2gVgmVh',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tEkH3K4RfdFESjJtW6tEC2aDZC77ACZhXQ',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tUFAnRP6vrbq5dWYHgg2pgyYhX87Ue8HDh',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tDosUsFKKCCMhbwHCuTAWqfW5u5U29K6Gf',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't7jyanN85p3YGhX647qSWonktMGqwUCrQ8',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tDzgWNXJtTXAbaGB9snPntrPxecsnM6e86',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't8BC15Ax2PUwY31NdHVJW6DmxWRET3AKWp',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tMThwfa9Zc9puuvkVcJURnH2SaH8UYUncC',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tD6sg3MjAuuXG4BcrUgbuPZsij6wNMkoRe',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tC5U2gNjMBgHhc2bMGqXBSRbzRC1abSvJF',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tMSHzGdG6K9Zxd1bPGDkhMwAE8iXdZnwhx',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tEDxmXSRRJUUC8ncv23DVG5cZgyWC5fjKc',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tVBmWVbZiKHm4tibS46Mpk5GnrhdH1fUj7',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tGJPpgrJh214W15N9b1cAU2dcwdLgs5mpB',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tT33io4n8An3nqshKMFrDnCXs9Yq7R42dg',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tMDR5TrM6XfxMxMKb16drmPwUopy8ryUys',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tQ9EpDCU5xFuu2vrGSfKDWtKUaGBgrhHnP',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tJvvSr9MmPBHNsZ2FMgQzXL3WtsUaJy5e6',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tEVs8Vc4ErQKT8sQSRPLhn6Em2ACncMCMG',
              'isUsed': false,
              'isChange': false,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tNHeVRCYDJTBAWWduQE2nHRpreHkfBQpb3',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tHWofohjqacius5U9fxnTcVU5RTdqS6982',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tKTHV1AeeBUKawQyrJKbxRwjP9UKeGypJS',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tKazajnZYjHGX4JPMfS23M3XBVb4fnB4Uu',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't9EnZ8BusqajMFKpuMqjKFKSTh6HwDa3oG',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tBQrSBseGPfYywVYV8h8QdVsBUqcZaZUVF',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tLLeAPuHkSvxqgXYnpMUtW7ygHSNJSMkCy',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tQB5hV3b6TUUauGM1YH6HmjATX35W6j91A',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tHJhEwc8aLyyWHSokzEsCGnsirQ1dZH5tx',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't7R8Kf4FcZpKrBNqEit1RmH87cJBgiaK6q',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tM4SMG1fEqxpGtNwgtmMSMkeWk1fP4BwSd',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tGt72fNwaSkZCdBhPwtKcn2xz4LHVoKuFE',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tRRmnRRbGyEZY2ktajbmaXEcPRkfKuNy8h',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't7uNkRwXmU4ZuVywr8ooUUvbj8CpPPaBYs',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tR5xAKUb2vat2Vxqh59mXTNhwEg16U5VHW',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tVQoq5TBbqyNnmWvaif55zT5NdcHhRxx1B',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tU3SbCySaaXwHJXmDULdqfy8ttyK1Z8Mxx',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 't72XotWA8TNe2o5diKjknGydEW4VzmXaKp',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tBqC5Wtwu8rm6F8LuUpGWn7wEPMkAh2eWj',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }, {
              'address': 'tSFbVuaHugiK6MVNfddNhVRmvGeUu5mXDi',
              'isUsed': false,
              'isChange': true,
              'amountConfirmed': 0,
              'amountUnconfirmed': 0
            }]
          }],
          'walletName': 'TestCirrus',
          'network': 'CirrusTest',
          'creationTime': '1565105648',
          'isDecrypted': true,
          'lastBlockSyncedHeight': this.blockHeight,
          'chainTip': this.blockHeight,
          'isChainSynced': true,
          'connectedNodes': 1
        }]
    };
  }
}
