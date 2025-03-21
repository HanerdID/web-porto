// src/hooks/useClientSide.ts
import { useState, useEffect } from "react";

export function useClientSide() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
