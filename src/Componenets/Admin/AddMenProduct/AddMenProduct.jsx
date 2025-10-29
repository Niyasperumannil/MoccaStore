import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddmenProduct.css'; // CSS file

const API_URL = 'https://backendmocca.onrender.com/api/menproducts';

const AdminDashboard = () => {
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
  const [editingId, setEditingId] = useState(null);

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, image: files[0] });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) {
      if (form[key] !== null) {
        data.append(key, form[key]);
      }
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product updated!');
      } else {
        await axios.post(API_URL, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product added!');
      }
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
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to save product.');
    }
  };

  // Populate form for editing
  const handleEdit = (product) => {
    setForm({ ...product, image: null });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Product deleted');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-container">
      <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
      <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <label>
          <input type="checkbox" name="onlineExclusive" checked={form.onlineExclusive} onChange={handleChange} />
          Online Exclusive
        </label>
        <input type="text" name="productType" placeholder="Product Type" value={form.productType} onChange={handleChange} />
        <input type="text" name="fabric" placeholder="Fabric" value={form.fabric} onChange={handleChange} />
        <input type="text" name="color" placeholder="Color" value={form.color} onChange={handleChange} />
        <input type="text" name="pattern" placeholder="Pattern" value={form.pattern} onChange={handleChange} />
        <input type="text" name="fit" placeholder="Fit" value={form.fit} onChange={handleChange} />
        <input type="text" name="size" placeholder="Size" value={form.size} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={`https://backendmocca.onrender.com${product.image}`} alt={product.title} />
            <h3>{product.title}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
