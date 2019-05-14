import * as config from 'config';
import { APIServerClass, IAPIConfig } from './APIServer';

export interface ApiBalance {
	total: number;
	usable: number;
	locked: number;
}

export class BalanceApi extends APIServerClass {

	constructor(conf: IAPIConfig = config.nuls.api.explorer) {
		super({ ...config.nuls.api.explorer, ...conf });
	}

	async balance(address): Promise<ApiBalance> {

		const resource: string = this.getResource('balance', address);

		try {
			return (await this.api.get(resource)).data;

		} catch (e) {

			throw this.handleErrors(e);

		}

	}

}
