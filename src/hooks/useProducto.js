import { useState } from "react"
import axios from "axios"
import { alertaSuccess, alertaError, alertaWarning } from "../alertas"
import Swal from "sweetalert2"

const useProducto = () => {
    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [price, setPrice] = useState('')
    const [operation, setOperation] = useState('')
    const url = 'https://api.escuelajs.co/api/v1/products'

    const getProducts = async () => {
        const response = await axios.get(url)
        setProducts(response.data)
    }

    const openModal = (operation, producto) => {
        setId('')
        setTitle('')
        setDescription('')
        setPrice('')

        if (operation === 1) {
            setTitleModal('Registrar Producto')
        } else if(operation === 2) {
            setTitleModal('Editar Producto')
            setId(producto.id)
            setTitle(producto.title)
            setDescription(producto.description)
            setPrice(producto.price)    
        }

        setOperation(operation)
    }

    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
            }
        }

        await axios(obj).then(() => {
            let mensaje = ''

            if (metodo === 'POST') {
                mensaje = 'Se guardó el producto'
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el producto'
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el producto'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getProducts()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    const guardarEditarProducto = () => {
        let payload, metodo, urlAxios

        if (title === '') {
            alertaWarning('Nombre del producto en blanco', title)
        } else if (description === '') {
            alertaWarning('Descripción del producto en blanco', description)
        } else if (price === '') {
            alertaWarning('Precio del producto en blanco', price)
        } else {
            payload = {
                title: title,
                description: description,
                price: price,
                categoryId: 1,
                images: ['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            }

            if (operation === 1) {
                metodo = 'POST'
                urlAxios = url
            } else {
                metodo = 'PUT'
                urlAxios = `${url}/${id}`
            }

            enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    const deleteProducto = (id) => {
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

    return {
        products,
        getProducts,
        openModal,
        id,
        setId,
        title,
        setTitle,
        description,
        setDescription,
        price,
        setPrice,
        titleModal,
        guardarEditarProducto,
        deleteProducto,
    }

}

export default useProducto