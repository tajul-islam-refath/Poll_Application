import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import MainContent from './PoolComponent/main/mainContent'
import SideBar from './PoolComponent/sideBar/sideBar'
import POLLS from './data/data'
import shortid from 'shortid'

class App extends React.Component {

  state = {
    polls: [],
    selectedPoll: {},
    searchValue: ''
  }
  componentDidMount() {
    this.setState({ polls: POLLS })
  }

  addNewPoll = poll => {
    poll.id = shortid.generate()
    poll.time = new Date()
    poll.totalvote = 0
    poll.opinions = []

    this.setState({
      polls: this.state.polls.concat(poll)
    })
  }


  updatePoll = updatedPoll => {
    const polls = [...this.state.polls]
    const poll = polls.find(poll => poll.id === updatedPoll.id)

    poll.titel = updatedPoll.titel
    poll.description = updatedPoll.description
    poll.options = updatedPoll.options

    this.setState({ polls })
  }

  deletePoll = pollid => {
    const polls = this.state.polls.filter(poll => poll.id !== pollid)
    this.setState({ polls, selectedPoll: {} });
  }

  selectPoll = pollid => {
    const poll = this.state.polls.find(poll => poll.id === pollid)

    this.setState({ selectedPoll: poll });
  }

  getOpenion = (responce) => {
    const { polls } = this.state
    const poll = polls.find(poll => poll.id === responce.id)
    const option = poll.options.find(option => option.id === responce.selectOption)

    poll.totalvote = poll.totalvote + 1
    option.vote = option.vote + 1

    const opanion = {
      id: shortid.generate(),
      name: responce.name,
      selectOption: responce.selectOption
    }

    poll.opinions.push(opanion);
    this.setState({ polls });

  }

  SearchHandel = value => {
    this.setState({
      searchValue: value
    })
  }

  searchElement = () => {
    return this.state.polls.filter(poll => (
      poll.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
    ))

  }

  getSearchValue = () => {
      const polls = this.searchElement()
      return(
        <SideBar
        polls={polls}
        selectPoll={this.selectPoll}
        SearchHandel={this.SearchHandel}
        searchValue={this.state.searchValue}
        addNewPoll={this.addNewPoll}
      />
      );
  }


  render() {
    return (
      <Container className='my-5' >
        <Row>
          <Col md={4} >
          {this.getSearchValue()}
          </Col>
          <Col md={8} >
            <MainContent
              poll={this.state.selectedPoll}
              getOpenion={this.getOpenion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
