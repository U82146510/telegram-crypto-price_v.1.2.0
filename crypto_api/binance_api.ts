import axios from "axios";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const base_url = 'https://api.binance.com';
const endpoint = '/api/v3/account?';

const api_key = process.env.BINANCE_API_KEY;
const api_secret = process.env.BINANCE_API_SECRET;

if(!api_key||!api_secret){
    throw new Error('api_key or api_secret is missing');
}


const generate_signature =(signature:string,api_s:string)=>{
    return crypto.createHmac('sha256',api_s).update(signature).digest('hex');
};

export interface val{
    asset:string,free:string,locked:string
}

export interface balances {
    balances:Array<val>
}

export const get_all_bn_currency = async():Promise<val[]>=>{
    try {
        const time_stamp = Date.now() as unknown as string;
        const query_string = `timestamp=${time_stamp}`;
        const signature = generate_signature(query_string,api_secret);
        const rs = await axios.get<balances>(`${base_url}${endpoint}${query_string}&signature=${signature}`,{
            headers: { 'X-MBX-APIKEY': api_key }
        });
        const balance = rs.data.balances.filter((value:val)=>{
            return parseFloat(value.free)>0
        });
 
        
        return balance
    } catch (error) {
        console.error(error);
    }
    return [{asset:'no',free:"no",locked:"no"}];
};