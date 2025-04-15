// utils/buildSearchQuery.js

export const buildSearchQuery = (params) => {
    const query = new URLSearchParams();
  
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== '' && v !== null && v !== undefined) {
            query.append(key, v);
          }
        });
      } else if (value !== '' && value !== null && value !== undefined) {
        query.append(key, value);
      }
    });
  
    return query.toString();
  };
  