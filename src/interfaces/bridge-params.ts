import { FireblocksSDK } from "fireblocks-sdk";
import { Chain } from "./chain";

export interface BridgeParams {
    fireblocksApiClient: FireblocksSDK;
    vaultAccountId: string;
    contractAddress?: string;
    chain?: Chain;
}
