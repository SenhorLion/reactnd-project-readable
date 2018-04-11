import React from 'react';
import Button from '../button/Button';
import classNames from 'classnames';

import { UP_VOTE, DOWN_VOTE } from '../../../constants';

const Reaction = ({
  classNameProp = '',
  onUpVote,
  onDownVote,
  item,
  itemId,
  categoryColour,
}) => {
  const reactionItemClass = classNames('reaction', classNameProp);

  return (
    <div className={reactionItemClass}>
      <Button
        onClick={() => onUpVote(itemId, UP_VOTE)}
        className="reaction__button reaction--upvote"
        title="Up vote"
      >
        <i className={`large thumbs up link icon ${categoryColour}`} />
      </Button>
      <span
        className={`ui label circular ${categoryColour} reaction--vote-score`}
      >
        {item.voteScore}
      </span>
      <Button
        onClick={() => onDownVote(itemId, DOWN_VOTE)}
        className="reaction__button reaction--downvote"
        title="Down vote"
      >
        <i className={`large thumbs down link icon ${categoryColour}`} />
      </Button>
    </div>
  );
};

export default Reaction;
