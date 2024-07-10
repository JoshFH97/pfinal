import React, { useState, useEffect } from 'react';
import { fetchPut, fetchPost, fetchDelete, fetchGet } from '../../Fetch/Api';
import ColorSchemesExample from '../NavBar/NavBar';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [filter, setFilter] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
    display: '',
    cameras: '',
    zoom: '',
    capacities: ''
  });
  const [loggedIn, setLoggedIn] = useState(false); // State to track if user is logged in
  const [showAddProductModal, setShowAddProductModal] = useState(false); // State to control modal visibility
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control delete confirmation modal
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store product ID to delete

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchGet('http://localhost:3000/products');
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        if (idUser) {
          const user = await fetchGet(`http://localhost:3000/users/${idUser}`);
          if (user.administrador) {
            setAdmin(true);
          }
          setLoggedIn(true); // User is logged in
        } else {
          console.warn('No user ID found in localStorage.');
          setLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct)
    try {
      const createdProduct = await fetchPost(newProduct, 'http://localhost:3000/products');
      setProducts([...products, createdProduct]);
      setFilteredProducts([...filteredProducts, createdProduct]);
      setShowAddProductModal(false); // Close modal after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetchDelete(`http://localhost:3000/products/${productIdToDelete}`);
      const updatedProducts = products.filter(product => product.id !== productIdToDelete);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setShowDeleteConfirmation(false); // Close modal after deleting
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

const handleEditProduct = async (productId, updatedProductDetails) => {
  try {
    const updatedProduct = { ...products.find(p => p.id === productId), ...updatedProductDetails, image: editedImage || products.find(p => p.id === productId).image };
    await fetchPut(updatedProduct, `http://localhost:3000/products/${productId}`);
    const updatedProducts = products.map(product =>
      product.id === productId ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditProduct(null); // Close modal after editing
  } catch (error) {
    console.error('Error updating product:', error);
  }
};



  const openEditModal = (product) => {
    setEditProduct(product);
    setEditedImage(product.image); // Initialize edited image with current product image
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setEditedImage(null); // Clear edited image state on modal close
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const filterProducts = () => {
    let filtered = products.filter(product => {
      return (
        (filter.title === '' || product.title.toLowerCase().includes(filter.title.toLowerCase())) &&
        (filter.minPrice === '' || product.price >= parseFloat(filter.minPrice)) &&
        (filter.maxPrice === '' || product.price <= parseFloat(filter.maxPrice)) &&
        (filter.display === '' || product.details.display.toLowerCase().includes(filter.display.toLowerCase())) &&
        (filter.cameras === '' || product.details.cameras.join(', ').toLowerCase().includes(filter.cameras.toLowerCase())) &&
        (filter.zoom === '' || product.details.zoom.toLowerCase().includes(filter.zoom.toLowerCase())) &&
        (filter.capacities === '' || product.details.capacities.join(', ').toLowerCase().includes(filter.capacities.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };

  const handleBuyProduct = (productId) => {
    if (!loggedIn) {
      // User is not logged in, handle login logic (redirect to login page or show a message)
      alert('Por favor, inicia sesión para comprar este producto.');
      // Optionally, you can redirect to a login page or show a login modal
    } else {
      // User is logged in, show a form to buy the product
      alert(`Se mostrará el formulario para comprar el producto con ID ${productId}.`);
      // Implement your logic to display a form for purchasing the product
    }
  };

  const handleAddNewProduct = async () => {
    setShowAddProductModal(true); // Show the add product modal
  };

  const handleSubmitNewProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newProduct = {
      title: formData.get('title'),
      price: parseFloat(formData.get('price')),
      image: formData.get('image'),
      details: {
        display: formData.get('display'),
        cameras: formData.get('cameras').split(',').map(camera => camera.trim()),
        zoom: formData.get('zoom'),
        capacities: formData.get('capacities').split(',').map(capacity => capacity.trim())
      }
    };
    console.log(newProduct)
    handleAddProduct(newProduct);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <ColorSchemesExample />
      <div className="container py-5">
        {/* Controles de administrador para agregar nuevo producto */}
        {admin && (
          <div className="mb-4">
            <button type="button" className="btn btn-primary" onClick={handleAddNewProduct}>
              Agregar Nuevo Producto
            </button>
          </div>
        )}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filtrar Productos</h5>
                <form className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="filterTitle" className="form-label">Título</label>
                    <input type="text" className="form-control" id="filterTitle" name="title" value={filter.title} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="filterMinPrice" className="form-label">Precio Mínimo</label>
                    <input type="number" className="form-control" id="filterMinPrice" name="minPrice" value={filter.minPrice} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="filterMaxPrice" className="form-label">Precio Máximo</label>
                    <input type="number" className="form-control" id="filterMaxPrice" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterDisplay" className="form-label">Pantalla</label>
                    <input type="text" className="form-control" id="filterDisplay" name="display" value={filter.display} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterCameras" className="form-label">Cámaras</label>
                    <input type="text" className="form-control" id="filterCameras" name="cameras" value={filter.cameras} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterZoom" className="form-label">Zoom</label>
                    <input type="text" className="form-control" id="filterZoom" name="zoom" value={filter.zoom} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterCapacities" className="form-label">Capacidades</label>
                    <input type="text" className="form-control" id="filterCapacities" name="capacities" value={filter.capacities} onChange={handleFilterChange} />
                  </div>
                </form>
                <div className="text-end mt-3">
                  <button type="button" className="btn btn-primary" onClick={filterProducts}>Aplicar Filtros</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Renderizado de productos */}
          {filteredProducts.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.price}</p>
                  <ul>
                    <li>{product.details.display}</li>
                    <li>{product.details.cameras.join(', ')}</li>
                    <li>{product.details.zoom}</li>
                    <li>{product.details.capacities.join(', ')}</li>
                  </ul>
                  <div className="text-center">
                    <button className="btn btn-primary me-2" onClick={() => handleBuyProduct(product.id)}>Comprar</button>
                    {admin && (
                      <button className="btn btn-warning me-2" onClick={() => openEditModal(product)}>Editar</button>
                    )}
                    {admin && (
                      <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal para agregar producto */}
        <div className={`modal fade ${showAddProductModal ? 'show' : ''}`} id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true" style={{ display: showAddProductModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmitNewProduct}>
                <div className="modal-header">
                  <h5 className="modal-title" id="addProductModalLabel">Agregar Nuevo Producto</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddProductModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" id="title" name="title" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="price" name="price" step="0.01" min="0" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="display" className="form-label">Pantalla</label>
                    <input type="text" className="form-control" id="display" name="display" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cameras" className="form-label">Cámaras</label>
                    <input type="text" className="form-control" id="cameras" name="cameras" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zoom" className="form-label">Zoom</label>
                    <input type="text" className="form-control" id="zoom" name="zoom" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="capacities" className="form-label">Capacidades</label>
                    <input type="text" className="form-control" id="capacities" name="capacities" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddProductModal(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Agregar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Modal para confirmación de eliminación */}
        <div className={`modal fade ${showDeleteConfirmation ? 'show' : ''}`} id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true" style={{ display: showDeleteConfirmation ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro que deseas eliminar este producto?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal para edición de producto */}
        {editProduct && (
          <div className={`modal fade show`} id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleEditProduct(editProduct.id, {
                    title: e.target.title.value,
                    price: parseFloat(e.target.price.value),
                    image: editedImage || editProduct.image,
                    details: {
                      display: e.target.display.value,
                      cameras: e.target.cameras.value.split(',').map(camera => camera.trim()),
                      zoom: e.target.zoom.value,
                      capacities: e.target.capacities.value.split(',').map(capacity => capacity.trim())
                    }
                  });
                }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="editProductModalLabel">Editar Producto</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeEditModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Título</label>
                      <input type="text" className="form-control" id="title" name="title" defaultValue={editProduct.title} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Precio</label>
                      <input type="number" className="form-control" id="price" name="price" step="0.01" min="0" defaultValue={editProduct.price} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Imagen</label>
                      <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="display" className="form-label">Pantalla</label>
                      <input type="text" className="form-control" id="display" name="display" defaultValue={editProduct.details.display} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cameras" className="form-label">Cámaras</label>
                      <input type="text" className="form-control" id="cameras" name="cameras" defaultValue={editProduct.details.cameras.join(', ')} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="zoom" className="form-label">Zoom</label>
                      <input type="text" className="form-control" id="zoom" name="zoom" defaultValue={editProduct.details.zoom} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="capacities" className="form-label">Capacidades</label>
                      <input type="text" className="form-control" id="capacities" name="capacities" defaultValue={editProduct.details.capacities.join(', ')} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
