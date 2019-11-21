// @flow
import React from 'react';
import { Button } from 'semantic-ui-react'

const ButtonExampleButton = () => <Button>Find Their Favourite</Button>

const SearchBox = () => {
  return (
    <div>
      {ButtonExampleButton()}
    </div>
  );
};

export default SearchBox;