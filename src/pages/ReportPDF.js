import React from 'react';

function ReportPDF() {
  const downloadPDF = async () => {
    const res = await fetch('http://localhost:5000/api/pdf/report', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment_report.pdf';
    a.click();
  };

  return <button onClick={downloadPDF}>Download Report PDF</button>;
}

export default ReportPDF;
