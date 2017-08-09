/*
*   Required Props:
*   data: objectarray
*   counter: boolean
*/

import React, { Component } from 'react';
import CardWithCounter from './CardWithCounter';
import CardWithoutCounter from './CardWithoutCounter';
import CardWithActionButton from './CardWithActionButton';

class cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  render() {
    var listItems = this.props.data.map((item, id) => {
      return this.props.cardStyle === 'counter'
        ? <CardWithCounter key={id} item={item} />
        : this.props.cardStyle === 'action'
          ? <CardWithActionButton
            key={id}
            action={this.props.action}
            item={item}
          />
          : <CardWithoutCounter key={id} item={item} />;
    });

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default cards;