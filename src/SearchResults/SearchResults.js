import React from 'react';
import { Label } from 'semantic-ui-react'

const SearchResults = ({ favLanguage, favLanguageNumber }) => {
  return (
    <div>
      <Label>
        It's {favLanguage} with:<Label.Detail>{favLanguageNumber}</Label.Detail> repos
      </Label>
    </div>
  );
};

export default SearchResults;