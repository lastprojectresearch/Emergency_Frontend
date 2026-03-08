import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import AlertCard from "./AlertCard";

const BASE_URL = "http://127.0.0.1:5000";

export default function PoliceDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("anzen_user"));

  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLatestAlert = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/alerts/latest`);
      const data = await res.json();
      setAlertData(data.alert || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestAlert();
    const timer = setInterval(fetchLatestAlert, 5000);
    return () => clearInterval(timer);
  }, [fetchLatestAlert]);

  const acknowledgeAlert = async () => {
    if (!alertData?.id) return;

    try {
      setSaving(true);

      const res = await fetch(`${BASE_URL}/alerts/${alertData.id}/acknowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acknowledged_by: user?.organization_name || "Police Team",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to acknowledge alert");
      }

      alert("Alert acknowledged and saved successfully");
      setAlertData(null);
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("anzen_user");
    navigate("/login");
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "--";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="police-page">
      <div className="police-header">
        <div className="police-header-top">
          <div>
            <h1 className="police-title">
              {user?.organization_name || "Police Dashboard"}
            </h1>
            <p className="police-subtitle">
              {user?.city || "Police Emergency Service"}
            </p>
          </div>

          <button onClick={handleLogout} className="police-logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="police-content">
        {loading ? (
          <div className="police-info-card">Loading latest alert...</div>
        ) : alertData ? (
          <AlertCard
            alertData={alertData}
            saving={saving}
            onAcknowledge={acknowledgeAlert}
            formatDateTime={formatDateTime}
          />
        ) : (
          <div className="police-success-card">No active emergency alerts</div>
        )}

        {/* Hard coded nearest emergency services */}
        <div className="emergency-services">
          <div className="service-group">
            <div className="service-header ambulance">
              <span>🚑 Suwasariya Ambulances</span>
              <span className="count">1</span>
            </div>
            
            <div className="service-header police">
              <span> 🏥 Nearest  Hospitals</span>
              </div>
            <div className="service-card">
              <div>
                <strong>Dr. Neville Fernando State Teaching Hospital - NFTH</strong>
                <p>011-2345678</p>
              </div>
              <span className="distance">0.7 km</span>
            </div>

            <div className="service-card">
              <div>
                <strong>Medihelp Hospital - Athurugiriya</strong>
                <p>011-2345678</p>
              </div>
              <span className="distance">1.2 km</span>
            </div>
          </div>

          <div className="service-group">
            <div className="service-header police">
              <span>👮  Nearest Police Stations</span>
            </div>

            <div className="service-card">
              <div>
                <strong>Kaduwela Police Station</strong>
                <p>011-2345678</p>
              </div>
              <span className="distance">1.2 km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}