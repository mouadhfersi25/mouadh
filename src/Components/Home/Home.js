import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const fileType = file.type; // Get the MIME type of the file
      if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/json') {
        console.log('Selected file:', file);

        // Read the file content
        const reader = new FileReader();
        reader.onload = async (e) => {
          const fileContent = e.target.result;
          console.log('File content:', fileContent);

          try {
            // Determine the API endpoint based on the file type
            let apiUrl = '';
            if (fileType === 'application/json') {
              apiUrl = 'https://api-platform.dvtech.tn/envoisms/json';
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
              apiUrl = 'https://api-platform.dvtech.tn/envoisms/xlsx';
            }

            // Send the file content to the corresponding API endpoint
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic test afke=='
              },
              body: JSON.stringify({
                "mt": "Bonjour, La MAE Assurances vous informe que votre Assurance DAREK arrive à échéance le 01-07-2024, vous pouvez payer votre cotisation en suivant ce lien:\nCeci est un SMS de Test",
                "msisdn": "21695993853",
                "sc": 394,
                "serviceId": 510,
                "date_envoi": "2024-01-02 20:00:00",
                "fileContent": fileContent // Include the file content
              })
            });

            if (!response.ok) {
              const result = await response.json();
              console.error('Request failed:', result);
              alert(`File upload failed: ${result.message}`);
            } else {
              const result = await response.json();
              console.log('Success:', result);
              setSuccessMessage('Upload réussi et envoi effectué avec succès!');
            }
          } catch (error) {
            console.error('Error during fetch:', error);
            alert(`An error occurred while uploading the file: ${error.message}`);
          }
        };

        reader.onerror = (e) => {
          console.error('File reading error:', e);
          alert('An error occurred while reading the file.');
        };

        try {
          reader.readAsText(file); // Read the file as text
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('Please select a .xlsx or .json file.');
      }
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Bienvenue sur Notre Site</h1>
        <p>Découvrez nos services et solutions pour vous aider à réussir.</p>
      </div>
      <div className="content">
        <p>
          Notre mission est de fournir des solutions de haute qualité qui répondent à vos besoins. Nous nous engageons à offrir des services exceptionnels et à dépasser vos attentes.
        </p>
        <p>
          Explorez notre site pour en savoir plus sur ce que nous proposons. Nous sommes là pour vous accompagner dans votre réussite.
        </p>
      </div>
      <div className="footer">
        <label htmlFor="file-upload" className="upload-button">
          Télécharger un fichier
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            accept=".xlsx,.json"
            onChange={handleFileUpload}
          />
        </label>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
