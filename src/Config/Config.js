const Config = {
    baseURL: 'http://127.0.0.1:8000/api',
    getHeaders: () => {
      const token = localStorage.getItem('token');
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
  };
  
  export default Config;
  