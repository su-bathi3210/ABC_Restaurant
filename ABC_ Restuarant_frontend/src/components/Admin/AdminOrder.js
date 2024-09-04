import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

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

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`/api/orders/${orderId}`);
            setOrders(orders.filter(order => order.orderId !== orderId));
            alert(`Order ${orderId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('Failed to delete order. Please try again.');
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Orders Report', 14, 16);

        const tableColumn = ['User ID', 'Order Date', 'Delivery Address', 'Total Price', 'Status'];
        const tableRows = orders.map(order => [
            order.userId,
            order.orderDate,
            order.deliveryAddress,
            `$${order.totalPrice}`,
            order.status
        ]);

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('orders_report.pdf');
    };

    return (
        <div className='admin-orders'>
            <h2>Manage Orders</h2>
            <p>The Admin Panel provides a comprehensive interface for managing orders efficiently. Through this feature, administrators can view, delete, and generate PDF reports on all incoming orders in real-time. The intuitive dashboard allows for quick access to detailed order information, including customer details, order status, and payment records.</p>

            {error && <p className="error-message">{error}</p>}

            <table className='orders-table'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Delivery Address</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.userId}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.deliveryAddress}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '	tomato', color: 'white' }}
                                    onClick={() => deleteOrder(order.orderId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="generate-pdf-button" onClick={generatePDF}>Generate PDF</button>

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>

        </div>
    );
};

export default AdminOrder;
