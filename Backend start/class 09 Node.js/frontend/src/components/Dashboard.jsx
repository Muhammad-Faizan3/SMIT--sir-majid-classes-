import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const API_URL = 'http://localhost:5000/api/products';

function Dashboard() {
  const { user, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, getAuthHeaders());
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        logout();
      } else {
        showMessage('Products load nahi ho sake', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.price === '') {
      showMessage('Sab fields fill karein', 'error');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, getAuthHeaders());
        showMessage('Product update ho gaya!');
      } else {
        await axios.post(API_URL, formData, getAuthHeaders());
        showMessage('Product add ho gaya!');
      }
      setFormData({ name: '', description: '', price: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      if (error.response?.status === 401) {
        logout();
      } else {
        showMessage(error.response?.data?.message || 'Product save nahi ho saka', 'error');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Kya aap sach me ye product delete karna chahte hain?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        showMessage('Product delete ho gaya!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        if (error.response?.status === 401) {
          logout();
        } else {
          showMessage('Product delete nahi ho saka', 'error');
        }
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', price: '' });
    setEditingId(null);
  };

  return (
    <div className="app">
      <header className="header dashboard-header">
        <div className="header-content">
          <div>
            <h1>MERN Stack - Products CRUD</h1>
            <p className="subtitle">Basic Create, Read, Update, Delete Application</p>
          </div>
          <div className="header-user">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <div className="user-name">{user?.name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
            <button className="btn btn-logout" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="container">
        <section className="form-section">
          <h2>{editingId ? '✏️ Product Edit Karein' : '➕ Naya Product Add Karein'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Samsung Galaxy"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Product ka description likhein"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (PKR):</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 50000"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>📋 Products List</h2>
            <span className="count-badge">Total: {products.length}</span>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>Abhi koi product nahi hai. Pehla product add karein! 👆</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-card-body">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-price">PKR {product.price.toLocaleString()}</div>
                    <div className="product-date">
                      {new Date(product.createdAt).toLocaleDateString('en-PK')}
                    </div>
                  </div>
                  <div className="product-card-footer">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="footer">
        <p>Built with ❤️ using MongoDB, Express, React, Node.js (MERN)</p>
      </footer>
    </div>
  );
}

export default Dashboard;
