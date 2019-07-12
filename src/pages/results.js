import React from 'react';
import { graphql, navigate } from 'gatsby';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  ButtonGroup,
  Row,
  Col,
} from 'reactstrap';
import Layout from '../components/layout';

const StyledButton = styled(Button)`
  font-family: Oswald, sans-serif;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const ResultsPage = ({ data }) => {
  return (
    <Layout>
      <Content>
        <Row>
          <Col sm="4">
            <StyledCard className="text-center">
              <CardHeader>
                <h2>Town Bumps</h2>
              </CardHeader>
              <CardBody>
                <CardTitle>1950 - 2019</CardTitle>
                <ButtonGroup>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/town/women')}
                  >
                    Women
                  </StyledButton>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/town/men')}
                  >
                    Men
                  </StyledButton>
                </ButtonGroup>
              </CardBody>
            </StyledCard>
          </Col>
          <Col sm="4">
            <StyledCard className="text-center">
              <CardHeader>
                <h2>May Bumps</h2>
              </CardHeader>
              <CardBody>
                <CardTitle>1980 - 2019</CardTitle>

                <ButtonGroup>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/mays/women')}
                  >
                    Women
                  </StyledButton>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/mays/men')}
                  >
                    Men
                  </StyledButton>
                </ButtonGroup>
              </CardBody>
            </StyledCard>
          </Col>
          <Col sm="4">
            <StyledCard className="text-center">
              <CardHeader>
                <h2>Lent Bumps</h2>
              </CardHeader>
              <CardBody>
                <CardTitle>1950 - 2019</CardTitle>
                <ButtonGroup>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/lents/women')}
                  >
                    Women
                  </StyledButton>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/lents/men')}
                  >
                    Men
                  </StyledButton>
                </ButtonGroup>
              </CardBody>
            </StyledCard>
          </Col>
          <Col sm="4">
            <StyledCard className="text-center">
              <CardHeader>
                <h2>Torpids</h2>
              </CardHeader>
              <CardBody>
                <CardTitle>1900 - 2019</CardTitle>
                <ButtonGroup>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/torpids/women')}
                  >
                    Women
                  </StyledButton>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/torpids/men')}
                  >
                    Men
                  </StyledButton>
                </ButtonGroup>
              </CardBody>
            </StyledCard>
          </Col>
          <Col sm="4">
            <StyledCard className="text-center">
              <CardHeader>
                <h2>Summer Eights</h2>
              </CardHeader>
              <CardBody>
                <CardTitle>1892 - 2019</CardTitle>
                <ButtonGroup>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/eights/women')}
                  >
                    Women
                  </StyledButton>
                  <StyledButton
                    color="primary"
                    onClick={() => navigate('/history/eights/men')}
                  >
                    Men
                  </StyledButton>
                </ButtonGroup>
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ResultsPage;

export const query = graphql`
  query IndexQuery {
    allResultsJson {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`;
