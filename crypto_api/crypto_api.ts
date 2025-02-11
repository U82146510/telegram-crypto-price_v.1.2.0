import WebSocket from "ws";
import dotenv from 'dotenv';
import { EventEmitter } from "events";
dotenv.config();



class my_emiter extends EventEmitter{};
const emiter = new my_emiter();

// Add the pairs you want to watch. It has to be lowercase, the full list you could find on binance official API docs.
const symbol:Array<string> = ['solusdt','btcusdt'];  
const symbol_pairs = symbol.map((arg:string)=>`${arg}@ticker`).join("/");
const live_str = process.env.binance_live_price;

if(!live_str){
    throw new Error("binance websocket string missing");
}

const ws_url:string = live_str+symbol_pairs;  // keep the binance api link. 

export const ws:WebSocket = new WebSocket(ws_url);

ws.on('open',()=>{
    console.info('connected to binance.')
});


ws.on('error',(error:Error)=>{
    console.error('error',error);
});

ws.on('close',()=>{
    console.log('WebSocket connection closed');
});
