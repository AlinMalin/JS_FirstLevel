
var catalog = {
	container: '.products',
	products: [
			{id:1, title:'Платье', size: 44, price:2500},
 			{id:2, title:'Джинсы', size: 46, price:1500,},
 			{id:3, title:'Ботинки', size: 37, price:3500}, 
			{id:4, title:'Пальто', size: 44, price:8000}
	],
	defaultImg: 'https://placehold.it/200x150',
	render(){
		var block = document.querySelector(this.container);
		for (var product of this.products){
			block.insertAdjacentHTML('beforeend', this.getMarkUp(product));
		}
	},
	getMarkUp(product){
		return `<div class='product-item'>
					<img src='${this.defaultImg}' alt='img'>
					<div class='desc'>
						<h3>${product.title}<h3>
						<p>Размер ${product.size}</p>
					 	<p>${product.price} руб</p>
					 	<p class='invisible prodID'>${product.id}</p>
					 	<button class='buy-btn${product.id}'>Купить</button>
					 </div>
				</div>`
	}
};


var cart = {
	total: {},
	container: '.cart-block',
	products: [],
	calcTotal(){
		var sum = 0,
			items = 0;
		for (var product of this.products){
			sum += product.price*product.quantity;
			items +=product.quantity;
		}
		this.total = {sum: sum, items: items};
	},
	render(){
		var block = document.querySelector(this.container);
		if (!this.products.length) {
			block.textContent = 'Ваша корзина пуста';
			return
		}
		if (block.textContent == 'Ваша корзина пуста') {
			block.textContent = '';
			
		}
		for (var product of this.products) {
			block.insertAdjacentHTML ('beforeend', this.getMarkUp(product));
		}
		this.renderTotal(block);
	},
	renderTotal(block){
		this.calcTotal();
		block.insertAdjacentHTML('beforeend',`<p class='total' id='resultP'>В корзине ${this.total.items} товаров на сумму ${this.total.sum} рублей</p>`);
	},
	renderTotal2(block){
		this.calcTotal();
		block.textContent=`В корзине ${this.total.items} товаров на сумму ${this.total.sum} рублей`;
	},
	getMarkUp (product){
		if (product.quantity>1) {
			var id = 'p1'+ product.id;
			var block = document.getElementById(id);
			block.textContent = `${product.quantity} шт`;
			id = 'p2'+ product.id;
			block = document.getElementById(id);
			block.textContent = `${product.quantity*product.price} руб`;
			return
		} 
				return `<div class='cart-item' id=cart-item${product.id}'> 
					<h4>${product.title}</h4>
					<p id='p1${product.id}'>${product.quantity} шт</p>
					<p id='p2${product.id}'>${product.quantity*product.price} руб</p>
					<button class='del-btn'>X</button>
				</div>`

	}
};

catalog.render();
cart.render();

var buyBtn = document.querySelector('.buy-btn1');
buyBtn.addEventListener('click', function(event){
	var prodId = event.target.className[event.target.className.length-1];
	console.log (prodId);
	for ( var productInCat of catalog.products) {
		if (productInCat.id == prodId) {
			var prodToCart = Object.assign({}, productInCat);//скопировала из каталога, теперь надо проверить наличие корзине
			prodToCart['quantity'] = 1;
			break;
		};
	};
	if (!checkCart(prodToCart.id)){
		cart.products.push(prodToCart);
	};
	cart.render();
});

var buyBtn2 = document.querySelector('.buy-btn2');
buyBtn2.addEventListener('click', function(event){
	var prodId = event.target.className[event.target.className.length-1];
	console.log (prodId);
	for ( var productInCat of catalog.products) {
		if (productInCat.id == prodId) {
			var prodToCart = Object.assign({}, productInCat);//скопировала из каталога, теперь надо проверить наличие корзине
			prodToCart['quantity'] = 1;
			break;
		};
	};
	if (!checkCart(prodToCart.id)){
		cart.products.push(prodToCart);
	};
	cart.render();
});



function checkCart(id){
	for (var item of cart.products) {
		if (item.id == id) {
			item.quantity +=1; //нашли соответсвие, изменина квантити
			return true;
		} ;
	}
	return false;
}
	

