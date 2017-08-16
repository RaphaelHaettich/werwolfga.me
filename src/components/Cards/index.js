/*
*   Required Props:
*   data: objectarray
*   cardStyle: string (counter | action)
*   action: function()
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
    const listItems = this.props.data.map((item, id) => 
      // if counter, show card with counter props
      this.props.cardStyle === 'counter'
        ? <ChildCard key={id} item={item} counter actionCard={false} />
        // if action, show card with counter props
        : this.props.cardStyle === 'action'
          ? <ChildCard
            key={id}
            action={this.props.action}
            item={item}
            actionCard
          />
          // else show ncard with no action and counter props
          : <ChildCard key={id} item={item} counter={false} actionCard={false} />);

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default Cards;
