import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Staff.css'

const StaffOrder = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        productIds: '',
        orderDate: '',
        totalPrice: '',
        status: 'Pending', // Default value for status
        deliveryAddress: '',
        paymentMethod: ''
    });
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        }
    };

    const handleEdit = (order) => {
        setEditingOrderId(order.orderId);
        setFormData({
            userId: order.userId,
            productIds: order.productIds.join(', '),
            orderDate: order.orderDate,
            totalPrice: order.totalPrice,
            status: order.status,
            deliveryAddress: order.deliveryAddress,
            paymentMethod: order.paymentMethod
        });
        setIsModalOpen(true); // Open the modal when editing
    };

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`/api/orders/${orderId}`);
            setOrders(orders.filter(order => order.orderId !== orderId));
            alert(`Order ${orderId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('Failed to delete order. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (editingOrderId) {
                // Update existing order
                await axios.put(`/api/orders/${editingOrderId}`, {
                    ...formData,
                    productIds: formData.productIds.split(',').map(id => id.trim())
                });
                alert(`Order ${editingOrderId} updated successfully`);
            } else {
                // Add new order
                await axios.post('/api/orders', {
                    ...formData,
                    productIds: formData.productIds.split(',').map(id => id.trim())
                });
                alert('New order added successfully');
            }
            setEditingOrderId(null);
            setIsModalOpen(false); // Close the modal after saving
            fetchOrders();
        } catch (error) {
            console.error('Error saving order:', error);
            setError('Failed to save order. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingOrderId(null);
        setFormData({
            userId: '',
            productIds: '',
            orderDate: '',
            totalPrice: '',
            status: 'Pending', // Reset status to default
            deliveryAddress: '',
            paymentMethod: ''
        });
        setIsModalOpen(false); // Close the modal on cancel
    };

    return (
        <div className='staff-orders'>
            <h2>Order Manage</h2>
            <p>The staff management system at ABC Restaurant allows staff members to efficiently handle customer orders through an intuitive interface. The system also enables staff to add new orders seamlessly, helping to maintain a smooth workflow and enhance overall service quality.</p>

            <button onClick={() => setIsModalOpen(true)} style={{ marginLeft: '15px', marginBottom: '15px', fontSize: '17px', padding: '12px 15px', backgroundColor: 'black', color: 'white' }}>Add New Order</button>

            {error && <p className="error-message">{error}</p>}

            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>P.ID</th>
                        <th>O.Date</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.userId}</td>
                            <td>{order.productIds.join(', ')}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.deliveryAddress}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '#600000', color: 'white' }}
                                    onClick={() => handleEdit(order)}>Edit</button>
                                <button
                                    style={{ backgroundColor: 'tomato', color: 'white' }}
                                    onClick={() => handleDelete(order.orderId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h3>{editingOrderId ? 'Edit Order' : 'Add New Order'}</h3>
                        <form className='order-form'>
                            <input
                                type='text'
                                name='userId'
                                placeholder='User ID'
                                value={formData.userId}
                                onChange={handleChange}
                            />

                            <input
                                type='text'
                                name='productIds'
                                placeholder='Product IDs (comma-separated)'
                                value={formData.productIds}
                                onChange={handleChange}
                            />

                            <input
                                type='date'
                                name='orderDate'
                                placeholder='Order Date'
                                value={formData.orderDate}
                                onChange={handleChange}
                            />

                            <input
                                type='number'
                                name='totalPrice'
                                placeholder='Total Price'
                                value={formData.totalPrice}
                                onChange={handleChange}
                            />

                            <input
                                type='text'
                                name='deliveryAddress'
                                placeholder='Delivery Address'
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />

                            <input
                                type='text'
                                name='paymentMethod'
                                placeholder='Payment Method'
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            />

                            <select
                                name='status'
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Reject">Reject</option>
                            </select>

                            <div className='form-actions'>
                                <button type='button' onClick={handleSave}>
                                    {editingOrderId ? 'Update Order' : 'Add Order'}
                                </button>
                                <button type='button' onClick={handleCancel}>Cancel </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StaffOrder;
