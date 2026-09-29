import { useSiteSettings } from "../services/siteSettings";
import Maintenance from "../pages/Maintenance";

// Wraps ONLY the public site's routes. Admin routes must be mounted outside
// this component so /admin stays reachable while maintenance mode is on.
export default function MaintenanceGate({ children }) {
  const { settings } = useSiteSettings();
  if (settings.system.maintenanceMode) {
    return <Maintenance />;
  }
  return children;
}
