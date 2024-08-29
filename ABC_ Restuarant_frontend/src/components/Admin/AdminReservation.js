import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Admin.css';

const AdminReservation = () => {
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/table')
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTables = tables.filter(table =>
    (table.name || '').toLowerCase().includes(searchTerm) ||
    (table.username || '').toLowerCase().includes(searchTerm) ||
    (table.date || '').toLowerCase().includes(searchTerm) ||
    (table.outlet || '').toLowerCase().includes(searchTerm) ||
    (table.status || '').toLowerCase().includes(searchTerm)
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name", "Contact No", "Username", "Date", "Time", "Guests", "Outlet", "Table No", "Status"
    ];
    const tableRows = [];

    filteredTables.forEach(table => {
      const tableData = [
        table.name,
        table.contactNo,
        table.username,
        table.date,
        table.time,
        table.guests,
        table.outlet,
        table.tableNo,
        table.status
      ];
      tableRows.push(tableData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Filtered Table Reservations Report", 14, 15);
    doc.save(`table_reservations_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="admin-table-container">
      <h6>Table Reservations</h6>
      <p>The admin of the ABC Restaurant can access a dedicated section within the admin panel to view all table reservations. This feature provides a comprehensive overview of upcoming, current, and past reservations, allowing the admin to manage bookings efficiently. The admin can see details such as the reservation date, time, customer name, contact information, and any special requests. This ensures smooth coordination and optimal use of the restaurant's seating capacity.</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Username, Date, Outlet, Status"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Username</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Outlet</th>
            <th>Table No</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredTables.map(table => (
            <tr key={table.id}>
              <td>{table.name}</td>
              <td>{table.contactNo}</td>
              <td>{table.username}</td>
              <td>{table.date}</td>
              <td>{table.time}</td>
              <td>{table.guests}</td>
              <td>{table.outlet}</td>
              <td>{table.tableNo}</td>
              <td>{table.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate PDF Button */}
      <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px' }}>
        Generate PDF
      </button>

      <footer className="admin-about-footer">
        <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminReservation;
