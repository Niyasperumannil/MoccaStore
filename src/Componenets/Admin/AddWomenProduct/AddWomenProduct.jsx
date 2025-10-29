import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddWomenProduct.css';

const API_URL = 'https://backendmocca.onrender.com/api/womenproducts';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    brand: '',
    title: '',
    price: '',
    onlineExclusive: false,
    productType: '',
    fabric: '',
    color: '',
    pattern: '',
    fit: '',
    size: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];
      setForm(prev => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({
      brand: '',
      title: '',
      price: '',
      onlineExclusive: false,
      productType: '',
      fabric: '',
      color: '',
      pattern: '',
      fit: '',
      size: '',
      description: '',
      image: null,
    });
    setImagePreview(null);
    setEditingId(null);
    setMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        if (key !== 'image' && form[key] !== '') {
          formData.append(key, form[key]);
        }
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      if (editingId) {
        // Update product
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Product updated successfully!');
      } else {
        // Add product
        await axios.post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Product added successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      setMessage('Failed to save product.');
    }
  };

  const handleEdit = product => {
    setEditingId(product._id);
    setForm({
      brand: product.brand || '',
      title: product.title || '',
      price: product.price || '',
      onlineExclusive: product.onlineExclusive || false,
      productType: product.productType || '',
      fabric: product.fabric || '',
      color: product.color || '',
      pattern: product.pattern || '',
      fit: product.fit || '',
      size: product.size || '',
      description: product.description || '',
      image: null,
    });

    // Extract filename and build correct preview URL
    if (product.image) {
      const filename = product.image.split('/').pop();
      setImagePreview(`https://backendmocca.onrender.com/uploads/women/${filename}`);
    } else {
      setImagePreview(null);
    }

    setMessage('');
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      setMessage('Failed to delete product.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Women Products Admin Panel</h1>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          min="0"
          step="0.01"
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="onlineExclusive"
            checked={form.onlineExclusive}
            onChange={handleChange}
          />
          Online Exclusive
        </label>
        <input
          name="productType"
          value={form.productType}
          onChange={handleChange}
          placeholder="Product Type"
        />
        <input
          name="fabric"
          value={form.fabric}
          onChange={handleChange}
          placeholder="Fabric"
        />
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Color"
        />
        <input
          name="pattern"
          value={form.pattern}
          onChange={handleChange}
          placeholder="Pattern"
        />
        <input
          name="fit"
          value={form.fit}
          onChange={handleChange}
          placeholder="Fit"
        />
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <div className="image-upload-section">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
        {editingId && (
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Product List</h2>
      <div className="product-list">
        {products.length === 0 && <p>No products found.</p>}
        {products.map(product => {
          const filename = product.image ? product.image.split('/').pop() : null;
          const imageUrl = filename
            ? `https://backendmocca.onrender.com/uploads/women/${filename}`
            : 'https://via.placeholder.com/150';

          return (
            <div key={product._id} className="product-card">
              <img
                src={imageUrl}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p><strong>Exclusive:</strong> {product.onlineExclusive ? 'Yes' : 'No'}</p>
              <div className="product-actions">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
