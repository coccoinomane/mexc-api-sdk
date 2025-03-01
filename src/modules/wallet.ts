import { UserData } from './userData';
import { fromatData } from '../util'

export class Wallet extends UserData {
    /**
     * Withdraw
     * 
     * @param coin
     * @param network
     * @param address
     * @param amount
     * @param options
     * ```
     * [options.memo]
     * [options.remark]
     * [options.withdrawOrderId] - A unique id among open withdrawals. Automatically generated if not sent.
     * [options.recvWindow] - The value cannot be greater than 60000
     * ```
     * @returns
     */
    public withdraw(
        coin: string,
        network: string,
        address: string,
        amount: number,
        options: any = {}
    ) {
        if([coin, network, address].some(str => !str.trim())) {
            throw new Error("Some params are required");
        }
        if(amount<=0) {
            throw new Error("Amount must be greater than zero");
        }
        const res = this.signRequest('POST', '/capital/withdraw/apply', Object.assign(options, {
            coin: coin.toUpperCase(),
            network: network.toUpperCase(),
            address,
            amount
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Cancel a withdraw
     * 
     * @param id
     * @returns
     */
    public cancelWithdraw(
        id: string,
    ) {
        if([id].some(str => !str.trim())) {
            throw new Error("Some params are required");
        }
        const res = this.signRequest('DELETE', '/capital/withdraw', {
            id: id
        })
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Withdraw history
     *
     * @param options
     * ```
     * [options.coin]
     * [options.status]
     * [options.limit] - default:1000, max:1000
     * [options.startTime] - default: 30 days ago from current time
     * [options.endTime] - default:current time
     * ```
     * @returns
     */
    public withdrawHistory(
        options: any = {}
    ) {
        const res = this.signRequest('GET', '/capital/withdraw/history', Object.assign(options, {
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Deposit history
     *
     * @param options
     * ```
     * [options.coin]
     * [options.status]
     * [options.limit] - default:1000, max:1000
     * [options.startTime] - default: 30 days ago from current time
     * [options.endTime] - default:current time
     * ```
     * @returns
     */
    public depositHistory(
        options: any = {}
    ) {
        const res = this.signRequest('GET', '/capital/deposit/hisrec', Object.assign(options, {
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Deposit address
     *
     * @param options
     * ```
     * [options.coin]
     * [options.page]
     * [options.limit]
     * ```
     * @returns
     */
    public withdrawAddress(
        options: any = {}
    ) {
        const res = this.signRequest('GET', '/capital/withdraw/address', Object.assign(options, {
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Deposit address
     * 
     * @param coin
     * @param options
     * ```
     * [options.network]
     * ```
     * @returns
     */
    public depositAddress(
        coin: string,
        options: any = {}
    ) {
        if([coin].some(str => !str.trim())) {
            throw new Error("Some params are required");
        }
        const res = this.signRequest('GET', '/capital/deposit/address', Object.assign(options, {
            coin: coin.toUpperCase(),
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Return info about all coins available for deposit and withdraw:
     * withdrawal networks, withdrawal & deposit status, fees, limits,
     * etc.
     * 
     * Big response!
     * 
     * @param coin optionally filter result by coin
     * @returns Response exaple: https://d.pr/i/JUixbx
     */
    public getAllCoins(coin?: string) {
        const res = this.signRequest('GET', '/capital/config/getall', {})
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);

        if(coin) {
            for (let i = 0; i < formatDatas.length; i++) {
                const data = formatDatas[i];
                if(data.coin === coin.toUpperCase()) {
                    return data.networkList;
                }
            }
        }

        return formatDatas;
    }
}