// This component is used to display a shortlisted job card in profile.
import "./index.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faFileAlt,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "react/cjs/react.production.min";
import Cookies from "js-cookie";

class ShortlistItem extends Component {
  // This function is used to add and remove job from whishlist.
  onClickStar = async () => {
    const { jobDetails } = this.props;
    const { id } = jobDetails;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/shortlist`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const { onRemoveShortlistedJob } = this.props;
      onRemoveShortlistedJob();
    }
  };

  //This function is called when apply btn is clicked
  onClickApplyBtn = async () => {
    const { jobDetails } = this.props;
    const { id } = jobDetails;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobsapplied`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const { onClickApply } = this.props;
    onClickApply(); // This will fetch the applied jobs again and re-render the component
  };

  // Used to render all the shortlisted jobs.
  render() {
    const { jobDetails, isAppliedJob } = this.props;
    const {
      id,
      jobTitle,
      companyName,
      reviews = 7999,
      salary,
      jobDescription,
      companyLocation,
      jobType,
      posted = "2 days ago",
    } = jobDetails;

    const contractIcon = <FontAwesomeIcon icon={faBusinessTime} />;
    const rupeeIcon = <FontAwesomeIcon icon={faRupeeSign} />;
    const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const descriptionIcon = <FontAwesomeIcon icon={faFileAlt} />;

    return (
      <>
        <div className="job-card-container">
          <div className="job-card-container-header">
            <h1 className="job-card-role">{jobTitle}</h1>
            <i
              className="fas fa-star shortlist-card-save-btn"
              onClick={this.onClickStar}
            ></i>
          </div>
          <div className="job-card-company-reviews">
            <p className="job-card-company">{companyName}</p>
            <p className="job-card-reviews">{reviews} Reviews</p>
          </div>
          <div className="job-card-features-container">
            <div className="job-card-feature">
              {contractIcon}
              <p className="job-card-feature-value">{jobType}</p>
            </div>
            <div className="job-card-feature">
              {rupeeIcon}
              <p className="job-card-feature-value">{salary}</p>
            </div>
            <div className="job-card-feature">
              {locationIcon}
              <p className="job-card-feature-value">{companyLocation}</p>
            </div>
          </div>
          <div className="job-card-description-container">
            {descriptionIcon}
            <p className="job-card-description">
              {jobDescription.slice(0, 120)} ...
            </p>
          </div>
          <div className="job-card-footer">
            <p className="job-card-posted">{posted}</p>
            <div>
              <Link to={`jobs/${id}`}>
                <button className="job-card-view-details-btn" type="button">
                  View Details
                </button>
              </Link>
              {isAppliedJob ? (
                <button
                  className="job-card-apply-btn"
                  type="button"
                  onClick={this.onClickApplyBtn}
                >
                  Discard Application
                </button>
              ) : (
                <button
                  className="job-card-apply-btn"
                  type="button"
                  onClick={this.onClickApplyBtn}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShortlistItem;
