import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import styled from "styled-components";
import { GeoContext } from "../GeoProvider";

const POSTCODE_REGEX = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

function PostcodeSearch() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState(false);
  const { setMode } = useContext(GeoContext);

  const handlePostcodeChange = (e) => {
    setPostcode(e.currentTarget.value);
  };

  const currentSetMapProps = useRef(setMode);
  useEffect(() => {
    currentSetMapProps.current = setMode;
  });

  useEffect(() => {
    if (!postcode || !postcode.match(POSTCODE_REGEX)) {
      return;
    }
    let current = true;
    async function fetchPostCodeDetails(value) {
      const data = await (
        await fetch(`https://api.postcodes.io/postcodes/${value}`)
      ).json();
      if (!current) {
        // The requested props have changed, so this is no longer
        // the most recent request. Do not update the map state.
        return;
      }
      if (data.status === 200) {
        const { latitude, longitude } = data.result;
        currentSetMapProps.current({
          name: "postcode",
          coords: { latitude, longitude },
        });
        setError(false);
      } else {
        setError(true);
      }
    }
    fetchPostCodeDetails(postcode);
    return () => {
      current = false;
    };
  }, [postcode, currentSetMapProps, setError]);

  return (
    <>
      <button onClick={() => setMode({ name: "geo" })}>
        <span role="img" aria-label="Use my location">
          📍
        </span>
      </button>
      <PostcodeInputContainer>
        <PostcodeInput
          onChange={handlePostcodeChange}
          placeholder="Postcode"
          type="text"
          value={postcode}
        />
      </PostcodeInputContainer>
      {error && (
        <Error>Unable to fetch postcode details. Please try again later.</Error>
      )}
    </>
  );
}
const PostcodeInputContainer = styled.div`
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const PostcodeInput = styled.input`
  background-color: black;
  margin-bottom: 10px;
  padding: 5px;
  border-width:0px;
  border:none;
  color: white;
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
  }
`;

export default PostcodeSearch;