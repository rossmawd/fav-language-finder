// @flow
import React from 'react';
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

const ButtonExampleButton = () => <Button>Find Their Favourite</Button>

const SearchBox = () => {
  return (
    <div>
      <Header as='h1'>Enter a GitHub UserName to Find their Favouite Language!</Header>
      <Input placeholder='Search...' />
      <br></br>
      {ButtonExampleButton()}
    </div>
  );
};

export default SearchBox;