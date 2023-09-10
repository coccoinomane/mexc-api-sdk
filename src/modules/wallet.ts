import { UserData } from './userData';
import { fromatData } from '../util'

export class Wallet extends UserData {
    /**
     * Withdraw
     * 
     * @param coin
     * @param address
     * @param amount
     * ```
     * [options.network]
     * [options.memo]
     * [options.remark]
     * [options.withdrawOrderId] - A unique id among open withdrawals. Automatically generated if not sent.
     * [options.recvWindow] - The value cannot be greater than 60000
     * ```
     * @returns
     */
    public withdraw(
        coin: string,
        address: string,
        amount: number,
        options: any = {}
    ) {
        if([coin, address].some(str => !str.trim())) {
            console.assert(false, `Some params are required`)
            return
        }
        if(amount) {
            console.assert(false, `Amount must be greater than zero`)
            return
        }
        const res = this.signRequest('POST', '/capital/withdraw/apply', Object.assign(options, {
            coin: coin.toUpperCase(),
            address,
            amount
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Withdraw history
     * 
     * ```
     * [options.coin]
     * [options.status]
     * [options.limit] - default:1000, max:1000
     * [options.startTime] - default: 30 days ago from current time
     * [options.endTime] - default:current time
     * ```
     * @returns
     */
    public withdraw_history(
        options: any = {}
    ) {
        const res = this.signRequest('GET', '/capital/withdraw/history', Object.assign(options, {
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }

    /**
     * Deposit address
     * 
     * @param coin
     * ```
     * [options.network]
     * ```
     * @returns
     */
    public deposit_address(
        coin: string,
        options: any = {}
    ) {
        if([coin].some(str => !str.trim())) {
            console.assert(false, `Some params are required`)
            return
        }
        const res = this.signRequest('GET', '/capital/deposit/address', Object.assign(options, {
            coin: coin.toUpperCase(),
        }))
        const rawData = JSON.parse(res.getBody());
        const formatDatas = fromatData(rawData);
    
        return formatDatas;
    }
}