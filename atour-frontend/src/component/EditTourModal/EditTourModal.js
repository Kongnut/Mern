import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import autobind from "react-autobind";
import * as validation from "../../utils/validation";
import { editTour } from "../../action/TourAction";
import { editTourModal } from "../../action/ModalAction";
import { updated } from "../../action/ApplicationAction";
import PopUpModal from "../PopUpModal/PopUpModal";
import { Grid, Button } from "semantic-ui-react";
import "./styles.css";

function Field(props) {
  const { inputType, error, label, onChange, value } = props;
  const className =
    "form-group " + (error ? (error !== true ? "has-danger" : "") : "");
  return (
    <div className={className}>
      <label className="editlish-new-tour-label">{label}</label>
      <div>
        <input
          onChange={onChange}
          className="editlish-new-tour-input form-control"
          type={inputType || "text"}
          value={value}
        />
        <div className="error-text">{error && error !== true ? error : ""}</div>
      </div>
    </div>
  );
}

class EditTourModal extends React.Component {
  constructor() {
    super();
    this.state = {
      updated: false,
      value: {},
      error: {}
    };
    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdated && this.props.isOpen === "editTour") {
      this.setState({ updated: true });
      this.props.updated();
    }
    const {
      tourName,
      price,
      minimumSize,
      maximumSize,
      detail,
      imageUrl
    } = nextProps.tour;
    if (
      this.props.tourName !== tourName ||
      this.props.price !== price ||
      this.props.minimumSize !== minimumSize ||
      this.props.maximumSize !== maximumSize ||
      this.props.detail !== detail ||
      this.props.imageUrl !== imageUrl
    ) {
      this.setState({
        value: {
          tourName: tourName,
          price: price,
          minimumSize: minimumSize,
          maximumSize: maximumSize,
          detail: detail,
          imageUrl: imageUrl
        },
        error: {
          tourName: false,
          price: false,
          minimumSize: false,
          maximumSize: false,
          detail: false,
          imageUrl: false
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.updated();
  }

  componentDidMount() {
    const { tour } = this.props;
    this.setState({
      value: {
        tourName: tour.tourName,
        price: tour.price,
        minimumSize: tour.minimumSize,
        maximumSize: tour.maximumSize,
        detail: tour.detail,
        imageUrl: tour.imageUrl
      },
      error: {
        tourName: false,
        price: false,
        minimumSize: false,
        maximumSize: false,
        detail: false,
        imageUrl: false
      }
    });
  }

  onSubmitNewTourInfo() {
    const {
      error: { tourName, price, minimumSize, maximumSize, detail, imageUrl }
    } = this.state;
    if (tourName || price || minimumSize || maximumSize || detail || imageUrl) {
      return;
    } else {
      const { ...tourInfo } = this.state.value;
      const newTour = {
        ...tourInfo,
        tourId: this.props.tour.tourId,
        userId: this.props.tour.userId,
        isPublished: this.props.tour.isPublished
      };
      this.props.editTour(newTour, this.props.token);
    }
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

  renderEditTour() {
    const { value } = this.state;
    return (
      <div className="edit-tour-form-control">
        <h2>Edit Tour</h2>
        <hr color="black" size="50" />
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
            <Button
              onClick={() => this.onSubmitNewTourInfo()}
              // className="btn btn-primary"
              primary
              fluid
            >
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button onClick={() => this.props.onCloseModal()} color="red" fluid>
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
        className="edit-tour-modal-container"
        style={{
          overlay: {
            overflow: "auto"
          }
        }}
        isOpen={this.props.isOpen === "editTour"}
        onRequestClose={() => this.props.onCloseModal()}
        ariaHideApp={false}
      >
        <PopUpModal
          isOpen={this.state.updated}
          onCloseModal={() => {
            this.setState({ updated: false });
            this.props.onCloseModal();
          }}
          headerText={`${this.props.tour.tourName} is updated`}
        />
        {this.renderEditTour()}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.modalName,
    tour: state.tour.selectedTour,
    token: state.user.token,
    isUpdated: state.app.isUpdated
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(editTourModal(false)),
  editTour: (tour, token) => dispatch(editTour(tour, token)),
  updated: () => dispatch(updated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTourModal);
