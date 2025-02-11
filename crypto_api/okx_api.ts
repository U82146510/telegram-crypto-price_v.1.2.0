import axios from "axios";
import crypto from 'crypto';
import dotenv from  'dotenv';
dotenv.config();

const api_key = process.env.api_key;
const secret_key = process.env.secret_key;
const pass_phrase = process.env.pass_phrase;

if(!api_key||!secret_key||!pass_phrase){
    throw new Error("api_key or secret_key or pass_phrase is missing");
}


const base_url = 'https://www.okx.com';
const endpoint = '/api/v5/account/balance';


const generate_signature = <T extends string,I extends "GET"|"POST",Z>(time_stamp:T,method:I,path:Z,body=''):string=>{
    const prehash = time_stamp  + method  + path + body;
    return crypto.createHmac('sha256',secret_key).update(prehash).digest('base64');
};


interface okx {
    totalEq:string;
    data:Array<{
        totalEq:string;
        details:[{eq:string;eqUsd:string;accAvgPx:string;ccy:string}];
    }>
}

const get_balance = async<T extends okx>():Promise<okx|undefined>=>{
    try {
        const time_stamp = new Date().toISOString();
        const signature = generate_signature(time_stamp,'GET',endpoint);

        const headers = {
            'OK-ACCESS-KEY': api_key,
            'OK-ACCESS-SIGN': signature,
            'OK-ACCESS-TIMESTAMP': time_stamp,
            'OK-ACCESS-PASSPHRASE': pass_phrase,
            'Content-Type': 'application/json',
        };

        const res = await axios.get<T>(`${base_url}${endpoint}`,{headers});
        return res.data    
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch balance");
    }
}

export interface obj{
    details: {
        currency: string;
        total_Tokens: string;
        value_in_USD: string;
        average_Buy: string;
    }[];
    totalEq:string;
}

export const get_all_currency = async():Promise<obj>=>{
    try {
        const res = await get_balance();
        if(res){
            const [arr] = res.data;
            const arr_of_crypto_pairs = arr.details.map((value)=>{
                return{
                    currency:value.ccy,
                    total_Tokens:value.eq,
                    value_in_USD:value.eqUsd,
                    average_Buy:value.accAvgPx

                }
            });
            return {details:arr_of_crypto_pairs,totalEq:arr.totalEq};
        }
    } catch (error) {
        console.log(error)
    }
    return {totalEq:'empty',details:[]};
}
