import React from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import {
  Card,
  CardColumns,
  CardHeader,
  CardImg,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';
import Layout from '../components/layout';
import posters from '../images/posters.png';
import historical from '../images/historical.png';
import how from '../images/how.png';
import latest from '../images/latest.png';

const StyledButton = styled(Button)`
  font-family: Oswald, sans-serif;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const HeaderText = styled.h2`
  margin-bottom: 0;
`;

// TODO: Add links to cards other than latest
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Content>
        <CardColumns>
          <Card className="text-center">
            <CardHeader>
              <HeaderText>
                <Link to="/latest/">Looking for the latest results?</Link>
              </HeaderText>
            </CardHeader>
            <Link to="/latest/">
              <CardImg top width="100%" src={latest} alt="Latest results" />
            </Link>
            <CardBody>
              <CardText>Live and most recent results</CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/latest/')}
                block
              >
                Latest Results
              </StyledButton>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <HeaderText>
                <Link to="/about/">New to Bumps?</Link>
              </HeaderText>
            </CardHeader>
            <Link to="/about/">
              <CardImg top width="100%" src={how} alt="How Bumps works" />
            </Link>
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
              <HeaderText>
                <Link to="/results/">Looking for historical results?</Link>
              </HeaderText>
            </CardHeader>
            <Link to="/results/">
              <CardImg
                top
                width="100%"
                src={historical}
                alt="Historical Bumps charts"
              />
            </Link>
            <CardBody>
              <CardText>
                Take a trip back in time with historical results going back to
                the 1950s
              </CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/results/')}
                outline
                block
              >
                Historical Bumps Charts
              </StyledButton>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <HeaderText>
                <Link to="/posters/">Posters</Link>
              </HeaderText>
            </CardHeader>
            <Link to="/posters/">
              <CardImg top width="100%" src={posters} alt="Posters" />
            </Link>
            <CardBody>
              <CardText>
                Download PDF posters showing club's historical results and
                highlighting particular events
              </CardText>
              <StyledButton
                color="primary"
                onClick={() => navigate('/posters/')}
                outline
                block
              >
                Download Posters
              </StyledButton>
            </CardBody>
          </Card>
        </CardColumns>
      </Content>
    </Layout>
  );
};

export default IndexPage;
