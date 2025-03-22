import Campo from "./Campo"
import useProducto from "../hooks/useProducto"
import { useEffect } from "react"

const Producto = () => {
    const {
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
    } = useProducto()

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={() => openModal(1)}>
                            <i className="fa solid fa-circle-plus" /> Crear Producto
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{i + 1}</td>
                                           <td>{product.title}</td>
                                           <td>{product.description}</td>
                                           <td>{product.category.name}</td>
                                           <td>{product.price.toLocaleString('es-HN', {style: 'currency', currency: 'HNL'})}</td>
                                           <td>
                                                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={() => openModal(2, product)}>
                                                    <i className="fa-solid fa-edit" />
                                                </button>
                                                <button className="btn btn-danger" onClick={() => deleteProducto(product.id)}>
                                                    <i className="fa-solid fa-trash" />
                                                </button>
                                           </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id='modalProducto' className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close" />
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id' />
                            <Campo idCampo='title' iconName='fa-solid fa-gift' placeholderName="Nombre del producto" tipoCampo="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Campo idCampo='description' iconName='fa-solid fa-comment' placeholderName="Descripción" tipoCampo="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <Campo idCampo='price' iconName='fa-solid fa-dollar-sign' placeholderName="Precio" tipoCampo="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => guardarEditarProducto()}>
                                <i className="fa-solid fa-floppy-disk" /> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss='modal'>Cerrar</button>
                        </div> 
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Producto