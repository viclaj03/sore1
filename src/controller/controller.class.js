const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        // Cambiamos los datos en el modelo
        try{
            const producto = this.store.addProduct(formData);
            this.view.renderNewProduct(producto);
        }catch(Error ){
            this.view.renderErrorMessage(Error) 
        }

        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
    }

    deleteProductFromStore(prodId) {
        // No olvides pedir confirmación y, si el producto
        // tiene unidades pedir una segunda confirmación
        const  producto = this.store.findProduct(Number(prodId))
        if (producto) {
            let respuesta1 = confirm("Deseas eliminar el produc con id:" + prodId)
            if(respuesta1){
                try{
                    this.store.delProduct(prodId)
                    this.view.renderDelProduct(prodId)
                }catch(error){
                    let respuesta2 = confirm(error)
                    if(respuesta2){
                        const id = prodId
                        const units = -producto.units
                        this.changeProductStock({id, units})
                        this.store.delProduct(prodId)
                        this.view.renderDelProduct(prodId)
                    }
                }
            }
        } else{
        this.view.renderErrorMessage("No existe el producto")
        }
        
    
    }

    changeProductInStore(formData) {
        try{
            const producto = this.store.changeProduct(formData)
            const totalStore = this.store.totalImport()
            this.view.renderEditProduct(producto)
            this.view.renderStoreImport(totalStore)
        }catch(error){
            this.view.renderErrorMessage(error)
        }

    }

    changeProductStock(formData) {
        try{
            const producto = this.store.changeProductUnits(formData)
            const totalStore = this.store.totalImport()
            this.view.renderEditProduct(producto)
            this.view.renderStoreImport(totalStore)
        }catch(error){
            this.view.renderErrorMessage(error)
        }
    }
}

module.exports = Controller
