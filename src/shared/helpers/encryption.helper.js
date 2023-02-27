import crypto from 'crypto';
import config from "../../config/config";
const secret = config.secretHashKey;
export default async (simpleString) => {
    if(simpleString){
        simpleString = simpleString.trim();
        const hash = await crypto.createHmac('sha256', secret)
            .update(simpleString)
            .digest('hex');
        return hash;
    }
}
