// @flow
import React from 'react';
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'

// const ButtonExampleButton = () => {
//   return (<Button onClick={}>Find It!</Button>)
// }

const SearchBox = ({ updateUsername, currentUsername, handleUserNameSubmit }) => {
  return (
    <div>
      <Header as='h1'>Enter a GitHub Username to Find their Favouite Language!</Header>
      <Input placeholder='Username...' onChange={updateUsername} value={currentUsername} />
      <br></br>

      {/* {ButtonExampleButton()} */}
      <Button onClick={handleUserNameSubmit}>Find It!</Button>
    </div>
  );
};

export default SearchBox;