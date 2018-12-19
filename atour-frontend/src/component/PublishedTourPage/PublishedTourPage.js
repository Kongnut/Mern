import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { publishNewTour } from "../../action/ModalAction";
import PublishNewTourModal from "../PublishNewTourModal/PublishNewTourModal";
import { getUserInfo } from "../../action/UserInfoAction";
import Cards from "../Cards/Cards";
import "./styles.css";

class PublishedTourPage extends React.Component {
  state = {
    isLoaded: false
  };
  componentDidMount() {
    this.props.getUserInfo(this.props.user.userId);
  }

  render() {
    if (!this.props.token) return <Redirect to="/" />;
    return (
      <div style={{ marginBottom: "100px" }}>
        <PublishNewTourModal />
        <div className="publishTour-container">
          <div className="publishTour-above-divider">
            <div className="publishTour-header">
              <div className="publishTour-headerText">Published Tours</div>
            </div>
            <div className="publishTour-add-container">
              <Button
                style={{ zIndex: 0 }}
                animated
                onClick={() => {
                  this.props.onClickPublishNewTour();
                }}
              >
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name="plus" />
                </Button.Content>
              </Button>
            </div>
          </div>
          <hr className="publishTour-divider" />
          {!this.props.user.publishedTour ? (
            <div />
          ) : (
            <Cards
              savedTourList={[]}
              isUser={false}
              items={this.props.user.publishedTour}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.user.token,
    savedTourList: state.user.savedTourList
  };
};

const mapDispatchToProps = dispatch => ({
  getUserInfo: userId => dispatch(getUserInfo(userId)),
  onClickPublishNewTour: () => dispatch(publishNewTour(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishedTourPage);
