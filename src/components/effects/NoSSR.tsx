import { useClientSide } from "../../hooks/useClientSide";

export default function NoSSR({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const isClient = useClientSide();

  if (!isClient) {
    return fallback !== null ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
