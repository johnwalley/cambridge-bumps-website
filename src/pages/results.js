import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import {
  Card,
  CardImg,
  CardDeck,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
  Row,
  Col,
} from 'reactstrap'

const StyledButton = styled(Button)`
  font-family: Oswald, sans-serif;
`

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const ResultsPage = ({ data }) => {
  return (
    <Content>
      <Row>
        <Col sm="4">
          <StyledCard className="text-center">
            <CardHeader>
              <h2>Town Bumps</h2>
            </CardHeader>
            <CardBody>
              <CardTitle>1950 - 2017</CardTitle>
              <ButtonGroup>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/town/women')}
                >
                  Women
                </StyledButton>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/town/men')}
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
              <CardTitle>1992 - 2018</CardTitle>

              <ButtonGroup>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/mays/women')}
                >
                  Women
                </StyledButton>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/mays/men')}
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
              <CardTitle>1964 - 2018</CardTitle>
              <ButtonGroup>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/lents/women')}
                >
                  Women
                </StyledButton>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/lents/men')}
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
              <CardTitle>1978 - 2018</CardTitle>
              <ButtonGroup>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/torpids/women')}
                >
                  Women
                </StyledButton>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/torpids/men')}
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
              <CardTitle>1977 - 2018</CardTitle>
              <ButtonGroup>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/eights/women')}
                >
                  Women
                </StyledButton>
                <StyledButton
                  color="primary"
                  onClick={() => navigateTo('/eights/men')}
                >
                  Men
                </StyledButton>
              </ButtonGroup>
            </CardBody>
          </StyledCard>
        </Col>
      </Row>
    </Content>
  )
}

export default ResultsPage

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
`
