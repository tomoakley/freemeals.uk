import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "components/AppContext/AppContext";
import { NAME, BREAKPOINTS } from "../../constants";
import { buildAddressString } from "utils/buildAddressString";
import { GeoContext } from "../GeoProvider/index";

import Spinner from "../Spinner";

function ProviderList() {
  const history = useHistory();
  const {
    data,
    filteredData,
    selectedIndex,
    setSelectedIndex,
    selectedLocation,
    selectedPostcode,
  } = useContext(AppContext);
  const { mode } = useContext(GeoContext);

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
    history.push(`/provider/${i}`);
  };

  const resultsLabel = () => {
    switch (mode) {
      case "geo":
        return "closest to you";
      case "postcode":
        return `closest to ${selectedPostcode}`;
      default:
        return selectedLocation === "All"
          ? "across the country"
          : `closest to ${selectedLocation}`;
    }
  };

  const providerData = filteredData !== null ? filteredData : data;

  return (
    <VendorListContainer>
      {!!providerData ? (
        <>
          <p>
            Showing {providerData.length} venue
            {providerData.length > 1 ? "s" : null} {resultsLabel()}
          </p>
          <VendorList>
            {providerData.map((provider, i) => (
              <VendorContainer
                key={i}
                onClick={() => handleProviderClick(i)}
                className={selectedIndex === i && "active"}
              >
                <div>
                  <h5>{provider[NAME]}</h5>
                  <p>{buildAddressString(provider)}</p>
                </div>
                {selectedIndex === i && (
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <circle fill="#F2C867" cx="12" cy="12" r="11.25" />
                      <path
                        d="M9 17.25l7.256-4.617a.751.751 0 000-1.266L9 6.75"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                )}
              </VendorContainer>
            ))}
          </VendorList>
          <AttributionLabel>Build and hosting services by <a href="https://netlify.com">Netlify</a>. Data provided from <a href="https://allofustogether.uk">AllOfUsTogehter</a>.</AttributionLabel>
        </>
      ) : (
        <Spinner />
      )}
    </VendorListContainer>
  );
}

const VendorListContainer = styled.div`

`

const VendorList = styled.ul`
  height: 100vh;
  list-style: none;
  margin: 0;
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    height: calc(100vh - 208px);
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const VendorContainer = styled.li`
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 24px;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 10px 20px;

  &:hover {
    border: 1px solid #f2c867;
    cursor: pointer;

    h5 {
      color: #f2c867;
    }
  }

  &.active {
    background: #ba0d37;
    border: 1px solid #ba0d37;
  }

  h5 {
    font-size: 21px;
    margin-bottom: 2px;
  }

  p {
    font-size: 12px;
  }

  svg {
    align-self: center;
    width: 24px;
  }
`;

const AttributionLabel = styled.small`
  display: block;
  margin-top: 50px;
  a {
    color: #ea1045;
    &:hover {
      color: rgb(242,200,103);
    }
  }
`

export default ProviderList;
