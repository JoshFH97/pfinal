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
      alert('Please log in to buy this product.');
      // Optionally, you can redirect to a login page or show a login modal
    } else {
      // User is logged in, show a form to buy the product
      alert(`Form to buy product with ID ${productId} will be displayed.`);
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

    handleAddProduct(newProduct);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <ColorSchemesExample />
      <div className="container py-5">
        {/* Admin controls for adding new product */}
        {admin && (
          <div className="mb-4">
            <button type="button" className="btn btn-primary" onClick={handleAddNewProduct}>
              Add New Product
            </button>
          </div>
        )}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filter Products</h5>
                <form className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="filterTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="filterTitle" name="title" value={filter.title} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="filterMinPrice" className="form-label">Min Price</label>
                    <input type="number" className="form-control" id="filterMinPrice" name="minPrice" value={filter.minPrice} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="filterMaxPrice" className="form-label">Max Price</label>
                    <input type="number" className="form-control" id="filterMaxPrice" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterDisplay" className="form-label">Display</label>
                    <input type="text" className="form-control" id="filterDisplay" name="display" value={filter.display} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterCameras" className="form-label">Cameras</label>
                    <input type="text" className="form-control" id="filterCameras" name="cameras" value={filter.cameras} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterZoom" className="form-label">Zoom</label>
                    <input type="text" className="form-control" id="filterZoom" name="zoom" value={filter.zoom} onChange={handleFilterChange} />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filterCapacities" className="form-label">Capacities</label>
                    <input type="text" className="form-control" id="filterCapacities" name="capacities" value={filter.capacities} onChange={handleFilterChange} />
                  </div>
                  <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={filterProducts}>Apply Filters</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                  <p className="card-text">Display: {product.details.display}</p>
                  <p className="card-text">Cameras: {product.details.cameras.join(', ')}</p>
                  <p className="card-text">Zoom: {product.details.zoom}</p>
                  <p className="card-text">Capacities: {product.details.capacities.join(', ')}</p>
                      <button className="btn btn-primary" onClick={() => handleBuyProduct(product.id)}>Buy Now</button>
                  <div className="d-grid gap-2">
                  

                    {admin && (
                      <div>
                        <button className="btn btn-secondary me-2" onClick={() => openEditModal(product)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for adding new product */}
      {showAddProductModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddProductModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitNewProduct}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" step="0.01" min="0" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="display" className="form-label">Display</label>
                    <input type="text" className="form-control" id="display" name="display" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cameras" className="form-label">Cameras</label>
                    <input type="text" className="form-control" id="cameras" name="cameras" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zoom" className="form-label">Zoom</label>
                    <input type="text" className="form-control" id="zoom" name="zoom" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="capacities" className="form-label">Capacities</label>
                    <input type="text" className="form-control" id="capacities" name="capacities" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddProductModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Modal for deleting product */}
      {showDeleteConfirmation && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
