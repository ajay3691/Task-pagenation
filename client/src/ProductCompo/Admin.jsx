import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((resp) => {
        setProducts(resp.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/api/product/${id}`)
      .then((resp) => {
        setProducts(products.filter(prod => prod._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Calculate the indexes for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mt-3">
      <div className="row animated slideInLeft">
        <div className="col">
          <h3 className="text-success">Products Details</h3>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum nesciunt officiis perspiciatis quam voluptate. Alias consequuntur est ipsam iure modi mollitia placeat, ut voluptatem? Dolorem doloribus illo nihil odit veniam.
          </p>
          <Link to="/createprod" className="btn btn-warning btn-sm">
            Create Product
          </Link>
        </div>
      </div>
      <div className="row mt-3 animated zoomIn delay-1s">
        <div className="col">
          <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-1">
              <div className="row">
                {currentProducts.length > 0 ? (
                  currentProducts.map((p, index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="card">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="card-img-top"
                         style={{ width: '100%', height: '200px', objectFit: 'cover' }} /* Set a fixed width and height */
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">Code: {p.code}</p>
                          <p className="card-text">Category: {p.category}</p>
                          <p className="card-text">Description: {p.description}</p>
                          <div className="d-flex justify-content-between">
                            <Link className="btn btn-success" to={`/updateProd/${p._id}`}>
                              Edit
                            </Link>
                            <button onClick={() => deleteHandler(p._id)} className="btn btn-danger btn-sm text-white">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col">
                    <h3>No data or products</h3>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextPage}
                  disabled={currentProducts.length < productsPerPage}
                >
                  Next
                </button>
              </div>
              <ul className="pagination justify-content-center">
                {Array(Math.ceil(products.length / productsPerPage))
                  .fill()
                  .map((_, i) => (
                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
