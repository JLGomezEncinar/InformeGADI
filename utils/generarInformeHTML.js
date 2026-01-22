export function generarInformeHTML(datos) {

  const filas = datos.map((d, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${d.year}</td>
      <td>${d.category}</td>      
      <td>${d.nominee}</td>
      <td>${d.company}</td>
      <td>${d.winner}</td>
      <td>${d.voted} €</td>
    </tr>
  `).join('');

  const totalGanadores = datos.reduce(
    (total, d) => {if (d.winner === 1) return total + 1; else return total},
    0
  );

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; text-align: center; }
          th { background-color: #eee; }
          .resumen { margin-top: 20px; font-weight: bold; }
        </style>
      </head>
      <body>

        <h1>Informe de ventas</h1>

        <table>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Precio</th>
          </tr>
          ${filas}
        </table>

        <div class="resumen">
          Número de ventas: ${datos.length}<br/>
          Total: ${totalGanadores} 
        </div>

      </body>
    </html>
  `;
}
