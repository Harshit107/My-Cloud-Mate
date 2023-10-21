export function getFileSharingTemplate(fileName, fileType, fileSize, link) {
  return `<!DOCTYPE html>
  <html>
  <head>
    <style>
      table {
        padding : 20px;
        border : 1px solid green;

        width: 80%;
        border: 1px solid black;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin-bottom : 20px;
      }
      th, td {
        border-bottom : 1px solid #ccc;
          padding: 5px;
      }
      th {
        background-color: #ccc;
      }
      body {
        display : flex;
        flex-direction : column;
        justify-content: center;
        align-items : center;
        width : 100%;
        height : 400px
      }
      a {
        width : 100px;
        height : 30px;
        margin-top : 20px;
        padding : 5px 20px;
        background-color : #cccccc;
        border-radius : 5px;
        


      }

      @media screen and (max-width: 768px) {
        table {
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <h1>File Description</h1>
    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>${fileName}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>${fileType}</td>
        </tr>
          <tr>
          <td>Size</td>
          <td>${fileSize}</td>
        </tr>
      </tbody>
    </table>
    <a href=${link}>View </a>
  </body>
  </html>`;
}