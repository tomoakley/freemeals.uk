import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import styled from "styled-components";

import "./App.css";

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const Header = styled.div`
  padding: 10px;
`;

const Heading = styled.h1``;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 50%;
`;

const Provider = styled.li`
  display: block;
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  &:hover {
    background: blue;
    color: white;
  }
  ${(props) =>
    props.isSelected &&
    `
    background: blue;
    color: white;
  `}
`;

const Block = styled.span`
  display: block;
`;

const SelectedPane = styled.div`
  margin-left: 20px;
`;

function App() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch(".netlify/functions/providers/")
      .then((response) => response.json())
      .then(async (data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
  };

  const NAME = "provider name";
  const ADDRESS = "provider address";
  const URL = "provider url";
  const OFFERS = "half-term offers (26th - 30th october)";
  const CONTACT = "phone contact";

  return (
    <>
      <Header>
9       <Heading>Freemeals.uk</Heading>
        <span>
          A collated list of venues offering free meals to UK school children
          during the half terms holidays
        </span>
      </Header>
      <Container>
        <List>
          {data.length ?
            data.map((provider, i) => (
              <Provider
                key={i}
                onClick={() => handleProviderClick(i)}
                isSelected={selectedIndex === i}
              >
                <Block>{provider[NAME]}</Block>
                <Block>{provider[ADDRESS]}</Block>
                <Block>{provider[URL]}</Block>
              </Provider>
            )) : <span>Getting list of fantastic providers...</span>}
        </List>
        {data.length ? (
          <SelectedPane>
            <h2>{data[selectedIndex][NAME]}</h2>
            <Block>
              Half terms offers:{" "}
              {data[selectedIndex][OFFERS] || "Not specified"}
            </Block>
            <Block>Phone number: {data[selectedIndex][CONTACT]}</Block>
            <Block>
              Website:{" "}
              <a href={data[selectedIndex][URL]}>{data[selectedIndex][URL]}</a>
            </Block>
            <Block>
              Location:{" "}
              <a
                href={`https://www.google.co.uk/maps/place/${data[selectedIndex][ADDRESS]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data[selectedIndex][ADDRESS]}
              </a>
            </Block>
          </SelectedPane>
        ) : (
          <span>Loading</span>
        )}
      </Container>
    </>
  );
}

export default App;
