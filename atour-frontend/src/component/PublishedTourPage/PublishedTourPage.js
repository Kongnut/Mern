import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Segment, Grid, Button, Icon } from "semantic-ui-react";
import { publishNewTour } from "../../action/ModalAction";
import PublishNewTourModal from "../PublishNewTourModal/PublishNewTourModal";
import { getUserInfo } from "../../action/UserInfoAction";
import { Flex } from "rebass";
import Cards from "../Cards/Cards";

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
      <Container>
        <PublishNewTourModal />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid stackable>
            <Grid.Row textAlign="center" columns={2}>
              <Grid.Column textAlign="left" width={14}>
                <h2>Published Tours</h2>
              </Grid.Column>
              <Grid.Column textAlign="center" width={2}>
                <Button animated onClick={this.props.onClickPublishNewTour}>
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
            <hr color="black" size="50" width="1100" />
            <Flex>
              {!this.props.user.publishedTour ? (
                <div />
              ) : (
                <Cards isUser={false} items={this.props.user.publishedTour} />
              )}
            </Flex>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.user.token
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
