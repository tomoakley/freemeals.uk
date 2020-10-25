import React, { useEffect, useState, useContext, useCallback } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";
import fetch from "node-fetch";
import styled from "styled-components";

import ContributingFooter from "components/ContributingFooter";
import Header from "components/Header";
import LocationFilter from "components/LocationFilter";
import Overlay from "components/Overlay";
import ProviderList from "components/ProviderList";
import SelectedPane from "components/SelectedPane";
import PostcodeSearch from "components/PostcodeSearch";
import { GeoContext } from "components/GeoProvider";
import Spinner from "components/Spinner";
import { DataContext } from "contexts/DataProvider";

const Container = styled.div`
  height: 100%;
  display: flex;
  padding: 10px;
  position: relative;
`;

export const buildAddressString = (provider) => {
  const ADDRESS_1 = provider["provider address 1"];
  const ADDRESS_2 = provider["provider address 2"];
  const COUNTY = provider["provider county"];
  const TOWN = provider["provider town/city"];
  const POSTCODE = provider["provider postcode"];

  const addressArray = [ADDRESS_1, ADDRESS_2, COUNTY, TOWN, POSTCODE].filter(
    (parts) => parts !== "Not Available" && parts
  );
  return addressArray.join(", ");
};

const ListView = () => {
  const {
    data,
    selectedLocation,
    setSelectedLocation,
    locations,
    fetchingData,
  } = useContext(DataContext);

  const [resultsMode, setResultsMode] = useState("closest");

  const [markers, setMarkers] = useState();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [footerVisible, setFooterVisible] = useState(true);

  useEffect(() => {
    setSelectedIndex(null)
  }, [data])

  useEffect(() => {
    (async () => {
      const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        iconSize: [35, 46],
        iconAnchor: [17, 46],
      });

      if (data.length) {
        setMarkers(
          data.map((provider, i) => {
            if (!provider.latitude) {
              provider.latitude = 56 - i * 0.05;
              provider.longitude = -5 + i * 0.05;
            }

            let position = [provider.latitude, provider.longitude];

            return (
              <Marker
                key={i}
                position={position}
                icon={customIcon}
                onClick={() => handleProviderClick(i)}
              />
            );
          })
        );
      }
    })();
  }, [data, resultsMode]);

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
  };

  return (
    <>
      <Header setResultsMode={setResultsMode} resultsMode={resultsMode} />
      <Container>
        {fetchingData ? (
          <Spinner />
        ) : (
          <>
            <div>
              <PostcodeSearch />
              <LocationFilter
                locations={locations}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
            <ProviderList
              buildAddressString={buildAddressString}
              data={data}
              handleProviderClick={handleProviderClick}
              selectedIndex={selectedIndex}
            />
            {data.length && selectedIndex != null ? (
              <SelectedPane
                data={data}
                markers={markers}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            ) : null}
          </>
        )}
      </Container>
      {selectedIndex != null && <Overlay />}
      {footerVisible && (
        <ContributingFooter setFooterVisible={setFooterVisible} />
      )}
    </>
  );
};

export default ListView;
