import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { SearchButton, Input } from '../BaseComponent';
import Cards from '../Cards/Cards';
import { onChange, onSearch } from '../../action/SearchAction';

class SearchFor extends Component {
  componentDidMount() {
    const { term, onSearch } = this.props;
    onSearch(term, false);
  }
  render() {
    const { term, onChange, onSearch, userList } = this.props;
    const Header = 'Search For User';
    const placeholder = 'User Name';
    const items = userList;
    return (
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Flex flexWrap="wrap" justifyContent="center">
          <Box width={4 / 5}>
            <Text fontSize={4} mb={4} mt={3}>
              <i style={{ marginRight: '10px' }} className="fa fa-search" />
              {Header}
            </Text>

            <Flex alignItems="flex-start" justifyContent="flex-start" mb={[3, 4]} width={1}>
              <Box my={1} width={4 / 5}>
                <Input
                  placeholder={placeholder}
                  onChange={e => onChange(e.target.value)}
                  value={term}
                  onEnterText={() => onSearch(term, false)}
                />
              </Box>
              <Box my={1} width={1 / 5}>
                <SearchButton onClick={() => onSearch(term, false)}>
                  <Icon name="search" />
                  Search
                </SearchButton>
              </Box>
            </Flex>

            <Flex>
              <Cards
                items={items}
                isUser={true}
                tours={this.props.tours}
                savedTourList={this.props.savedTourList}
              />
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default connect(
  state => ({
    savedTourList: state.user.savedTourList,
    term: state.search.term,
    tours: state.tour.tourList,
    userList: state.user.otherUserList,
  }),
  { onChange, onSearch }
)(SearchFor);
