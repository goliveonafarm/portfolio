const generateUniqueId = (prefix = 'id') => {
    const now = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2);
    return `${prefix}-${now}-${random}`;
  };
  
  export default generateUniqueId;