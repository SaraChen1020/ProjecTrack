import React from "react";
import PropTypes from "prop-types";

// styles
import "./PopupAlert.css";
import { TbAlertTriangle } from "react-icons/tb";

export default function PopupAlert(props) {
  return (
    <div className="popup-area">
      {props.alert && (
        <div className="alert">
          <TbAlertTriangle className="alert-icon" />
        </div>
      )}
      <div className="popup-message">{props.message}</div>
      <div className="btn-area">
        <div className="btn" onClick={props.onConfirm}>
          OK
        </div>
        <div className="btn" onClick={props.onCancel}>
          Cancel
        </div>
      </div>
    </div>
  );
}

PopupAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
