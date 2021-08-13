import React, { memo } from 'react';
import Card from '../Card/Card';

const PostNotGroupCards = ({data}) => data.map(post => <Card key={ post.id } data={ post } horizontal={ true } />);

export default memo(PostNotGroupCards);