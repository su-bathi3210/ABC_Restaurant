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
            const response = await axios.get('/order');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`/order/${orderId}`);
            setOrders(orders.filter(order => order.orderId !== orderId));
            alert(`Order ${orderId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting order:', error);
            setError('Failed to delete order. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];  // Extracts only the date in YYYY-MM-DD format
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Orders Report', 14, 16);

        const tableColumn = ['Order ID', 'Order Date', 'Delivery Address', 'Total Price', 'Status'];
        const tableRows = orders.map(order => [
            order.orderId,
            formatDate(order.orderDate),  // Using the formatDate function
            order.deliveryAddress,
            `Rs.${order.totalPrice}`,
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
                        <th>Order ID</th>
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
                            <td>{order.orderId}</td>
                            <td>{formatDate(order.orderDate)}</td>  {/* Format the order date */}
                            <td>{order.deliveryAddress}</td>
                            <td>Rs.{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: 'tomato', color: 'white' }}
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
