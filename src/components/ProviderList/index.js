import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "components/AppContext/AppContext";
import { GeoContext } from "components/GeoProvider";
import { NAME } from "../../constants";
import { buildAddressString } from "App";
import Spinner from "../Spinner";

function ProviderList() {
  const history = useHistory();
  const { data, selectedIndex, setSelectedIndex } = React.useContext(
    AppContext
  );
  const { mode } = React.useContext(GeoContext);

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
    history.push(`/provider/${i}`);
  };

  const resultsLabel = () => {
    switch (mode) {
      case "geo":
      case "postcode":
        return "near you";
      default:
        return "across the country";
    }
  };

  return (
    <VendorList>
      {!!data ? (
        <>
          <p>
            {data.length} venues {resultsLabel()}
          </p>
          <div>
            {data.map((provider, i) => (
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
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </VendorList>
  );
}

const VendorList = styled.ul`
  height: 100vh;
  list-style: none;
  margin: 0;
  overflow-y: auto;
  padding: 0;
  display: inline-flex;
  width: 500;

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
  height: 100px;
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

export default ProviderList;
