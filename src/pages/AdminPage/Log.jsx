import React, { useEffect, useState } from "react";
import AdminService from "../../services/AdminService";

export default function Log() {

    const [logs, setLog] = useState([]);

    useEffect(() => {
        let adminService = new AdminService();
        adminService.getAllLogs().then((result) => setLog(result.data.data));
      },[]);
  return (
    <table>
      <thead>
        <tr>
          <th>Log ID</th>
          <th>DATE</th>
          <th>CONTENT</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.date}</td>
            <td>{log.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
