import { useEffect, useState } from "react";

function useLoading() {
    const [loading, setLoading] = useState(true);
            
        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 800); 
            
            return () => clearTimeout(timer);
        }, []);
  return {
      loading  
  }
}

export default useLoading