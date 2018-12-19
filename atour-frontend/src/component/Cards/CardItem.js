import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { selectTour, selectUser } from '../../action/SelectAction';
import './styles.css';

class CardItem extends React.Component {
  constructor() {
    super();
    this.state = { redirect: false, to: '/' };
  }
  filterString(string, threshold) {
    return string.substring(0, threshold) + (string.length > threshold ? '...' : '');
  }
  render() {
    if (this.state.redirect) return <Redirect to={this.state.to} />;
    if (!this.props.isUser) {
      return (
        <Card
          style={{ height: '380px' }}
          onClick={() => {
            this.setState({ redirect: true, to: '/tourInfo' });
            this.props.selectTour(this.props.item);
          }}
        >
          <Card.Content>
            <Image
              floated="right"
              size="medium"
              src={
                this.props.item.imageUrl == null
                  ? require('../../image/TourImage.png')
                  : this.props.item.imageUrl
              }
              style={{ height: '200px' }}
            />
            <Card.Header>{this.filterString(this.props.item.tourName, 30)}</Card.Header>
            <Card.Meta>{this.props.item.price + ' baht'}</Card.Meta>
            <Card.Description style={{ height: '80px', wordBreak: 'break-all' }}>
              {this.filterString(this.props.item.detail, 100)}
            </Card.Description>
            {this.props.item.isSaved && (
              <div>
                <hr style={{ marginBottom: '11px' }} />
                <Card.Description style={{ textAlign: 'center', color: '#26abdc' }}>
                  Saved
                </Card.Description>
              </div>
            )}
          </Card.Content>
        </Card>
      );
    } else {
      const {
        item: { firstName, lastName, gender, profileImageUrl, age },
        item,
      } = this.props;
      return (
        <Card
          style={{ height: '380px' }}
          onClick={() => {
            this.setState({ redirect: true, to: '/viewProfile' });
            this.props.selectUser(item);
          }}
        >
          <Image
            src={profileImageUrl || require('../../image/TourImage.png')}
            style={{ height: '250px' }}
          />
          <Card.Content>
            <Card.Header> {firstName + ' ' + lastName}</Card.Header>
            <Card.Content style={{ marginTop: '10px' }}>{'Age: ' + age}</Card.Content>
            <Card.Content> {'Gender: ' + gender}</Card.Content>
          </Card.Content>
        </Card>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    savedTour: state.user.savedTourList,
  };
};
const mapDispatchToProps = dispatch => ({
  selectTour: tour => dispatch(selectTour(tour)),
  selectUser: user => dispatch(selectUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem);
