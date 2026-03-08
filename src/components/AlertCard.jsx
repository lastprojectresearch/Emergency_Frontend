import "./AlertCard.css";

export default function AlertCard({
  alertData,
  saving,
  onAcknowledge,
  formatDateTime,
}) {
  const getSeverityClass = (severity) => {
    const value = (severity || "LOW").toUpperCase();

    if (value === "HIGH") return "alert-severity-high";
    if (value === "MEDIUM") return "alert-severity-medium";
    return "alert-severity-low";
  };

  const getSeverityText = (severity) => {
    const value = (severity || "LOW").toUpperCase();

    if (value === "HIGH") return "HIGH SEVERITY";
    if (value === "MEDIUM") return "MEDIUM SEVERITY";
    return "LOW SEVERITY";
  };

  return (
    <div className="alert-card-box">
      <div className="alert-card-top">
        <span
          className={`alert-severity-badge ${getSeverityClass(
            alertData?.severity
          )}`}
        >
          {getSeverityText(alertData?.severity)}
        </span>
      </div>

      <div className="alert-row-box">
        <span className="alert-label">Accident Date & Time</span>
        <span className="alert-value">
          {formatDateTime ? formatDateTime(alertData?.timestamp) : "-"}
        </span>
      </div>

      <div className="alert-row-box">
        <span className="alert-label">Location</span>
        <span className="alert-value">{alertData?.location || "-"}</span>
      </div>

      <div className="alert-row-box">
        <span className="alert-label">Map</span>
        <span className="alert-value">
          {alertData?.map_url ? (
            <a
              href={alertData.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="alert-map-link"
            >
              Open in Google Maps
            </a>
          ) : (
            "-"
          )}
        </span>
      </div>

      <div className="alert-grid-box">
        <div className="alert-detail-box">
          <span className="alert-label">Vehicle ID</span>
          <span className="alert-value">{alertData?.vehicle_id || "-"}</span>
        </div>

        <div className="alert-detail-box">
          <span className="alert-label">Driver</span>
          <span className="alert-value">{alertData?.driver_name || "-"}</span>
        </div>

        <div className="alert-detail-box">
          <span className="alert-label">Phone</span>
          <span className="alert-value">
            {alertData?.phone_number ? (
              <a
                href={`tel:${alertData.phone_number}`}
                className="alert-phone-link"
              >
                {alertData.phone_number}
              </a>
            ) : (
              "-"
            )}
          </span>
        </div>

        <div className="alert-detail-box">
          <span className="alert-label">Passengers</span>
          <span className="alert-value">
            {alertData?.passenger_count ?? 0}
          </span>
        </div>
      </div>

      <div className="alert-actions">
        <button
          className="alert-ok-btn"
          onClick={onAcknowledge}
          disabled={saving}
        >
          {saving ? "Saving..." : "OK"}
        </button>
      </div>
    </div>
  );
}