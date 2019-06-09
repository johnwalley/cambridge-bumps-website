import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import {
  Card,
  CardDeck,
  CardHeader,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';
import Layout from '../components/layout';

const StyledButton = styled(Button)`
  font-family: Oswald, sans-serif;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Content>
        <CardDeck>
          <Card className="text-center">
            <CardHeader>
              <h2>Looking for the latest results?</h2>
            </CardHeader>
            <CardBody>
              <CardText>Live and most recent results</CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/latest/')}
                outline
                block
              >
                Latest Results
              </StyledButton>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <h2>New to Bumps?</h2>
            </CardHeader>
            <CardBody>
              <CardText>Read a short introduction to Bumps</CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/about/')}
                outline
                block
              >
                How Bumps Works
              </StyledButton>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <h2>Looking for historical results?</h2>
            </CardHeader>

            <CardBody>
              <CardText>
                Take a trip back in time with historical results going back to
                the 1950s
              </CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/results/')}
                block
              >
                Historical Bumps Charts
              </StyledButton>
            </CardBody>
          </Card>
        </CardDeck>
      </Content>
    </Layout>
  );
};

export default IndexPage;
