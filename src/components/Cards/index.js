/*
*   Required Props:
*   data: objectarray
*   cardStyle: string (counter | action)
*/

import React, { Component, } from 'react';
import ChildCard from './ChildCard';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  render() {
    const listItems = this.props.data.map((item, id) => this.props.cardStyle === 'counter'
      ? <ChildCard key={id} item={item} counter actionCard={false} />
      : this.props.cardStyle === 'action'
        ? <ChildCard
          key={id}
          action={this.props.action}
          item={item}
          actionCard
        />
        : <ChildCard key={id} item={item} counter={false} actionCard={false} />);

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default Cards;
