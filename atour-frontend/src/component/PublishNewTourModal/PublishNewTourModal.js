import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { publishNewTour } from "../../action/ModalAction";
import autobind from "react-autobind";
import * as validation from "../../utils/validation";
import "./styles.css";
import { Grid, Button } from "semantic-ui-react";
import { publishTour } from "../../action/TourAction";
import { updated } from "../../action/ApplicationAction";
import PopUpModal from "../PopUpModal/PopUpModal";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label className="publish-new-tour-label">{label}</label>
      <div>
        <input
          onChange={onChange}
          className="publish-new-tour-input form-control"
          type={inputType || "text"}
          value={value}
        />
        <div className="error-text">{error && error !== true ? error : ""}</div>
      </div>
    </div>
  );
}

class PublishNewTourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      updated: false,
      value: {
        tourName: "",
        price: "",
        minimumSize: "",
        maximumSize: "",
        detail: "",
        imageUrl: ""
      },
      error: {
        tourName: true,
        price: true,
        minimumSize: true,
        maximumSize: true,
        detail: true,
        imageUrl: true
      }
    };

    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdated && this.props.isOpen === "publishNewTour") {
      this.setState({ updated: true });
      this.props.updated();
    }
  }

  componentWillUnmount() {
    this.props.updated();
  }

  validateAllValue() {
    const {
      tourName,
      price,
      minimumSize,
      maximumSize,
      detail,
      imageUrl
    } = this.state.value;
    const {
      validateTourName,
      validatePrice,
      validateMaximumSize,
      validateMinimumSize,
      validateDetail,
      validateImageUrl
    } = validation;
    const error = {
      tourName: validateTourName(tourName),
      price: validatePrice(price),
      minimumSize: validateMinimumSize(minimumSize),
      maximumSize: validateMaximumSize(maximumSize, minimumSize),
      detail: validateDetail(detail),
      imageUrl: validateImageUrl(imageUrl)
    };
    this.setState({ error });
    return (
      error.tourName ||
      error.price ||
      error.minimumSize ||
      error.maximumSize ||
      error.detail ||
      error.imageUrl
    );
  }

  async onSubmitNewTourInfo() {
    const {
      tourName,
      price,
      minimumSize,
      maximumSize,
      detail,
      imageUrl
    } = this.state.value;
    const { userId, token } = this.props;
    if (!this.validateAllValue()) {
      const tour = {
        tourName,
        price,
        minimumSize,
        maximumSize,
        detail,
        imageUrl,
        userId
      };
      this.props.publishTour(tour, token);
    }
  }

  onSubmitted() {
    // update reducers
    this.onCloseModal();
  }

  onCloseModal() {
    this.setState({});
    this.props.onCloseModal();
  }

  onFieldChange(
    field,
    value,
    validate = null,
    isCompare = false,
    mainValue = null
  ) {
    const newValue = this.state.value;
    const newError = this.state.error;
    if (validate !== null) {
      const error = validate(value);
      newError[field] = error;
    }
    if (isCompare) {
      newValue[field] = mainValue;
    } else {
      newValue[field] = value;
    }
    this.setState({ value: newValue, error: newError });
  }

  renderPublishNewTour() {
    const { value } = this.state;
    return (
      <div className="publish-new-tour-form-control">
        <h2>Publish New Tour</h2>
        <hr color="black" size="50" />
        <Field
          label="Tour name"
          value={value.tourName}
          onChange={e =>
            this.onFieldChange(
              "tourName",
              e.target.value,
              validation.validateTourName
            )
          }
          error={this.state.error.tourName}
        />
        <Field
          label="Tour image"
          value={value.imageUrl}
          onChange={e =>
            this.onFieldChange(
              "imageUrl",
              e.target.value,
              validation.validateImageUrl
            )
          }
          error={this.state.error.imageUrl}
        />
        <Field
          label="price"
          value={value.price}
          onChange={e =>
            this.onFieldChange(
              "price",
              e.target.value,
              validation.validatePrice
            )
          }
          error={this.state.error.price}
        />
        <div className="form-group">
          <label>Group size</label>
          <Field
            label="from"
            value={value.minimumSize}
            onChange={e =>
              this.onFieldChange(
                "minimumSize",
                e.target.value,
                validation.validateMinimumSize
              )
            }
            error={this.state.error.minimumSize}
          />
          <Field
            label="to"
            value={value.maximumSize}
            onChange={e =>
              this.onFieldChange(
                "maximumSize",
                e.target.value,
                validation.validateMaximumSize
              )
            }
            error={this.state.error.maximumSize}
          />
        </div>
        <Field
          label="Details"
          value={value.detail}
          onChange={e =>
            this.onFieldChange(
              "detail",
              e.target.value,
              validation.validateDetail
            )
          }
          error={this.state.error.detail}
        />

        <Grid columns={2}>
          <Grid.Column width={8}>
            <Button onClick={() => this.onSubmitNewTourInfo()} primary fluid>
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button onClick={() => this.onCloseModal()} color="red" fluid>
              Cancel
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  render() {
    return (
      <Modal
        className="publish-new-tour-modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen === "publishNewTour"}
        onRequestClose={this.onCloseModal}
        ariaHideApp={false}
      >
        <PopUpModal
          isOpen={this.state.updated}
          onCloseModal={() => {
            this.setState({ updated: false });
            this.props.onCloseModal();
          }}
          headerText={`${this.state.value.tourName} is published`}
        />
        {this.renderPublishNewTour()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.modalName,
    userId: state.user.userId,
    token: state.user.token,
    isUpdated: state.app.isUpdated
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(publishNewTour(false)),
  publishTour: (tour, token) => dispatch(publishTour(tour, token)),
  updated: () => dispatch(updated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishNewTourModal);
