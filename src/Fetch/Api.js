export const fetchLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Hubo un problema con la solicitud Fetch:', error);
      throw error;
    }
  };
  
  export const fetchRegister = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Hubo un problema con la solicitud Fetch:', error);
      throw error;
    }
  };
  