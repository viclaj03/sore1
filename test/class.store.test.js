const Store = require('../src/store.class');

describe('Constructor', () => {
	test('Existe la clase Store', () => {
		expect(Store).toBeDefined();
	});
	
	test('Se crea un almacén', () => {
		let alm1=new Store(2);
		expect(alm1.id).toBe(2);
		expect(alm1.products).toEqual([]);
	});	
})

describe('función addProduct', () => {
	test('crea un producto en el almacén sin unidades y su id es 1', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(hecho).toBeTruthy();
		expect(almacen.products.length).toBe(1);
		expect(almacen.products[0]).toEqual({id: 1, name: 'Producto 2', price: 12.56, units: 0});
	});
	
	test('crea dos productos en el almacén y sus id son 1 y 2', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(hecho).toBeTruthy();
		expect(almacen.products.length).toBe(1);
		expect(almacen.products[0]).toEqual({id: 1, name: 'Producto 2', price: 12.56, units: 0});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12, units: 3});
		expect(hecho).toBeTruthy();
		expect(almacen.products.length).toBe(2);
		expect(almacen.products[1]).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 3});
	});	
		
	test('si crea dos productos y borra el 1º, al crear otro nuevo su id es 3', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
		almacen.products.splice(0, 1);
		hecho=almacen.addProduct({name:"Producto nuevo", price: 5.12});
		expect(almacen.products.length).toBe(2);
		expect(almacen.products[1]).toEqual({id: 3, name: 'Producto nuevo', price: 5.12, units: 0});
	});	

	test('no crea un producto sin nombre', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: '', price: 12.56})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto sin precio', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si precio no es nº', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1', price: 'asd'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si precio es negativo', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1', price: -12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades no es nº', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: 'asd'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades es negativo', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: -12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades no es entero', () => {
		let almacen=new Store(1);
		expect(() => almacen.addProduct({name: 'Product 1', price: 12, units: 1.12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
})

describe('función findProduct', () => {
	test('encuentra un producto que existe', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
		let prod=almacen.findProduct(2);
		expect(prod).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 0});
	});
	
	test('no encuentra un producto que no existe', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
		expect(almacen.findProduct(5)).toBeUndefined();
	});	
})

describe('función delProduct', () => {
	test('Borra un producto sin unidades', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12});
		expect(almacen.delProduct(2)).toEqual({id: 2, name: 'Producto 3', price: 0.12, units: 0});
		expect(almacen.products.length).toBe(1);
	});	

	test('no borra un producto con unidades', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56, units: 3});
		expect(() => almacen.delProduct(1)).toThrow();
		expect(almacen.products.length).toBe(1);
	});
	
	test('no borra un producto que no existe', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		hecho=almacen.addProduct({name:"Producto 3", price: 0.12});;
		expect(() => almacen.delProduct(8)).toThrow();
		expect(almacen.products.length).toBe(2);
	});
})

describe('función changeProduct', () => {
	test('cambia el precio de un producto', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(almacen.changeProduct({id:1, price: 5.34}));
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 5.34, units: 0}]);
	});
	
	test('cambia el precio a 0', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(almacen.changeProduct({id: 1, price: 0}));
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 0, units: 0}]);
	});	
	
	test('no cambia un producto si no se le pasa una id', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({name: 'asd'})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si precio no es nº', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({id:1, price: 'asd'})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si precio es negativo', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({id:1, price: -12})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si unidades no es nº', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({id:1, units: 'asd'})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si unidades es negativo', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56, units: 5});
		expect(() => almacen.changeProduct({id:1, units: -2})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 5}]);
	});
	
	test('no cambia un producto si unidades no es entero', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({id:1, units: 2.2})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});	
})

describe('función changeProductUnits', () => {
	test('suma unidades a un producto', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		almacen.findProduct(1).changeUnits(5);
		expect(almacen.changeProductUnits({id:1, units: 3}));
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 8}]);
	});
	
	test('resta unidades de un producto', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		almacen.findProduct(1).changeUnits(5);
		almacen.changeProductUnits({id:1, units: -3});
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 2}]);
	});
	
	test('no cambia un producto si no se le pasa una id', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProductUnits({name: 'asd'})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si unidades no es nº', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProductUnits({id:1, units: 'asd'})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});
	
	test('no cambia un producto si no hay suficientes unidades', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56, units: 5});
		expect(() => almacen.changeProductUnits({id:1, units: -7})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 5}]);
	});
	
	test('no cambia un producto si unidades no es entero', () => {
		let almacen=new Store(1);
		let hecho=almacen.addProduct({name: 'Producto 2', price: 12.56});
		expect(() => almacen.changeProduct({id:1, units: 2.2})).toThrow();
		expect(almacen.products).toEqual([{id:1, name: 'Producto 2', price: 12.56, units: 0}]);
	});	
})

test('Ordena alfabéticamente',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});
	expect(alm2.orderByName().map(item=>item.name)).toEqual(
		[ "Ábzz", "Adzz", "afzz", "Çcc", "Egb", "erc", "Éza", "Ñu", "Zzz"]
	);
});

test('Ordena por unidades',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});

	expect(alm2.orderByUnits().map(item=>item.units)).toEqual(
		[25, 12, 8, 5, 4, 2, 0, 0, 0]
	);
});

test('Lista stock bajo',() => {
	let alm2=new Store(2);
	alm2.addProduct({name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({name: 'Zzz', price: 12.56});
	alm2.addProduct({name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({name: 'Éza', price: 12.56});
	alm2.addProduct({name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({name: 'Adzz', price: 12.56});

	expect(alm2.underStock(5).map(item=>item.units)).toEqual(
		[0, 0, 2, 4, 0]
	);
});
