const products = [
{ id:1,name:"Nike Shoes",price:5000,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"},
{ id:2,name:"U.S. Polo T-Shirt",price:1800,image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80"},
{ id:3,name:"Luxury Watch",price:12000,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"},
{ id:4,name:"Gucci Perfume",price:9000,image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&q=80"},
{ id:5,name:"Louis Vuitton Bag",price:25000,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80"},
{ id:6,name:"Ray-Ban Sunglasses",price:7000,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"},
{ id:7,name:"iPhone",price:80000,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"},
{ id:8,name:"Samsung TV",price:60000,image:"https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80"}
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function displayProducts(list=products){
let p=document.getElementById("product-list");
p.innerHTML="";
list.forEach(x=>{
p.innerHTML+=`
<div class="product">
<img src="${x.image}">
<h3>${x.name}</h3>
<p>₹${x.price}</p>
<button onclick="add(${x.id})">Add</button>
</div>`;
});
}

function add(id){
let item=cart.find(x=>x.id==id);
if(item){item.qty++;}
else{
let p=products.find(x=>x.id==id);
cart.push({...p,qty:1});
}
save();
}

function plus(id){cart.find(x=>x.id==id).qty++;save();}
function minus(id){
let i=cart.find(x=>x.id==id);
i.qty--;
if(i.qty<=0)cart=cart.filter(x=>x.id!=id);
save();
}

function save(){
localStorage.setItem("cart",JSON.stringify(cart));
update();
}

function update(){
document.getElementById("cart-count").innerText=cart.length;
let c=document.getElementById("cart-items");
c.innerHTML="";
let t=0;
cart.forEach(x=>{
t+=x.price*x.qty;
c.innerHTML+=`
<li>${x.name} ₹${x.price} x ${x.qty}
<button onclick="plus(${x.id})">+</button>
<button onclick="minus(${x.id})">-</button>
</li>`;
});
document.getElementById("total").innerText=t;
}

function searchProduct(){
let s=document.getElementById("search").value.toLowerCase();
displayProducts(products.filter(x=>x.name.toLowerCase().includes(s)));
}

function checkout(){
if(cart.length==0) alert("Cart Empty");
else{
alert("Order Placed!");
cart=[];
localStorage.removeItem("cart");
update();
}
}

displayProducts();
update();
