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
        status: 'Pending', 
        deliveryAddress: '',
        paymentMethod: ''
    });
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/order');
            const formattedOrders = response.data.map(order => ({
                ...order,
                orderDate: order.orderDate.split('T')[0], // Only keep date, remove time
            }));
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        }
    };

    const handleEdit = (order) => {
        setEditingOrderId(order.orderId);
        setFormData({
            orderId: order.orderId,
            productIds: order.productIds.join(', '),
            orderDate: order.orderDate,
            totalPrice: order.totalPrice,
            status: order.status,
            deliveryAddress: order.deliveryAddress,
            paymentMethod: order.paymentMethod
        });
        setIsModalOpen(true); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (editingOrderId) {
                await axios.put(`/order/${editingOrderId}`, {
                    ...formData,
                    productIds: formData.productIds.split(',').map(id => id.trim())
                });
                alert(`Order ${editingOrderId} updated successfully`);
            } else {
                await axios.post('/order', {
                    ...formData,
                    productIds: formData.productIds.split(',').map(id => id.trim())
                });
                alert('New order added successfully');
            }
            setEditingOrderId(null);
            setIsModalOpen(false); 
            fetchOrders();
        } catch (error) {
            console.error('Error saving order:', error);
            setError('Failed to save order. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingOrderId(null);
        setFormData({
            orderId: '',
            productIds: '',
            orderDate: '',
            totalPrice: '',
            status: 'Pending', 
            deliveryAddress: '',
            paymentMethod: ''
        });
        setIsModalOpen(false); 
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
                        <th>Order ID</th>
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
                            <td>{order.orderId}</td>
                            <td>{order.productIds.join(', ')}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.deliveryAddress}</td>
                            <td>Rs.{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: 'tomato', color: 'white' }}
                                    onClick={() => handleEdit(order)}>Edit</button>
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
