const divMessagesUI = document.getElementById('messages');
const tbody = document.getElementById('almacen').getElementsByTagName('tbody')[0]
const totalStore = document.getElementById('total')


class View{
    renderNewProduct(product) {  
        const tr = document.createElement('tr')
        tr.innerHTML = `<td> ${product.id} </td>
                        <td> ${product.name} </td>
                        <td> ${product.units} </td>
                        <td> ${product.price.toFixed(2)} </td>
                        <td> ${product.productImport().toFixed(2)} </td>`
                        
        tr.setAttribute('id',product.id)                
        tbody.appendChild(tr)
    }

    renderEditProduct(product) {
        const productEditTable = document.getElementById(product.id);
        productEditTable.innerHTML = `<td> ${product.id} </td>
                                    <td> ${product.name} </td>
                                    <td> ${product.units} </td>
                                    <td> ${product.price.toFixed(2)} </td>
                                    <td> ${product.productImport().toFixed(2)} </td>`
        tbody.replaceChild(productEditTable,productEditTable)
    }

    renderDelProduct(id) {
        const productDelete = document.getElementById(id);
        tbody.removeChild(productDelete)
    }

    renderStoreImport(total) {
        totalStore.textContent = total.toFixed(2) + '€'
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
