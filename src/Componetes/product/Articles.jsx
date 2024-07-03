import React, { useState } from 'react';

const ProductSection = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone X",
      price: 399,
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img1.webp",
      details: {
        display: "5.8″ Super Retina HD display1",
        cameras: ["Wide", "Telephoto"],
        zoom: "2x Optical zoom range",
        capacities: ["64GB", "256GB"]
      }
    },
    {
      id: 2,
      title: "iPhone 11",
      price: 499,
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img2.webp",
      details: {
        display: "6.1″ Liquid Retina HD display1",
        cameras: ["Ultra Wide", "Wide"],
        zoom: "2x Optical zoom range",
        capacities: ["64GB", "128GB", "256GB"]
      }
    },
    {
      id: 3,
      title: "iPhone 11 Pro",
      price: 599,
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img3.webp",
      details: {
        display: "5.8″ Super Retina HD display1",
        cameras: ["Ultra Wide", "Wide", "Telephoto"],
        zoom: "4x Optical zoom range",
        capacities: ["64GB", "256GB", "512GB"]
      }
    }
  ]);

  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      title: "New iPhone",
      price: 699,
      image: "https://example.com/new-product-image.jpg",
      details: {
        display: "6.5″ Super Retina XDR display1",
        cameras: ["Ultra Wide", "Wide", "Telephoto"],
        zoom: "5x Optical zoom range",
        capacities: ["128GB", "256GB", "512GB"]
      }
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (productId, updatedProductDetails) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...updatedProductDetails } : product
    );
    setProducts(updatedProducts);
    setEditProduct(null); // Close modal after editing
  };

  const openEditModal = (product) => {
    setEditProduct(product);
  };

  const closeEditModal = () => {
    setEditProduct(null);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4 mb-md-0">
              <div className="card text-black">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <div className="text-center mt-1">
                    <h4 className="card-title">{product.title}</h4>
                    <h6 className="text-primary mb-1 pb-3">Starting at ${product.price}</h6>
                  </div>
                  <div className="text-center">
                    <div
                      className="p-3 mx-n3 mb-4"
                      style={{ backgroundColor: "#eff1f2" }}
                    >
                      <h5 className="mb-0">Quick Look</h5>
                    </div>
                    <div className="d-flex flex-column mb-4">
                      <span className="h1 mb-0">{product.details.display}</span>
                      <span>{product.details.cameras.join(", ")}</span>
                    </div>
                    <div className="d-flex flex-column mb-4">
                      <span className="h1 mb-0">
                        <i className="fas fa-camera-retro" />
                      </span>
                      <ul className="list-unstyled mb-0">
                        {product.details.cameras.map((camera, index) => (
                          <li key={index}>{camera}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="d-flex flex-column mb-4">
                      <span className="h1 mb-0">{product.details.zoom}</span>
                    </div>
                    <div
                      className="p-3 mx-n3 mb-4"
                      style={{ backgroundColor: "#eff1f2" }}
                    >
                      <h5 className="mb-0">Capacity</h5>
                    </div>
                    <div className="d-flex flex-column mb-4 lead">
                      {product.details.capacities.map((capacity, index) => (
                        <span key={index} className="mb-2">{capacity}</span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <button
                      type="button"
                      className="btn btn-primary flex-fill me-1"
                      data-mdb-ripple-color="dark"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger flex-fill ms-1"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-success flex-fill ms-1"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Add new product button */}
          <div className="col-md-6 col-lg-4 mb-4 mb-md-0">
            <div className="card text-black">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={handleAddProduct}
                >
                  Add New Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing product */}
      {editProduct && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="editTitle" defaultValue={editProduct.title} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="editPrice" defaultValue={editProduct.price} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDisplay" className="form-label">Display</label>
                    <input type="text" className="form-control" id="editDisplay" defaultValue={editProduct.details.display} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCameras" className="form-label">Cameras (comma separated)</label>
                    <input type="text" className="form-control" id="editCameras" defaultValue={editProduct.details.cameras.join(', ')} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editZoom" className="form-label">Zoom</label>
                    <input type="text" className="form-control" id="editZoom" defaultValue={editProduct.details.zoom} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editCapacities" className="form-label">Capacities (comma separated)</label>
                    <input type="text" className="form-control" id="editCapacities" defaultValue={editProduct.details.capacities.join(', ')} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    handleEditProduct(editProduct.id, {
                      title: document.getElementById('editTitle').value,
                      price: parseInt(document.getElementById('editPrice').value),
                      details: {
                        display: document.getElementById('editDisplay').value,
                        cameras: document.getElementById('editCameras').value.split(',').map(camera => camera.trim()),
                        zoom: document.getElementById('editZoom').value,
                        capacities: document.getElementById('editCapacities').value.split(',').map(capacity => capacity.trim())
                      }
                    });
                  }}>Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
