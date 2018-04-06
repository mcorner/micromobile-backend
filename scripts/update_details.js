//NODE_ENV=production babel-node scripts/update_details.js
import Models from '../models';
import fetch from 'node-fetch';

const apiToken='PCOKETMATH TOKEN';
const BASE_URL='https://api.pocketmath.com/v3/';
const BASE_URL2='https://api.pocketmath.com/v2/';
const HEADERS = {'Authorization': 'Token token=' + apiToken};
const CAMPAIGN='168551';

async function fetchOrders(){
  var body = { };
  const res = await fetch(BASE_URL+'/campaigns/' + CAMPAIGN + '.json', {
	 method: 'GET',
	 body:    JSON.stringify(body),
	 headers: HEADERS,
  })
  const resJson = await res.json();
  const orders = resJson.orders.map((order) => {return order.pocketmath_id});
  return orders;
}

async function orderDetails(orderId){
  var body = { };
  const res = await fetch(BASE_URL2+'/orders/' + orderId + '.json', {
	 method: 'GET',
	 body:    JSON.stringify(body),
	 headers: HEADERS,
  })
  const resJson = await res.json();
  return resJson;
}

(async ()=>{
  const orders = await fetchOrders();
  for (let i = 0; i < orders.length; i++){
    let details = await orderDetails(orders[i]);
    await Models.orderDetail.upsert({orderId: orders[i].toString(), name: details.name });
  }
  process.exit();
})();
