export const fetchGet = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
  
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
  
  export const fetchPost = async (userData, url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  export const fetchPut = async (userData, url) => {
    try {
      const response = await fetch(url+userData.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
  export const fetchDelete = async (url) => {
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };