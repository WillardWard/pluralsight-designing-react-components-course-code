import React, { useState } from 'react';

import SpeakerSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';
import Speaker from '../Speaker/Speaker';

import { REQUEST_STATUS } from '../../reducers/request';

import withRequest from '../HOCs/withRequest';

const Speakers = ({ records: speakers, status, error, put, bgColor }) => {
  const onFavoriteToggleHandler = async (speakerRec) => {
    put({
      ...speakerRec,
      isFavorite: !speakerRec.isFavorite,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div className={bgColor}>
      <SpeakerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoading && <div>Loading...</div>}
      {hasErrored && (
        <div>
          Loading error... Is the json-server running? (try "npm run
          json-server" at terminal prompt)
          <br />
          <b>ERROR: {error.message}</b>
        </div>
      )}
      {success && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
          {speakers
            .filter((rec) => {
              const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
              return searchQuery.length === 0
                ? true
                : targetString.includes(searchQuery.toLowerCase());
            })
            .map((speaker) => (
              <Speaker
                key={speaker.id}
                {...speaker}
                onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default withRequest('http://localhost:4000', 'speakers')(Speakers);